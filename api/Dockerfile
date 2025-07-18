# Usar una imagen base de Node.js LTS
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Establecer NODE_ENV para producción
ENV NODE_ENV=production

# Instalar dependencias
RUN npm ci

# Copiar el resto de los archivos de la aplicación
COPY . .

# Verificar que los archivos se copiaron correctamente
RUN ls -la /app

# Crear un usuario no-root para mayor seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Cambiar la propiedad de los archivos al usuario no-root
RUN chown -R nextjs:nodejs /app
USER nextjs

# Exponer el puerto (Render asignará automáticamente el puerto)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
