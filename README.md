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
  - Advanced pricing tier system:
    - Support for multiple pricing types (Fixed, Adult, Child, Infant)
    - Dynamic price calculation based on group size
    - Special pricing for fishing packages
- Booking Management System
  - Comprehensive booking status system (INCOMPLETE, PENDING, COMPLETE, CANCELLED)
  - Booking summary page with detailed information
  - Real-time status updates
  - Inquiry submission system
  - Booking modification capabilities
- Enhanced UI Components
  - Two-column layout for better information organization
  - Responsive status indicators
  - Compact pricing displays
  - Interactive form elements
  - Modern card-based design

### Backend Features

- RESTful API Endpoints:
  - Package management
  - Booking handling
  - Add-on management
  - Jetty point management
  - Package category management
  - Booking status management
  - Price tier management
- Data Validation
- Cross-Origin Resource Sharing (CORS) support
- Error handling and validation
- Advanced Booking System
  - Unique booking ID generation
  - Status tracking and updates
  - Price calculation engine
  - Add-on integration

### Implemented Components

- InquiryPage
- HomePage with package listings
- SummaryPage with booking details
- PackageCard component
- Form validation system
- Category navigation
- Price display system
- Service listing component
- Booking status component
- Package pricing tier system
- Booking modification dialog

### Tech Stack

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

## Architecture Details

### Frontend Architecture

#### Component Structure
- Layout Components
  - `Layout`: Base layout with header and content areas
  - `Header`: Navigation and global actions
  - `SearchBar`: Global search functionality
- Booking Components
  - `BookingEditDialog`: Comprehensive booking modification
  - `CompletionDialog`: Booking completion feedback
  - `BookingDatePicker`: Date selection with validation
  - `AlternativeDatePicker`: Alternative date handling
- Package Components
  - `PackageCard`: Display package information
  - `PriceDisplay`: Dynamic price tier visualization
  - `Description`: Formatted text display
  - `FishingCategoryHeader`: Specialized fishing package header
- Form Components
  - `AddOnSelection`: Add-on management
  - `JettyPointDropdown`: Location selection
  - `PackageDropdown`: Package selection
  - `PassengerCounter`: Group size management
  - `ReservationDatePicker`: Date selection
  - `ReservationJettyPoint`: Jetty point selection
  - `ReservationPassengers`: Passenger management

#### State Management
- Local component state for UI interactions
- URL state for booking flow
- Form state management for multi-step process
- Real-time validation state
- Booking status tracking

### Backend Architecture

#### Entity Structure
- Core Entities
  - `Package`: Main package information
  - `PackageCategory`: Package categorization
  - `PriceTier`: Flexible pricing system
  - `Booking`: Booking management
  - `AddOn`: Additional services
  - `JettyPoint`: Location management
  - `IncludedService`: Package services
- Data Transfer Objects
  - `BookingDTO`: Booking data transfer
  - `ApiError`: Error handling

#### Controller Layer
- RESTful Endpoints
  - `PackageController`: Package management
  - `BookingController`: Booking operations
  - `AddOnController`: Add-on management
  - `JettyPointController`: Location handling
  - `PackageCategoryController`: Category management

#### Repository Layer
- JPA Repositories
  - `PackageRepository`: Package data access
  - `BookingRepository`: Booking data access
  - `AddOnRepository`: Add-on data access
  - `JettyPointRepository`: Location data access
  - `PackageCategoryRepository`: Category data access

#### Configuration
- `WebConfig`: CORS and web configuration
- Database configuration
- JPA configuration

### Data Models

#### Package Model
```typescript
interface Package {
  id: string
  title: string
  name: string
  categoryId: number
  description?: string
  priceTiers: PriceTier[]
  services: Service[]
  imageUrl: string
  maxCapacity?: number
  durationMinutes?: number
  isPrivate?: boolean
  distanceMinKm?: number
  distanceMaxKm?: number
  fishingType: "DEEP_SEA" | "SQUID" | null
}
```

