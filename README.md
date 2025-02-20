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
- Add-on Pricing System
  - Flexible pricing model supporting:
    - Per-person pricing (e.g., Life jacket, Snorkeling, Lunch Set)
    - Fixed-price options (e.g., Tourist Guide, Boat Tours)
  - Dynamic calculation based on passenger count
  - Clear pricing breakdown in booking summary
  - Real-time total cost updates
- Enhanced UI Components
  - Two-column layout for better information organization
  - Responsive status indicators
  - Modern pricing displays:
    - Package base price with passenger multiplier
    - Per-person add-on costs with clear breakdown
    - Fixed-price add-ons with transparent pricing
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

## Development Setup

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Backend Dependencies

```xml
<!-- Spring Boot Core -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.4.2</version>
</parent>

<!-- Key Dependencies -->
- spring-boot-starter-data-jpa
- spring-boot-starter-web
- spring-boot-starter-validation
- spring-boot-starter-mail
- spring-boot-starter-thymeleaf
- mysql-connector-j
- jackson-databind
```

### Frontend Dependencies

```json
{
  "dependencies": {
    "@mui/material": "^5.15.5",
    "@mui/icons-material": "^5.15.5",
    "@mui/x-date-pickers": "^7.24.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^7.1.3",
    "dayjs": "^1.11.13",
    "typescript": "^4.9.5"
  }
}
```

### Getting Started

1. Clone the repository
```bash
git clone https://github.com/your-username/rhumuda-boat-charter.git
cd rhumuda-boat-charter
```

2. Backend Setup
```bash
cd rhumudasystem
mvn clean install
mvn spring-boot:run
```

3. Frontend Setup
```bash
cd rhumudafrontend
npm install
npm start
```

4. Database Setup
- Create a MySQL database named `rhumuda_db`
- Update `application.properties` with your database credentials
- The application will automatically create the required tables

### Environment Variables

Create a `.env` file in the backend root directory with:

```properties
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_email_password
```

## API Documentation

### Authentication Endpoints

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Booking Endpoints

```
GET    /api/bookings          - List all bookings
POST   /api/bookings          - Create new booking
GET    /api/bookings/{id}     - Get booking details
PUT    /api/bookings/{id}     - Update booking
DELETE /api/bookings/{id}     - Cancel booking
```

### Package Endpoints

```
GET    /api/packages          - List all packages
GET    /api/packages/{id}     - Get package details
GET    /api/packages/category/{categoryId} - Get packages by category
```

### Response Format

```json
{
    "status": "success|error",
    "data": {},
    "message": "Optional message",
    "errors": []
}
```

## Troubleshooting Guide

### Common Issues

1. Database Connection Issues
```
Error: Unable to connect to database
Solution: 
- Check database credentials in .env
- Verify MySQL service is running
- Check network connectivity
```

2. Frontend Build Failures
```
Error: Node modules resolution error
Solution:
- Delete node_modules and package-lock.json
- Run npm clean-cache
- Run npm install
```

3. Backend Startup Issues
```
Error: Port already in use
Solution:
- Check if another process is using port 8080
- Kill the process or change the port in application.properties
```

### Debugging Tools

1. Backend Logging
```properties
# Enable debug logging in application.properties
logging.level.com.rhumuda=DEBUG
logging.file.name=logs/application.log
```

2. Frontend Debugging
```javascript
// Enable React Developer Tools
// Chrome Redux DevTools for state management
// React Query DevTools for API debugging
```

## Security Best Practices

### Frontend Security

1. Input Validation
- Implement client-side validation
- Sanitize user inputs
- Validate file uploads

2. Authentication
- Implement JWT token storage
- Handle token expiration
- Implement refresh token mechanism

3. Data Protection
- Use HTTPS
- Implement CSP headers
- Handle sensitive data securely

### Backend Security

1. API Security
- Rate limiting
- Request validation
- CORS configuration
- API authentication

2. Database Security
- Use prepared statements
- Implement connection pooling
- Regular security updates
- Data encryption at rest

3. Server Security
- Keep dependencies updated
- Regular security patches
- Implement proper logging
- Monitor system resources

## Contributing

### Code Style Guidelines

