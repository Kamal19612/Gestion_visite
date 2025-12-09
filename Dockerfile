FROM maven:3.10.1-eclipse-temurin-21 AS builder
WORKDIR /workspace
COPY . /workspace
# Build the application
RUN mvn -DskipTests package -DskipITs

FROM eclipse-temurin:21-jre
WORKDIR /app
# Copy jar from builder
COPY --from=builder /workspace/target/GestionVisite-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8080
ENV SPRING_PROFILES_ACTIVE=dev
ENTRYPOINT ["java","-jar","/app/app.jar"]
