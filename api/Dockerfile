# Use OpenJDK 21 as base image (matching your pom.xml java.version)
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml first for better caching
COPY mvnw mvnw.cmd pom.xml ./
COPY .mvn .mvn

# Make Maven wrapper executable
RUN chmod +x mvnw

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN ./mvnw dependency:resolve

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Create non-root user for security
RUN groupadd -r spring && useradd -r -g spring spring

# Change ownership of the app directory
RUN chown -R spring:spring /app

# Switch to non-root user
USER spring

# Expose port 8080 (default for Spring Boot)
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "target/api-0.0.1-SNAPSHOT.jar"]