#### Booking Model
```typescript
interface Booking {
  id: string
  bookingId: string
  status: "INCOMPLETE" | "PENDING" | "COMPLETE" | "CANCELLED"
  customerInfo: CustomerInfo
  packageDetails: PackageDetails
  addOns: AddOn[]
  jettyPoint: JettyPoint
  bookingDate: string
  passengers: number
  submittedAt?: string
}
```

### API Endpoints

#### Package Endpoints
- `GET /api/packages`: List all packages
- `GET /api/packages/{id}`: Get package details
- `POST /api/packages`: Create new package
- `PUT /api/packages/{id}`: Update package
- `DELETE /api/packages/{id}`: Delete package

#### Booking Endpoints
- `GET /api/bookings/{bookingId}`: Get booking details
- `POST /api/bookings`: Create new booking
- `PUT /api/bookings/{bookingId}`: Update booking
- `POST /api/bookings/{bookingId}/submit`: Submit booking

#### Add-on Endpoints
- `GET /api/addons`: List all add-ons
- `GET /api/addons/{id}`: Get add-on details
- `POST /api/addons`: Create new add-on
- `PUT /api/addons/{id}`: Update add-on

#### Location Endpoints
- `GET /api/jetty-points`: List all jetty points
- `GET /api/jetty-points/{id}`: Get jetty point details
- `POST /api/jetty-points`: Create new jetty point
- `PUT /api/jetty-points/{id}`: Update jetty point

### Database Schema

#### Tables
- `packages`: Store package information
- `package_categories`: Package categorization
- `price_tiers`: Flexible pricing system
- `bookings`: Booking information
- `add_ons`: Additional services
- `jetty_points`: Location information
- `included_services`: Package services
- `booking_add_ons`: Booking and add-on relationships

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

## Development Guidelines

### Code Organization

#### Frontend
- Components follow atomic design principles
- Reusable components in `components/` directory
- Page components in `pages/` directory
- TypeScript interfaces in `types/` directory
- Constants and configurations in `constants/` directory
- Assets (images, icons) in `assets/` directory

#### Backend
- Controllers handle HTTP requests and responses
- Services contain business logic
- Repositories manage data access
- DTOs for data transfer
- Entities represent database tables
- Configuration in separate config packages

### Coding Standards

#### TypeScript/React
- Use functional components with hooks
- Type all props and state
- Use interfaces over types when possible
- Follow Material-UI best practices
- Implement proper error boundaries
- Use async/await for promises
- Implement proper loading states
- Handle all possible error cases

#### Java/Spring Boot
- Follow SOLID principles
- Use constructor injection
- Implement proper exception handling
- Use DTOs for data transfer
- Follow RESTful API conventions
- Implement proper validation
- Use JPA repositories
- Follow Spring Boot best practices

### Testing Strategy

#### Frontend Testing
- Unit tests for utility functions
- Component tests for UI components
- Integration tests for form flows
- E2E tests for critical paths
- Accessibility testing
- Cross-browser testing

#### Backend Testing
- Unit tests for services
- Integration tests for repositories
- API tests for controllers
- Load testing for critical endpoints
- Security testing

### Git Workflow
- Feature branches for new features
- Bug fix branches for fixes
- Pull requests for code review
- Squash commits before merging
- Semantic commit messages
- Regular rebasing with main branch

### Deployment Process
- Build and test locally
- Deploy to staging environment
- Run automated tests
- Manual QA testing
- Deploy to production
- Post-deployment verification

### Security Measures
- Input validation
- XSS prevention
- CSRF protection
- SQL injection prevention
- Rate limiting
- Secure headers
- Error handling
- Logging and monitoring

### Performance Optimization
- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- Database indexing
- Query optimization
- Connection pooling
- Load balancing

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
  - Advanced price tier system
  - Service inclusion management
  - Package type differentiation (Private/Group)
- Booking System
  - Multi-step inquiry form
  - Validation system
  - Customer information management
  - Status tracking system
  - Booking modification
- Add-on Management
  - Additional services handling
  - Price management
  - Dynamic add-on selection
- Location Management
  - Jetty point handling
  - Distance calculations
  - Location-based pricing

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
