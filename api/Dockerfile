# Stage 1: Build the application
# Use a Maven image that includes JDK
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build

WORKDIR /app
# Copy your project files into the /app directory
COPY . .
# Make sure mvnw is executable (often not strictly needed if it already has permissions locally)
RUN chmod +x ./mvnw
# Run the Maven build command
RUN ./mvnw clean package -DskipTests

# ---

# Stage 2: Create the final lightweight runtime image
# Use a JRE-only image for smaller size
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app
# Copy only the built JAR file from the 'build' stage
COPY --from=build /app/target/*.jar app.jar

# Define the command to run your application when the container starts
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