1. Java
- Follow Oracle's Java Code Conventions
- Use meaningful variable and method names
- Add JavaDoc comments for public methods
- Use lombok annotations where appropriate

2. TypeScript/React
- Follow Airbnb's JavaScript Style Guide
- Use functional components with hooks
- Implement proper type definitions
- Use Material-UI theming system

### Git Workflow

1. Branch Naming
- feature/feature-name
- bugfix/bug-description
- hotfix/issue-description

2. Commit Messages
- feat: new feature
- fix: bug fix
- docs: documentation changes
- style: formatting, missing semicolons, etc
- refactor: code refactoring
- test: adding tests
- chore: maintenance

### Pull Request Process

1. Update documentation
2. Add/update tests
3. Ensure all tests pass
4. Update changelog if applicable
5. Request review from maintainers

## Email Notification System

The system implements automated email notifications using Spring Mail with the following features:

- Booking Status Updates:
  - New booking confirmations
  - Status change notifications
  - Cancellation confirmations
- HTML Email Templates:
  - Professionally designed layouts
  - Dynamic content insertion
  - Booking details formatting
- Configuration:
  ```properties
  # Email Configuration
  spring.mail.host=smtp.gmail.com
  spring.mail.port=587
  spring.mail.username=${MAIL_USERNAME}
  spring.mail.password=${MAIL_PASSWORD}
  spring.mail.properties.mail.smtp.auth=true
  spring.mail.properties.mail.smtp.starttls.enable=true
  ```

## System Configuration

### Backend Configuration

#### 1. Web Configuration (`WebConfig.java`)
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

This configuration:
- Enables CORS for all API endpoints
- Allows requests from the React frontend (localhost:3000)
- Supports all standard HTTP methods
- Enables credentials for authenticated requests
- Sets appropriate cache duration

#### 2. Template Engine (`ThymeleafConfig.java`)
```java
@Configuration
public class ThymeleafConfig {
    @Bean
    public ITemplateResolver templateResolver() {
        FileTemplateResolver resolver = new FileTemplateResolver();
        resolver.setPrefix("classpath:/templates/");
        resolver.setSuffix(".html");
        resolver.setTemplateMode(TemplateMode.HTML);
        resolver.setCharacterEncoding("UTF-8");
        resolver.setCheckExistence(true);
        resolver.setCacheable(false);
        return resolver;
    }

    @Bean
    public SpringTemplateEngine templateEngine() {
        SpringTemplateEngine engine = new SpringTemplateEngine();
        engine.setTemplateResolver(templateResolver());
        engine.setEnableSpringELCompiler(true);
        return engine;
    }
}
```

This configuration:
- Sets up Thymeleaf for email templates
- Configures template resolution and caching
- Enables Spring EL compilation for better performance

#### 3. Application Properties
```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/rhumuda_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${MAIL_USERNAME}
spring.mail.password=${MAIL_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# File Upload Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

### Frontend Configuration

#### 1. Environment Variables
```env
# Development
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENV=development

# Production
REACT_APP_API_URL=https://api.rhumuda.com
REACT_APP_ENV=production
```

#### 2. Package Configuration (`package.json`)
```json
{
  "name": "rhumuda-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@mui/material": "^5.x",
    "@mui/icons-material": "^5.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "dayjs": "^1.x",
    "axios": "^1.x"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### Development Tools Configuration

#### 1. Git Configuration
```gitignore
# Dependencies
node_modules/
target/

# Environment
.env
.env.local
application-local.properties

# Build
build/
dist/

# IDE
.idea/
.vscode/
*.iml

# Logs
*.log
npm-debug.log*
```

#### 2. IDE Configuration
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "java.configuration.updateBuildConfiguration": "automatic"
}
```

### Security Configuration

1. **API Security**
   - CORS configuration for frontend access
   - CSRF protection for forms
   - Rate limiting for API endpoints

2. **Database Security**
   - Encrypted credentials
   - Connection pool management
   - Prepared statements for SQL

3. **Email Security**
   - TLS encryption
   - Authentication required
   - Secure credential storage

### Deployment Configuration

1. **Development**
   - Local MySQL database
   - Local SMTP server
   - Frontend on port 3000
   - Backend on port 8080

2. **Production** (Planned)
   - Cloud database (AWS RDS)
   - Production SMTP service
   - Load balancer configuration
   - SSL/TLS certificates

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

### Frontend Architecture

### Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── types/           # TypeScript type definitions
├── constants/       # Global constants
└── assets/          # Static assets
```

