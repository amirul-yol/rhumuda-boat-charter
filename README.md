# RHUMUDA BOAT CHARTER SYSTEM

Rhumuda Charter Service - A comprehensive web-based booking platform designed for managing boat charter services, specializing in both recreational trips and fishing expeditions. The system handles the complete workflow from customer inquiry to booking confirmation, with integrated notification systems.

## Phase 1 Project Overview

Current implementation includes:

### Frontend Features

- Multi-step Booking Inquiry Form:
  - Customer Information with field validation
    - Name validation (letters only)
    - Malaysian phone number format (+601XXXXXXXXX)
    - Email validation
    - Address validation
    - Postal code validation (5 digits)
  - Reservation Details
    - Package selection
    - Jetty point selection
    - Booking date
    - Passenger count
    - Add-ons selection
  - Other Options
    - Alternative dates
    - Special remarks/requests
- Material-UI Implementation
  - Responsive design
  - Custom themed components
  - Form validation feedback
- Package Display System
  - Categorized package viewing (Boat Charter, Island Trips, Fishing)
  - Dynamic package cards with pricing tiers
  - Service inclusion details
  - Duration and capacity information
  - Booking integration

### Backend Features

- RESTful API Endpoints:
  - Package management
  - Booking handling
  - Add-on management
  - Jetty point management
  - Package category management
- Data Validation
- Cross-Origin Resource Sharing (CORS) support
- Error handling and validation

### Implemented Components

- InquiryPage
- HomePage with package listings
- PackageCard component
- Form validation system
- Category navigation
- Price display system
- Service listing component

## Tech Stack

### Frontend

Core Technologies:
- React 18
- TypeScript
- Material-UI v5
- DayJS (date handling)
- Vite (build tool)

Development Tools:
- ESLint
- Prettier
- React Router v6

### Backend

Core Technologies:
- Spring Boot 3
- Java 17
- MySQL 8
- Spring Data JPA
- Spring Web

Development Tools:
- Maven
- Spring DevTools
- Lombok

## Project Structure

```
project-root/
├── rhumudafrontend/          # React frontend
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx         # Root component
│   └── package.json
│
├── rhumudasystem/           # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/       # Java source files
│   │       │   └── com/rhumuda_new/rhumudasystem/
│   │       │       ├── controller/  # REST controllers
│   │       │       ├── entity/      # JPA entities
│   │       │       ├── repository/  # Data repositories
│   │       │       └── service/     # Business logic
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Java Development Kit (JDK) 17
- MySQL 8.0+
- Maven 3.8+

### Installation & Setup

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/rhumuda-boat-charter.git
   ```

2. Frontend Setup
   ```bash
   cd rhumudafrontend
   npm install
   npm run dev
   ```

3. Backend Setup
   ```bash
   cd rhumudasystem
   mvn clean install
   mvn spring-boot:run
   ```

4. Database Setup
   - Create a MySQL database named 'rhumuda_system'
   - Run the SQL scripts in rhumuda-system.sql

## Environment Variables

```env
# Frontend (.env)
VITE_API_URL=http://localhost:8080/api

# Backend (application.properties)
spring.datasource.url=jdbc:mysql://localhost:3306/rhumuda_system
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## Current Features (Phase 1)

- Package Management
  - CRUD operations for packages
  - Category-based organization
  - Price tier system
- Booking System
  - Multi-step inquiry form
  - Validation system
  - Customer information management
- Add-on Management
  - Additional services handling
  - Price management
- Location Management
  - Jetty point handling
  - Distance calculations

## Future Development (Phase 2+)

### Planned Features

- User Authentication System
  - Customer accounts
  - Admin dashboard
  - Role-based access control
- Payment Integration
  - Online payment processing
  - Invoice generation
  - Receipt management
- Booking Management System
  - Calendar integration
  - Availability checking
  - Automated notifications
- Analytics Dashboard
  - Booking statistics
  - Revenue reports
  - Customer analytics

### Technical Debt & Known Issues

- Need to implement proper error boundaries in React components
- API response caching system needed
- Form state management could be improved with React Query
- Need to implement proper logging system
- Security features need enhancement

### Development Guidelines

#### Coding Standards
- Use TypeScript for all new frontend code
- Follow Material-UI best practices
- Implement proper error handling
- Write unit tests for critical components

#### Git Workflow
1. Create feature branches from 'develop'
2. Use conventional commits
3. Require PR reviews
4. Squash merge to main

## API Documentation

### Key Endpoints

- Packages
  - GET /api/packages - List all packages
  - GET /api/packages/category/{id} - Get packages by category
  - POST /api/packages - Create new package

- Bookings
  - POST /api/bookings - Create new booking
  - GET /api/bookings/{id} - Get booking details

- Add-ons
  - GET /api/add-ons - List all add-ons
  - POST /api/add-ons - Create new add-on

## Database Schema Overview

Key Tables:
- packages
- bookings
- customers
- add_ons
- jetty_points
- package_categories

## Testing

### Frontend
```bash
npm run test
```

### Backend
```bash
./mvnw test
```

## Deployment

Current deployment is local development only. Production deployment guide to be added in Phase 2.

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

- Project Maintainer: [Your Name]
- Email: [Your Email]
- Project Link: [GitHub Repository URL]

## Version History

- v0.1.0 (Phase 1) - February 2024
  - Initial development release
  - Basic booking system implementation
  - Package management system
  - Frontend UI implementation
