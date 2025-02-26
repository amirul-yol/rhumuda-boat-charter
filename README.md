# Rhumuda Boat Charter System

A full-stack web application for managing boat charters, fishing trips, and island hopping services. Built with React (frontend) and Spring Boot (backend).

## Project Structure

```
rhumudasystem/
├── rhumudafrontend/    # React frontend
└── rhumudasystem/      # Spring Boot backend
```

## Prerequisites

- Node.js 18+ and npm
- Java 17+
- MySQL 8.0+
- Maven

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd rhumudasystem
   ```

2. Copy the example properties file:
   ```bash
   cp src/main/resources/application.example.properties src/main/resources/application.properties
   ```

3. Configure your `application.properties` with your database and email credentials.

4. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will start on `http://localhost:8080/api`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd rhumudafrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment files are already configured for development and production:
   - `.env.development` - Development settings
   - `.env.production` - Production settings
   - `.env.example` - Example configuration

4. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`

## Features

- Boat charter booking management
- Fishing trip packages
- Island hopping services
- Real-time availability checking
- Email notifications
- Admin dashboard for booking management

## Environment Configuration

### Frontend
- Development: `.env.development`
- Production: `.env.production`
- Example: `.env.example`

### Backend
- Main: `application.properties`
- Example: `application.example.properties`

**Note:** Never commit sensitive credentials. Use the example files as templates and create your own local configuration files.

## API Endpoints

The backend provides the following main endpoints:

- `/api/bookings` - Booking management
- `/api/packages` - Package listings
- `/api/jettypoints` - Jetty point information
- `/api/addons` - Additional services

## Development Guidelines

1. Always create feature branches from `main`
2. Follow the existing code style and patterns
3. Write meaningful commit messages
4. Test your changes thoroughly before pushing

## Deployment

For detailed deployment instructions, refer to `DEPLOYMENT_HOST_GUIDE.md`