### Key Pages

#### 1. Home Page (`HomePage.tsx`)
- Landing page with search functionality
- Featured packages display
- Quick access to popular services

#### 2. Inquiry Page (`InquiryPage.tsx`)
Multi-step booking form with sections:
```typescript
interface BookingForm {
  customerInfo: {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    addressLine1: string
    addressLine2?: string
    postalCode: string
    city: string
    country: string
  }
  reservationDetails: {
    jettyPoint: string
    bookingDate: string
    passengers: number
    packageId: string
    addOns: string[]
  }
  otherOptions: {
    alternativeDate1?: string
    alternativeDate2?: string
    specialRemarks?: string
  }
}
```

#### 3. Summary Page (`SummaryPage.tsx`)
- Booking confirmation display
- Reservation details summary
- Payment information

#### 4. Services Page (`ServicesPage.tsx`)
- Package category listing
- Detailed service information
- Pricing tiers

### Core Components

#### 1. Search Components
- `JettyPointDropdown`: Location selection
- `BookingDatePicker`: Date selection with validation
- `PassengerCounter`: Group size management

#### 2. Booking Components
- `PackageDropdown`: Package selection
- `AddOnSelection`: Additional services
- `AlternativeDatePicker`: Backup date selection

#### 3. Form Components
- `ReservationJettyPoint`: Jetty point selection
- `ReservationPassengers`: Passenger management
- `ReservationDatePicker`: Date management

### State Management

1. **Local Storage**
   - Booking form progress persistence
   - User preferences
   - Session data

2. **Form State**
   ```typescript
   interface FormState {
     activeSection: number
     validationErrors: ValidationErrors
     isSubmitting: boolean
     bookingId?: string
   }
   ```

3. **Data Flow**
   ```
   User Input → Form Validation → Local Storage → API Submission
   ```

### UI/UX Features

1. **Multi-step Form**
   - Progressive disclosure
   - Step validation
   - Progress persistence

2. **Responsive Design**
   - Mobile-first approach
   - Adaptive layouts
   - Touch-friendly controls

3. **Form Validation**
   - Real-time validation
   - Error messaging
   - Field-level feedback

4. **User Experience**
   - Loading states
   - Error handling
   - Success feedback
   - Clear navigation

### Date Handling

Using DayJS for consistent date management:
```typescript
// Display format
const displayDate = dayjs(date).format('DD/MM/YYYY')

// API format
const apiDate = dayjs(date).format('YYYY-MM-DD')
```

### Error Handling

1. **Form Validation**
   ```typescript
   interface ValidationErrors {
     firstName?: string
     lastName?: string
     phoneNumber?: string
     email?: string
     addressLine1?: string
     postalCode?: string
     city?: string
     country?: string
   }
   ```

2. **API Error Handling**
   - Network error recovery
   - Validation error display
   - User-friendly messages

### Performance Optimization

1. **Code Splitting**
   - Route-based splitting
   - Component lazy loading
   - Dynamic imports

2. **Resource Loading**
   - Image optimization
   - Lazy loading
   - Asset preloading

3. **Form Performance**
   - Debounced validation
   - Optimized re-renders
   - Memoized components

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

## Database Schema

The system uses MySQL with the following table structure:

### Core Tables

#### 1. `package_categories`
```sql
CREATE TABLE package_categories (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url    VARCHAR(255)
);
```

#### 2. `packages`
```sql
CREATE TABLE packages (
    id               BIGINT PRIMARY KEY AUTO_INCREMENT,
    name             VARCHAR(255) NOT NULL,
    description      TEXT,
    base_price       DECIMAL(10,2),
    max_capacity     INT,
    duration         INT,
    is_active        BOOLEAN DEFAULT TRUE,
    category_id      BIGINT,
    duration_minutes INT,
    is_private       BOOLEAN,
    distance_min_km  INT,
    distance_max_km  INT,
    fishing_type     VARCHAR(50),
    image_url        VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES package_categories(id)
);
```

