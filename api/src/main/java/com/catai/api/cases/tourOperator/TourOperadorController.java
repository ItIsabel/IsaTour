package com.catai.api.cases.tourOperator;

import com.catai.api.cases.tourOperator.model.TourOperador;
import com.catai.api.cases.tourOperator.model.TourOperadorDto;
import com.catai.api.cases.tourOperator.service.TourOperadorService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Controlador para la gestión de operadores turísticos y autenticación.
 *
 * @author Isabel Alvarez
 * @version 1.2.0
 * @since 1.2.0
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Slf4j
public class TourOperadorController {

    @Autowired
    private TourOperadorService tourOperadorService;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${admin.username}")
    private String adminUsername;


    private Key getSecretKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
    /**
     * Endpoint para autenticación de operadores turísticos.
     *
     * @param loginRequest mapa con "usr" y "password"
     * @return ResponseEntity con token JWT o error
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
        String usr = loginRequest.get("usr");
        String password = loginRequest.get("password");

        if (usr == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Usuario y contraseña requeridos"));
        }

        Optional<TourOperador> tourOperadorOpt = tourOperadorService.authenticate(usr, password);

        if (tourOperadorOpt.isPresent()) {
            TourOperador tourOperador = tourOperadorOpt.get();
            String token = generateToken(tourOperador);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("tourOperador", tourOperador.getName());
            response.put("redirectUrl", "/circuitos/" + tourOperador.getName());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Usuario o contraseña incorrectos"));
        }
    }

    /**
     * Endpoint para registrar un nuevo operador turístico (solo para administrador).
     *
     * @param tourOperadorDto los datos del operador turístico
     * @param authorization header con token JWT
     * @return ResponseEntity con el operador creado o error
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody TourOperadorDto tourOperadorDto,
                                                        @RequestHeader(value = "Authorization", required = false) String authorization) {
        // Verificar que el usuario autenticado sea administrador
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Token de autorización requerido"));
        }

        String token = authorization.substring(7); // Remove "Bearer " prefix
        try {
            // Validar token y extraer claims
            var claims = Jwts.parserBuilder()
                    .setSigningKey(getSecretKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String usr = claims.getSubject();
            if (!adminUsername.equals(usr)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Solo el administrador puede registrar nuevos operadores"));
            }

            TourOperador tourOperador = tourOperadorService.register(tourOperadorDto);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Tour operador registrado exitosamente");
            response.put("tourOperador", tourOperador.getName());
            response.put("usr", tourOperador.getUsr());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Token inválido o error al registrar tour operador"));
        }
    }

    /**
     * Genera un token JWT para el operador turístico.
     *
     * @param tourOperador el operador turístico
     * @return el token JWT
     */
    private String generateToken(TourOperador tourOperador) {
        return Jwts.builder()
                .setSubject(tourOperador.getUsr())
                .claim("tourOperadorId", tourOperador.getId())
                .claim("tourOperadorName", tourOperador.getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 horas
                .signWith(getSecretKey())
                .compact();
    }
}
