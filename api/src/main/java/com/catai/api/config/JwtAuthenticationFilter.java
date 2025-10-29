package com.catai.api.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;

/**
 * JWT Authentication Filter con validación mejorada de tokens.
 * Incluye logging de intentos fallidos y validación explícita de expiración.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Value("${jwt.secret}")
    private String jwtSecret;

    private Key getSecretKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");
        final String requestURI = request.getRequestURI();
        final String clientIP = getClientIP(request);

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);

            try {
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(getSecretKey())
                        .build()
                        .parseClaimsJws(jwt)
                        .getBody();

                username = claims.getSubject();

                // Validación explícita de expiración
                Date expiration = claims.getExpiration();
                if (expiration != null && expiration.before(new Date())) {
                    logger.warn("Token expirado para usuario: {} desde IP: {} intentando acceder a: {}",
                            username, clientIP, requestURI);
                    username = null; // Invalidar el username para que no se autentique
                }

            } catch (ExpiredJwtException e) {
                logger.warn("JWT token expirado desde IP: {} intentando acceder a: {}. Mensaje: {}",
                        clientIP, requestURI, e.getMessage());
            } catch (SignatureException e) {
                logger.error("JWT signature inválida desde IP: {} intentando acceder a: {}. Posible intento de falsificación.",
                        clientIP, requestURI);
            } catch (MalformedJwtException e) {
                logger.warn("JWT token malformado desde IP: {} intentando acceder a: {}",
                        clientIP, requestURI);
            } catch (IllegalArgumentException e) {
                logger.warn("JWT token vacío o inválido desde IP: {} intentando acceder a: {}",
                        clientIP, requestURI);
            } catch (Exception e) {
                logger.error("Error inesperado validando JWT desde IP: {} intentando acceder a: {}. Error: {}",
                        clientIP, requestURI, e.getMessage());
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = User.withUsername(username)
                    .password("")
                    .authorities(new ArrayList<>())
                    .build();

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            logger.info("Usuario autenticado exitosamente: {} desde IP: {} accediendo a: {}",
                    username, clientIP, requestURI);
        } else if (authorizationHeader != null && username == null) {
            logger.warn("Intento de autenticación fallido desde IP: {} intentando acceder a: {}",
                    clientIP, requestURI);
        }

        chain.doFilter(request, response);
    }

    /**
     * Obtiene la IP real del cliente, considerando proxies y load balancers
     */
    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty() || "unknown".equalsIgnoreCase(xfHeader)) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}