#### 3. `bookings`
```sql
CREATE TABLE bookings (
    id               BIGINT PRIMARY KEY AUTO_INCREMENT,
    booking_id       VARCHAR(255) NOT NULL UNIQUE,
    status           ENUM('INCOMPLETE', 'PENDING', 'COMPLETE', 'CANCELLED') NOT NULL,
    
    -- Customer Info
    first_name       VARCHAR(255) NOT NULL,
    last_name        VARCHAR(255) NOT NULL,
    phone_number     VARCHAR(255) NOT NULL,
    email            VARCHAR(255) NOT NULL,
    address_line1    VARCHAR(255) NOT NULL,
    address_line2    VARCHAR(255),
    postal_code      VARCHAR(255) NOT NULL,
    city             VARCHAR(255) NOT NULL,
    country          VARCHAR(255) NOT NULL,
    
    -- Reservation Details
    jetty_point_id   BIGINT NOT NULL,
    booking_date     DATE NOT NULL,
    passengers       INT NOT NULL,
    package_id       BIGINT NOT NULL,
    
    -- Options
    alternative_date1 DATE,
    alternative_date2 DATE,
    special_remarks   TEXT,
    
    -- System Fields
    created_at       DATETIME NOT NULL,
    updated_at       DATETIME NOT NULL,
    
    FOREIGN KEY (jetty_point_id) REFERENCES jetty_points(id),
    FOREIGN KEY (package_id) REFERENCES packages(id)
);
```

### Supporting Tables

#### 4. `jetty_points`
```sql
CREATE TABLE jetty_points (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL,
    description TEXT
);
```

#### 5. `add_ons`
```sql
CREATE TABLE add_ons (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    price       DECIMAL(10,2),
    is_active   BOOLEAN DEFAULT TRUE
);
```

#### 6. `price_tiers`
```sql
CREATE TABLE price_tiers (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    age_min     INT,
    age_max     INT,
    price       DECIMAL(10,2) NOT NULL,
    package_id  BIGINT,
    FOREIGN KEY (package_id) REFERENCES packages(id)
);
```

#### 7. `included_services`
```sql
CREATE TABLE included_services (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL,
    package_id  BIGINT,
    FOREIGN KEY (package_id) REFERENCES packages(id)
);
```

#### 8. `booking_addons` (Junction Table)
```sql
CREATE TABLE booking_addons (
    booking_id  BIGINT,
    addon_id    BIGINT,
    PRIMARY KEY (booking_id, addon_id),
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (addon_id) REFERENCES add_ons(id)
);
```

### Key Features

1. **Referential Integrity**
   - Foreign key constraints ensure data consistency
   - Cascading deletes where appropriate
   - Proper indexing on lookup columns

2. **Data Types**
   - Appropriate use of VARCHAR for variable-length strings
   - TEXT for long descriptions
   - DECIMAL for monetary values
   - DATETIME for timestamps
   - ENUM for status fields

3. **Constraints**
   - NOT NULL where required
   - UNIQUE constraints (e.g., booking_id)
   - DEFAULT values for boolean flags

4. **Relationships**
   - One-to-Many (e.g., PackageCategory to Package)
   - Many-to-Many (e.g., Booking to AddOn)
   - One-to-One where appropriate

5. **Audit Fields**
   - Creation timestamps
   - Update timestamps
   - Status tracking

### Database Maintenance

1. **Backups**
   - Regular automated backups
   - Point-in-time recovery capability
   - Backup verification procedures

2. **Performance**
   - Indexed foreign keys
   - Optimized queries
   - Regular maintenance tasks

3. **Security**
   - Encrypted sensitive data
   - Role-based access control
   - SQL injection prevention

## Core Domain Models

The system is built around several key entities that model the boat charter business domain:

### 1. Package Management

#### PackageCategory
Represents the main categories of services offered:
```
PackageCategory
├── id          (Long)
├── name        (String, required)
├── description (String)
├── iconUrl     (String)
└── packages    (One-to-Many → Package)
```

#### Package
Defines specific offerings within each category:
```
Package
├── id               (Long)
├── name             (String, required)
├── description      (Text)
├── basePrice        (BigDecimal)
├── maxCapacity      (Integer)
├── duration         (Integer)
├── isActive         (Boolean)
├── categoryId       (Long → PackageCategory)
├── durationMinutes  (Integer)
├── isPrivate        (Boolean)
├── distanceMinKm    (Integer)
├── distanceMaxKm    (Integer)
├── fishingType      (String)
├── imageUrl         (String)
├── priceTiers       (One-to-Many → PriceTier)
├── services         (One-to-Many → IncludedService)
└── category         (Many-to-One → PackageCategory)
```

### 2. Booking System

#### Booking
The central entity managing customer reservations:
```
Booking
├── id               (Long)
├── bookingId        (String, unique)
├── status           (Enum: INCOMPLETE, PENDING, COMPLETE, CANCELLED)
│
├── Customer Info
│   ├── firstName    (String, required)
│   ├── lastName     (String, required)
│   ├── phoneNumber  (String, required)
│   ├── email        (String, required)
│   ├── addressLine1 (String, required)
│   ├── addressLine2 (String, optional)
│   ├── postalCode   (String, required)
│   ├── city         (String, required)
│   └── country      (String, required)
│
├── Reservation Details
│   ├── jettyPoint   (Many-to-One → JettyPoint)
│   ├── bookingDate  (LocalDate, required)
│   ├── passengers   (Integer, required)
│   └── package      (Many-to-One → Package)
│
├── Options
│   ├── addOns           (Many-to-Many → AddOn)
│   ├── alternativeDate1 (LocalDate)
│   ├── alternativeDate2 (LocalDate)
│   └── specialRemarks   (String)
│
└── System Fields
    ├── createdAt    (LocalDateTime)
    └── updatedAt    (LocalDateTime)
```

### 3. Supporting Entities

#### JettyPoint
Manages departure locations:
```
JettyPoint
├── id          (Long)
├── name        (String, required)
└── description (String)
```

#### AddOn
Additional services that can be added to bookings:
```
AddOn
├── id          (Long)
├── name        (String, required)
├── description (String)
├── price       (BigDecimal)
└── isActive    (Boolean)
```

#### PriceTier
Flexible pricing structure for different customer categories:
```
PriceTier
├── id          (Long)
├── ageMin      (Integer)
├── ageMax      (Integer)
├── price       (BigDecimal)
└── package     (Many-to-One → Package)
```

#### IncludedService
Services included in each package:
```
IncludedService
├── id          (Long)
├── name        (String, required)
└── package     (Many-to-One → Package)
```

### 4. Entity Relationships

The system implements several key relationships:
1. **Package Hierarchy**:
   - Each `Package` belongs to one `PackageCategory`
   - A `PackageCategory` can have multiple `Package`s

2. **Booking Relationships**:
   - A `Booking` is associated with one `Package`
   - A `Booking` can have multiple `AddOn`s
   - A `Booking` is associated with one `JettyPoint`

3. **Package Components**:
   - A `Package` can have multiple `PriceTier`s for different age groups
   - A `Package` includes multiple `IncludedService`s

## API Endpoints

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

## Deployment

### Production Build

1. Backend
```bash
mvn clean package -P prod
```

2. Frontend
```bash
npm run build
```

### Server Requirements

- Java 17 Runtime
- MySQL 8.0
- Nginx (recommended)
- 2GB RAM minimum
- 20GB storage

### Deployment Steps

1. Database Setup
- Create production database
- Apply migrations
- Set up backup system

2. Application Deployment
- Configure environment variables
- Deploy JAR file
- Set up frontend static files
- Configure Nginx reverse proxy

3. Monitoring Setup
- Configure logging
- Set up monitoring tools
- Enable error tracking

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

## Maintenance Guide

### Regular Tasks

1. Database Maintenance
- Regular backups
- Index optimization
- Data cleanup
- Performance monitoring

2. System Updates
- Dependency updates
- Security patches
- Feature updates
- Bug fixes

3. Monitoring
- System health checks
- Error tracking
- Performance metrics
- User analytics

### Emergency Procedures

1. System Downtime
- Incident response plan
- Rollback procedures
- Communication protocol
- Recovery steps

2. Data Recovery
- Backup restoration
- Data verification
- System validation
- Service restoration

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
