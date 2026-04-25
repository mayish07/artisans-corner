================================================================
TITLE PAGE / OUTER COVER
================================================================

YENEPOYA INSTITUTE OF ARTS, SCIENCE, COMMERCE AND MANAGEMENT
A CONSTITUENT UNIT OF YENEPOYA (DEEMED TO BE UNIVERSITY)
BALMATTA, MANGALORE


A PROJECT REPORT ON

“ARTISAN'S CORNER: MULTI-VENDOR HANDMADE GOODS MARKETPLACE”


SUBMITTED BY
MOHAMMED MAYISH
III BCA
(BACHELOR OF COMPUTER APPLICATIONS)
REG NO: 23BCAICD214

UNDER THE GUIDANCE OF
<NAME OF INTERNAL GUIDE>
DESIGNATION: ASSISTANT PROFESSOR
DEPARTMENT OF COMPUTER APPLICATIONS


IN PARTIAL FULFILLMENT OF THE REQUIREMENT FOR THE AWARD OF THE DEGREE OF
BACHELOR OF COMPUTER APPLICATION


YENEPOYA INSTITUTE OF ARTS, SCIENCE, COMMERCE AND MANAGEMENT
(A constituent unit of Yenepoya Deemed to be University)
Deralakatte, Mangaluru – 575018, Karnataka, India


================================================================
CERTIFICATE
================================================================

CERTIFICATE

This is to certify that the project work entitled “ARTISAN'S CORNER: MULTI-VENDOR HANDMADE GOODS MARKETPLACE” has been successfully carried out at Yenepoya Institute of Arts, Science, Commerce and Management by Mohammed Mayish (Reg. No. 23BCAICD214), student of 3rd Year BCA (Bachelor of Computer Applications), under the supervision and guidance of <Internal Guide Name>, Assistant Professor, Department of Computer Applications, Yenepoya Institute of Arts, Science, Commerce and Management.

This dissertation is submitted in partial fulfilment for the award of degree in Bachelor of Computer Application by Yenepoya (Deemed to be University) during academic year 2025-26.


Internal Guide:                                     Chairperson:


Internal Examiner:                                 External Examiner:


PRINCIPAL
Dr. Jeevan Raj
The Yenepoya Institute of Arts,
Science, Commerce and Management
(Deemed To be University)


Submitted for the Viva-Voce                              Place: Mangalore

Examination held on:                                   Date: 2026



================================================================
DECLARATION
================================================================

DECLARATION

I, Mohammed Mayish, a student of BCA (Bachelor of Computer Applications) at Yenepoya Institute of Arts, Science, Commerce and Management, Balmatta, Mangalore, affiliated with Yenepoya (Deemed to be University), hereby declare that this project report titled "ARTISAN'S CORNER: MULTI-VENDOR HANDMADE GOODS MARKETPLACE" is a genuine and original record of the work undertaken by me as part of my academic curriculum.

This report documents the development of a multi-vendor e-commerce marketplace platform for handmade goods, including methodologies, system design, implementation approaches, and testing procedures aligned with recognized software engineering standards.

I extend my sincere gratitude to <Internal Guide Name>, Project Guide, for his/her valuable guidance, mentorship, and support throughout the project development. I also express my appreciation to Yenepoya Institute of Arts, Science, Commerce and Management for providing an enriching learning environment.

Furthermore, I acknowledge the support and encouragement received from my institutional guide, <Guide Name>, and the faculty of Yenepoya Institute of Arts, Science, Commerce and Management. Their insights and assistance have been instrumental in successfully completing this project.



Intern Signature:
Name: Mohammed Mayish
Date:


Institution Guide Signature:


Name: <Guide Name>
Institute: Yenepoya Institute of Arts, Science, Commerce and Management
Date:


Head of the Department (HOD) Signature:


Name: Dr. Rathnakar Shetty P
Head of Department of Computer Applications
Institute: Yenepoya Institute of Arts, Science, Commerce and Management
Date:


================================================================
ACKNOWLEDGEMENT
================================================================

ACKNOWLEDGEMENT

I sincerely express my gratitude to Yenepoya Institute of Arts, Science, Commerce and Management, affiliated with Yenepoya (Deemed to be University), Mangalore, for providing me with the opportunity to undertake this project as part of my academic curriculum.

I extend my heartfelt thanks to Dr. Jeevan Raj, Principal, for his continuous support and guidance in facilitating this learning opportunity. I also express my sincere appreciation to Dr. Rathnakar Shetty P, Head of Department (Computer Applications), for his encouragement and academic support throughout my project journey.

I am deeply grateful to <Organization Name> and <Organization Head>, for his visionary leadership and for fostering a dynamic learning environment. A special note of appreciation goes to <External Guide Name>, for his/her invaluable mentorship, expert guidance, and for sharing his vast experience in the field.

I also extend my sincere gratitude to the <Internship Program Head>, for their technical insights, hands-on training, and unwavering support during my internship. Their guidance has been instrumental in enhancing my practical understanding of full-stack web development.

I am also thankful to my internal guide, <Guide Name>, for his academic mentorship and for providing valuable insights that helped bridge the gap between theoretical learning and practical application.

Lastly, I am grateful to my faculty mentors, family, and peers for their encouragement and motivation throughout this journey.


Name/Reg No: Mohammed Mayish / 23BCAICD214
Date: April 2026



================================================================
LIST OF TABLES
================================================================

Table No.    Description                                                      Page No.
1            Comparison of E-commerce Platforms                                   12
2            Technology Stack Comparison                                    15
3            User Roles and Permissions                                      28
4            Feature Comparison Matrix                                     29
5            Functional Requirements Specification                         45
6            Non-Functional Requirements Specification                    48
7            Hardware Requirements                                         52
8            Software Requirements                                         53
9            System Modules and Functions                                  58
10           API Endpoints Summary                                        62
11           Database Collections Schema                                  67
12           Testing Test Cases Summary                                   78
13           User Authentication Test Cases                               81
14           Product Management Test Cases                                82
15           Shopping Cart Test Cases                                      83
16           Checkout and Payment Test Cases                              84
17           Order Management Test Cases                                  85
18           Test Case Summary                                           86



================================================================
LIST OF FIGURES
================================================================

Fig No.     Description                                                      Page No.
1           System Architecture Diagram                                     18
2           Data Flow Diagram                                           21
3           Use Case Diagram                                           24
4           ER Diagram (Entity-Relationship)                              27
5           Class Diagram                                              31
6           Component Architecture                                      35
7           Module Flow Diagram                                       38
8           State Transition Diagram - Order Processing                41
9           System Overview - Home Page Wireframe                      55
10          Vendor Dashboard Wireframe                                56
11          Authentication Flow Diagram                               60
12          Product Upload Process Flow                              63
13          Shopping Cart Process Flow                             69
14          Checkout Process Flow                                 72
15          Order Status Flow                                   75
16          Database Schema Design                               77
17          Deployment Architecture                            87
18          Screen Mockup - Home Page                        91
19          Screen Mockup - Product Listing                 92
20          Screen Mockup - Cart Page                    93
21          Screen Mockup - Vendor Dashboard             94



================================================================
ABSTRACT
================================================================

ABSTRACT

This project report presents the development of "Artisan's Corner: Multi-Vendor Handmade Goods Marketplace," a full-featured web-based e-commerce platform designed to connect artisans and craft makers directly with customers seeking unique handcrafted products. The application enables multiple vendors to establish their own stores within a unified marketplace, manage product listings, process orders, and receive secure payments through integrated payment gateways.

The system is built using modern web technologies including React.js for the frontend user interface, Node.js with Express.js for the backend API, MongoDB for database management, and Stripe for payment processing. The platform supports three distinct user roles: Buyers who can browse products, add items to cart, and make purchases; Vendors who can create stores, manage inventory, and track sales; and Administrators who can approve vendors, moderate content, and monitor platform performance.

The primary objectives of this project include implementing secure user authentication with role-based access control, developing a multi-vendor store management system, creating product catalog functionality with multi-image support, building shopping cart and wishlist features, integrating Stripe payment gateway, developing order management and tracking, implementing product review and rating system, creating vendor dashboard with analytics, and developing admin panel for platform management.

The methodology adopted follows the Model-View-Controller (MVC) architectural pattern combined with RESTful API design principles. The development approach used iterative feature development, progressing from authentication foundation through product management, shopping features, checkout integration, reviews, dashboards, and final polish.

Key features implemented include JWT-based authentication with email verification, vendor application and approval workflow, product CRUD operations with Cloudinary image storage, shopping cart with save-for-later functionality, wishlist management, secure Stripe checkout, order status tracking (Pending, Shipped, Delivered), product reviews with star ratings, Chart.js sales analytics, real-time notifications via Socket.io, and responsive design with Tailwind CSS.

The completed system demonstrates comprehensive full-stack development capabilities and serves as a solid foundation for online marketplace applications in the handmade goods e-commerce sector.

Keywords: Multi-Vendor E-commerce, Marketplace, React.js, Node.js, MongoDB, Stripe Payment, JWT Authentication, Redux Toolkit, Tailwind CSS


================================================================
TABLE OF CONTENTS
================================================================

CHAPTER 1: INTRODUCTION
1.1 Background                                                     1
1.2 Objectives                                                      5
1.3 Purpose                                                         7
1.4 Scope                                                          8
1.5 Data Sources                                                   10
1.6 Problem Definition                                             11

CHAPTER 2: TOOLS AND TECHNOLOGY USED
2.1 Frontend Technologies                                         15
2.2 Backend Technologies                                         18
2.3 Database Technologies                                       22
2.4 Third-Party Integrations                                     25
2.5 Development Tools                                            27

CHAPTER 3: DATA COLLECTION AND ANALYSIS
3.1 Data Collection                                               30
3.2 Data Preprocessing                                             33
3.3 Feature Engineering                                           36
3.4 Exploratory Data Analysis                                      39

CHAPTER 4: SYSTEM REQUIREMENTS AND ANALYSIS
4.1 System Requirements Specification                              45
4.1.1 Functional Requirements                                     45
4.1.2 Non-Functional Requirements                                49
4.2 Hardware and Software Requirements                          52
4.3 System Overview                                           55
4.4 System Analysis                                           58

CHAPTER 5: IMPLEMENTATION
5.1 System Design/Algorithms                                     62
5.2 Workflow/Process Diagrams                                   67
5.3 Module Description                                        73
5.4 Coding Standards                                          79
5.5 Testing and Validation                                     82

CHAPTER 6: FUTURE SCOPE AND CONCLUSION
6.1 Future Scope                                               88
6.2 Limitations                                                91
6.3 Conclusion                                                 93
6.4 Achievements                                               95

CHAPTER 7: BIBLIOGRAPHY                                             98


================================================================
CHAPTER 1: INTRODUCTION
================================================================

CHAPTER 1: INTRODUCTION

1. BACKGROUND

The digital revolution has transformed the way businesses operate and consumers shop. E-commerce has become an integral part of modern retail, with online marketplaces offering unprecedented convenience, variety, and accessibility to customers worldwide. Among the various segments of e-commerce, the handmade goods market has witnessed significant growth as consumers increasingly value unique, artisanal products over mass-manufactured items. This project, "Artisan's Corner: Multi-Vendor Handmade Goods Marketplace," addresses this growing demand by creating a specialized platform connecting artisans directly with customers.

1.1.1 Industry Context and Background

The global e-commerce market has experienced exponential growth over the past decade, with online retail sales projected to reach trillions of dollars annually. Within this broader market, handmade and artisanal goods represent a unique segment characterized by uniqueness, craftsmanship, and individual artistic expression. Consumers purchasing handmade items often seek products that tell a story, represent cultural heritage, or support local communities.

Traditional retail channels for handmade goods include craft fairs, artisan markets, gift shops, and boutique stores. However, these physical marketplaces impose significant limitations on artisans:

Geographic Constraints: Physical markets are limited to local or regional audiences, restricting the potential customer base. An artisan in a small town may have exceptional skills but limited opportunities to reach customers beyond their immediate community.

Intermediary Costs: Artisans often sell through galleries, gift shops, or consignment stores that take substantial commissions (often 30-50% of sale price). These intermediaries reduce artisan profits while adding to consumer prices.

Limited Operating Hours: Physical stores operate during fixed hours, limiting sales opportunities to specific time periods.

Inventory Challenges: Managing inventory in physical stores requires significant investment in display space and storage.

Marketing Complexity: Individual artisans often lack resources for effective marketing and brand building.

1.1.2 Technology Background

Modern web technologies have enabled the creation of sophisticated e-commerce platforms that address these traditional limitations. The MERN stack (MongoDB, Express.js, React.js, Node.js) has emerged as a popular choice for building full-stack web applications due to its unified JavaScript development model, extensive ecosystem, and scalability.

Key technological advancements that enable multi-vendor marketplaces include:

Cloud Computing: Services like MongoDB Atlas provide fully managed database infrastructure, eliminating the need for dedicated database administrators.

Payment Processing: APIs like Stripe simplify payment integration, enabling secure transaction processing without complex merchant account setups.

Image Storage: Cloud services like Cloudinary provide scalable image storage with automatic optimization and content delivery.

Authentication: JWT (JSON Web Token) based authentication provides secure, stateless authentication suitable for scalable applications.

Real-time Communication: Socket.io enables real-time features like notifications and live chat.

1.1.3 Problem Context

Existing e-commerce platforms present challenges specific to the handmade goods market:

Generic Platform Design: Major platforms like Amazon and eBay are designed for mass-produced goods, lacking features specific to handmade products such as artisan profiles, craft stories, or maker information.

Multi-Vendor Complexity: While some platforms support multiple vendors, they often charge high fees or lack vendor-specific features like store customization and sales analytics.

Competing with Mass Production: Handmade sellers on generic platforms compete directly with mass-produced items, making it difficult to communicate the value of handcrafted goods.

No Verification System: Generic platforms lack mechanisms to verify vendor authenticity or product uniqueness.

This project addresses these challenges by creating a specialized multi-vendor marketplace specifically designed for handmade goods, with features tailored to artisan needs and customer expectations.

1.1.4 Project Overview

Artisan's Corner is a full-featured multi-vendor e-commerce marketplace that enables multiple artisans to operate independent stores within a unified platform. The system provides:

For Buyers:
- Browse and search products from multiple vendors
- Add products to shopping cart or wishlist
- Secure checkout with Stripe payment
- Order tracking and history
- Product reviews and ratings
- Save for later functionality

For Vendors:
- Create and manage store profile
- Multi-image product uploads
- Inventory management
- Order management
- Sales dashboard with analytics
- Earnings tracking

For Administrators:
- Vendor approval and management
- Product moderation
- Platform revenue monitoring
- User management

The system calculates a 5% platform commission on vendor sales, providing a sustainable revenue model while keeping commissions lower than traditional consignment arrangements.


================================================================
1.2 OBJECTIVES
================================================================

1. OBJECTIVES

The primary objectives of this project are centered on creating a comprehensive multi-vendor e-commerce platform that addresses the needs of artisans, customers, and platform administrators. This section details the specific goals that guided the development of the Artisan's Corner marketplace.

1.2.1 Primary Objectives

1.2.1.1 Implement Secure User Authentication System

One of the fundamental objectives is to create a robust authentication system that handles user registration, login, email verification, and password reset functionality. The authentication system must:

Support multiple user roles (Buyer, Vendor, Administrator) with appropriate access controls

Implement JWT-based authentication with access and refresh tokens for secure, stateless sessions

Include email verification to ensure genuine user registrations

Provide password reset functionality through secure token-based flows

Hash passwords using bcrypt with appropriate salt rounds to prevent rainbow table attacks

The authentication system forms the foundation for all other platform features, making security and reliability paramount considerations.

1.2.1.2 Develop Multi-Vendor Store Management System

The platform must enable multiple vendors to create and manage their own stores within the marketplace. The store management system should:

Allow vendors to create store profiles with name, description, and logo

Include a vendor application and approval workflow

Enable store profile editing and updates

Provide vendor verification status indicators

Support store-specific product listings

The multi-vendor architecture distinguishes this platform from single-vendor e-commerce sites and requires careful attention to data isolation and access control.

1.2.1.3 Create Product Catalog Functionality

Products are the core content of the marketplace. The product management system must:

Support full CRUD (Create, Read, Update, Delete) operations

Enable multi-image uploads (up to 5 images per product)

Include product categorization and filtering

Support inventory tracking with stock quantities

Provide product search and filtering capabilities

Enable product disabling without permanent deletion

Products should include comprehensive information including name, description, price, category, stock quantity, and images to assist customer purchase decisions.

1.2.1.4 Build Shopping Cart and Wishlist Features

Shopping cart functionality is essential for e-commerce conversion. The cart system must:

Allow adding products with quantity selection

Support quantity modification within stock limits

Enable item removal

Implement save-for-later functionality

Calculate real-time cart totals including any applicable fees

Persist cart data across sessions

The wishlist feature enables customers to save products for future purchase consideration, improving customer experience and potential repeat visits.

1.2.1.5 Integrate Stripe Payment Gateway

Secure payment processing is critical for customer trust and platform functionality. The payment integration must:

Support credit and debit card payments

Create payment intents during checkout

Handle payment webhooks for order confirmation

Support test mode for development and testing

Process refunds when necessary

Calculate and collect platform commission

Stripe integration provides professional payment processing while managing the complexity of PCI compliance.

1.2.1.6 Develop Order Management and Tracking

Order processing requires careful coordination between buyers, vendors, and the platform. The order system must:

Create orders from completed purchases

Track order status progression (Pending, Shipped, Delivered)

Provide order history for buyers and vendors

Enable vendors to update order status

Calculate vendor earnings after commission deduction

Support order cancellation for pending orders

1.2.1.7 Implement Product Review and Rating System

Customer reviews build trust and provide valuable feedback. The review system must:

Allow verified purchasers to leave reviews

Support 1-5 star ratings

Include text comments

Display aggregate ratings on product pages

Enable vendor responses to reviews

Prevent duplicate reviews from same user

1.2.1.8 Create Vendor Dashboard with Analytics

Vendors require tools to manage their businesses effectively. The vendor dashboard must:

Display sales analytics with visualizations

Show earnings and commission summaries

List pending and completed orders

Provide product performance metrics

Enable order status updates

The Chart.js library provides visual analytics that help vendors understand their sales performance.

1.2.1.9 Develop Admin Panel for Platform Management

Platform administrators require tools to manage the marketplace. The admin panel must:

Review and approve vendor applications

Moderate products and content

View platform-wide statistics

Manage users and accounts

Monitor revenue and commissions

The admin functionality ensures platform quality and compliance with marketplace policies.


================================================================
1.3 PURPOSE
================================================================

1. PURPOSE

The purpose of this project is to develop a comprehensive multi-vendor e-commerce platform that bridges the gap between artisans and customers seeking handmade goods, while demonstrating proficiency in modern web development technologies.

1.3.1 Educational Purpose

This project serves as a culminating demonstration of the knowledge and skills acquired during the Bachelor of Computer Applications program. The development process requires application of:

Full-stack Development: Combining frontend and backend technologies to create a complete web application

Database Design: Modeling data structures and relationships in a NoSQL database

API Development: Creating RESTful interfaces for client-server communication

Authentication and Security: Implementing secure authentication flows and data protection

Payment Integration: Integrating third-party payment services

Project Management: Planning, executing, and delivering a complex software project

The project demonstrates competency across all major areas of web development, preparing the developer for professional roles in the software industry.

1.3.2 Social Purpose

Beyond educational goals, this project addresses genuine social needs:

Supporting Artisans: Many talented artisans lack technical skills to establish online presence. This platform provides accessible tools for selling handmade goods.

Preserving Crafts: Handmade traditions face extinction in an age of mass production. Platforms like Artisan's Corner help preserve traditional crafts by providing economic viability.

Community Building: The platform connects customers directly with makers, fostering appreciation for handmade goods and supporting local economies.

Sustainable Commerce: By eliminating intermediaries, the platform enables fair compensation for artisans while offering competitive prices to customers.

1.3.3 Technical Purpose

The project demonstrates technical proficiency in:

Component-based UI Development: React.js enables creation of reusable, maintainable UI components

State Management: Redux Toolkit provides predictable state management for complex application flows

Server-side Development: Node.js and Express.js create scalable backend services

Database Operations: MongoDB with Mongoose provides flexible data modeling

API Design: RESTful principles ensure clean, scalable interfaces

Security Implementation: JWT authentication, password hashing, and input validation

DevOps Practices: Understanding of deployment, testing, and development workflows


================================================================
1.4 SCOPE
================================================================

1. SCOPE

The scope defines the boundaries of the project, including features to be implemented and deliberate exclusions to guide development focus and manage expectations.

1.4.1 In-Scope Features

The following features are within the scope of this project:

1.4.1.1 User Management

User registration with email and password

User login with JWT authentication

Role-based access control (Buyer, Vendor, Administrator)

Email verification functionality

Password reset via email

User profile management

The user management system supports the three main user roles and enables secure platform access.

1.4.1.2 Vendor Store Management

Vendor application submission

Admin approval workflow

Store profile creation and editing

Store-specific product listing

Vendor verification display

The store management system enables multiple vendors to operate within the single marketplace.

1.4.1.3 Product Catalog

Full CRUD operations for products

Multi-image upload support (up to 5 images)

Product categorization

Search functionality

Filtering by category and price

Inventory tracking

The product catalog provides comprehensive product management for vendors.

1.4.1.4 Shopping Features

Shopping cart with full functionality

Save-for-later feature

Wishlist management

Add to cart from wishlist

Persistent cart across sessions

The shopping features provide familiar e-commerce functionality optimized for the marketplace model.

1.4.1.5 Checkout and Payment

Stripe payment integration

Credit/debit card processing

Order creation on successful payment

Payment webhook handling

Test mode for development

The payment system enables secure, professional transaction processing.

1.4.1.6 Order Management

Order creation and tracking

Status updates (Pending, Shipped, Delivered)

Order history for buyers and vendors

Vendor order management

Earnings calculation after commission

The order system coordinates the complete purchase fulfillment process.

1.4.1.7 Reviews and Ratings

Product reviews from verified purchasers

1-5 star ratings

Average rating calculation

Vendor response capability

Review display on product pages

The review system builds trust through authentic customer feedback.

1.4.1.8 Dashboards and Analytics

Vendor sales dashboard with Chart.js

Order management interface

Revenue and commission tracking

Platform statistics for admin

Real-time data updates

Dashboards provide valuable business insights for vendors and administrators.

1.4.1.9 Real-time Features

Socket.io notifications

Order status updates

New order alerts

Notification management

Real-time functionality enhances user experience through immediate feedback.

1.4.1.10 Responsive Design

Mobile-friendly layouts

Responsive navigation

Touch-optimized interactions

Cross-browser compatibility

Responsive design ensures accessibility across devices.

1.4.2 Out-of-Scope Features

The following features are deliberately outside the project scope:

Mobile Application Development

Native mobile apps (iOS/Android) are not included. The responsive web design provides mobile browser access but native applications require separate development.

Multi-Currency Support

The platform operates in USD only. Multi-currency support requires additional payment processor configuration and currency conversion logic.

International Shipping

Shipping calculations for international destinations are not implemented. Flat-rate or local pickup shipping is assumed.

AI-Based Recommendations

Product recommendations using machine learning are beyond current scope. Basic search and filtering are provided.

Live Chat

Real-time chat between buyers and vendors is not implemented. Socket.io notifications provided instead.

Social Media Integration

Social login and sharing features are not included. Standard email-based authentication is provided.

Vendor-to-Vendor Communication

Communication features between vendors are not implemented.

Multi-Language Support

The platform operates in English only. Multi-language support requires additional internationalization work.

Vendor Subscription Plans

Simple commission model only. Tiered subscription plans are future work.

Advanced Business Intelligence

Basic analytics in vendor dashboard. Advanced BI features require additional development.

The out-of-scope features represent potential future enhancements that could be added in subsequent development phases.


================================================================
1.5 DATA SOURCES
================================================================

1. DATA SOURCES

The development of this multi-vendor e-commerce marketplace relies on various data sources for system design, content, and functionality validation.

1.5.1 Technical Documentation

Official documentation from technology providers serves as primary reference:

MongoDB Documentation: Official Mongoose ODM documentation for database schema design and query operations

React.js Documentation: Component development patterns and hook usage

Node.js Documentation: Server-side JavaScript runtime and module system

Express.js Documentation: Web application framework routing and middleware

Stripe Documentation: Payment integration APIs and webhook handling

Cloudinary Documentation: Image upload and transformation APIs

These official sources ensure accurate implementation following vendor best practices.

1.5.2 Learning Resources

Online tutorials and courses provide additional implementation guidance:

Full-stack e-commerce tutorials

React.js best practices

Node.js authentication patterns

MongoDB schema design patterns

Payment integration guides

Learning resources supplement official documentation with practical implementation examples.

1.5.3 Sample Data

The system requires sample data for demonstration and testing:

Sample user accounts (admin, vendor, buyer)

Sample product listings

Sample product categories

Sample store information

Sample product images

Sample reviews and ratings

Sample data enables functional testing and provides demonstration capabilities.

1.5.4 Data Flow Requirements

User Data:
- Registration information (name, email, password)
- Authentication tokens
- Profile information
- Role assignments

Product Data:
- Name, description, price
- Category classification
- Stock quantities
- Image references
- Vendor associations

Order Data:
- Buyer information
- Product items
- Payment status
- Shipping information
- Order status

Vendor Data:
- Store profile
- Products listed
- Orders received
- Earnings and commissions

The data sources collectively inform system design and ensure comprehensive functionality.


================================================================
1.6 PROBLEM DEFINITION
================================================================

1. PROBLEM DEFINITION

This section clearly defines the problem that the Artisan's Corner project addresses, establishing the foundation for the solution design.

1.6.1 Problem Statement

The traditional marketplace for handmade goods faces critical limitations that prevent artisans from reaching their full potential and customers from easily finding unique handcrafted products. Existing e-commerce solutions either lack multi-vendor functionality or charge excessive fees that make them impractical for small-scale artisans. There is a need for a specialized, affordable platform that connects artisans directly with customers while providing the features necessary for successful online selling.

1.6.2 Problem Analysis

1.6.2.1 Market Access Problem

Artisans typically sell through local craft fairs, gift shops, or personal networks. These channels:

Limit customer reach to geographic area

Reduce profit margins through intermediary commissions

Require significant time investment for selling

Limit operating hours to event/shop schedules

Proposed Solution: Online marketplace enables global customer reach with minimal overhead, operating 24/7.

1.6.2.2 Technical Barrier Problem

Building individual e-commerce stores requires:

Web development knowledge

Payment processor setup

Server and domain management

Image optimization and storage

Security implementation

Proposed Solution: Shared platform infrastructure eliminates technical barriers for individual artisans.

1.6.2.3 Trust and Verification Problem

Customers purchasing handmade goods need:

Assurance of product authenticity

Verification of vendor credibility

Product quality indicators

Return/refund policies

Proposed Solution: Vendor verification, product reviews, and order tracking build customer trust.

1.6.2.4 Payment Processing Problem

Individual sellers face challenges:

High payment processor fees for small volumes

Complex merchant account setup

Limited transaction options

Proposed Solution: Integrated Stripe processing with platform merchant account enables professional payments.

1.6.2.5 Platform Fee Problem

Existing multi-vendor platforms charge:

High monthly fees

Large transaction commissions (10-30%)

Additional feature charges

Proposed Solution: Simple 5% commission model keeps more revenue with vendors while funding platform operations.

1.6.3 Problem Requirements

The solution must address:

Platform Viability: Create sustainable platform revenue through commission model

Vendor Accessibility: Enable easy vendor onboarding and store creation

Customer Experience: Provide intuitive product discovery and purchase process

Trust Building: Implement verification and review systems

Technical Infrastructure: Ensure scalable, reliable platform operation

Security: Protect user data and payment information

1.6.4 Solution Overview

Artisan's Corner addresses these problems through:

Multi-Vendor Architecture: Multiple vendors operate within single platform

Role-Based Access: Buyer, Vendor, and Administrator roles with appropriate permissions

Store Management: Vendor store creation and product listing capabilities

Shopping Features: Cart, wishlist, and checkout functionality

Payment Integration: Stripe payment processing

Commission Model: 5% platform commission on vendor sales

Analytics: Vendor dashboards and admin panels for business insights

The problem definition establishes clear requirements that guide system design and implementation decisions throughout the project development.


================================================================
CHAPTER 2: TOOLS AND TECHNOLOGY USED
================================================================

CHAPTER 2: TOOLS AND TECHNOLOGY USED

This chapter provides a comprehensive overview of the technologies used in developing the Artisan's Corner multi-vendor e-commerce marketplace. The technology stack has been carefully selected to ensure scalability, maintainability, and alignment with industry best practices.

2. FRONTEND TECHNOLOGIES

The frontend technologies form the user-facing layer of the application, handling all customer interactions and interface rendering.

2.1.1 React.js

React.js is a JavaScript library for building user interfaces, developed and maintained by Facebook (Meta). It serves as the core frontend framework for Artisan's Corner.

Key Features:

Component-Based Architecture: React applications are built using reusable, self-contained components that encapsulate their own structure and behavior. Components like ProductCard, Navbar, CartDrawer are independent UI elements that can be composed to create complex interfaces.

Virtual DOM: React uses a virtual representation of the DOM, enabling efficient updates by calculating minimal changes before updating the actual DOM. This results in improved performance for dynamic applications.

Declarative Syntax: Developers describe how the UI should look for a given state, and React automatically updates the DOM when state changes occur.

One-Way Data Flow: Data flows unidirectionally from parent to child components, making application state easy to manage and debug.

JSX Syntax: JSX allows developers to write HTML-like syntax in JavaScript, making component code more readable and maintainable.

Hooks: React Hooks (useState, useEffect, useContext, useReducer) enable state management in functional components without class-based syntax.

Version Used: React.js 18+

In Artisan's Corner:

React.js powers the complete frontend interface, including:

Product listing pages

Shopping cart interface

Vendor dashboard

Admin panel

User profile pages

The component-based architecture enables code reuse across the application and simplifies maintenance.

2.1.2 Redux Toolkit

Redux Toolkit is the official recommended approach for writing Redux logic in React applications. It simplifies store configuration and reduces boilerplate code.

Key Features:

Predictable State Container: Redux provides a single source of truth for application state, making state changes predictable and traceable.

DevTools Extension: Redux Chrome DevTools enable time-travel debugging and state inspection.

Scalable Architecture: Redux patterns scale from small to large applications with numerous state dependencies.

In Artisan's Corner:

Redux Toolkit manages:

User authentication state

Shopping cart state

Product data

Order information

UI state (loading, modals, errors)

Slice Pattern: Redux Toolkit uses "slices" to define reducers and actions for specific feature areas (authSlice, cartSlice, productSlice).

2.1.3 Tailwind CSS

Tailwind CSS is a utility-first CSS framework that enables rapid UI development through pre-defined utility classes.

Key Features:

Utility-First Classes: Styles are applied through pre-defined classes (e.g., "flex", "p-4", "text-center"), enabling rapid styling without custom CSS files.

Responsive Design: Built-in responsive prefixes (sm:, md:, lg:, xl:) enable device-specific layouts.

Customization: tailwind.config.js enables theme customization including colors, spacing, and breakpoints.

No Component Lock-in: Unlike component libraries, Tailwind provides building blocks rather than pre-built components.

In Artisan's Corner:

Tailwind CSS styles:

Navigation and headers

Product cards and grids

Forms and inputs

Buttons and interactive elements

Responsive layouts

The utility-first approach enables rapid development and easy customization without leaving HTML markup.

2.1.4 React Router DOM

React Router DOM enables client-side routing in React applications, enabling navigation without page refreshes.

Key Features:

Declarative Routing: Routes are defined as components, making routing configuration intuitive.

Dynamic Routing: Routes can include dynamic parameters for dynamic content pages.

Route Guards: Protected routes enforce authentication requirements.

Navigation API: Programmatic navigation enables route changes from code.

In Artisan's Corner:

React Router handles:

Product detail pages (/product/:id)

Store pages (/store/:id)

User dashboards (/dashboard, /admin)

Authentication routes (/login, /register)

2.1.5 Chart.js and react-chartjs-2

Chart.js is a JavaScript charting library that creates interactive charts. react-chartjs-2 provides React wrappers.

Chart Types:

Line Charts: Display trends over time for sales data

Bar Charts: Compare metrics across categories

Pie Charts: Show distribution (category breakdown)

Doughnut Charts: Display revenue sources

In Artisan's Corner:

Chart.js powers vendor dashboard analytics, showing daily/weekly/monthly sales trends, product performance comparisons, and category distributions.

2.1.6 Vite

Vite is a modern build tool and development server that provides fast hot module replacement (HMR).

Key Features:

Instant Server Start: Development server starts in milliseconds, regardless of project size.

Hot Module Replacement: Changes reflect instantly without full refresh.

Optimized Production Build: Production builds are optimized with code-splitting and minification.

Version Used: Vite 5+

In Artisan's Corner:

Vite provides:

Development server on http://localhost:5173

Production build optimization

Asset hashing and bundling

Environment variable handling


================================================================
2.2 BACKEND TECHNOLOGIES
================================================================

2. BACKEND TECHNOLOGIES

The backend technologies form the server-side layer that handles API requests, business logic, database operations, and integration with external services.

2.2.1 Node.js

Node.js is a JavaScript runtime built on Chrome's V8 engine, enabling server-side JavaScript execution.

Key Features:

Event-Driven Architecture: Node.js uses an event loop for non-blocking I/O operations, enabling high concurrency.

NPM Ecosystem: Node Package Manager provides access to hundreds of thousands of packages.

Unified Language: JavaScript on both frontend and backend simplifies development and code sharing.

Scalability: Non-blocking architecture enables handling of numerous concurrent connections.

Version Used: Node.js 18+

In Artisan's Corner:

Node.js runs the backend server, handling:

API request processing

Database operations

Authentication verification

Third-party service integration

File system operations

2.2.2 Express.js

Express.js is a minimal and flexible Node.js web application framework for building APIs and web servers.

Key Features:

Routing: Declarative routing handles specific URL patterns and HTTP methods.

Middleware: Custom and third-party middleware extends functionality.

Template Engines: Support for dynamic HTML rendering (not used in this project).

Error Handling: Built-in error handling middleware.

RESTful Design: Express naturally supports REST API patterns.

Version Used: Express.js 4+

In Artisan's Corner:

Express.js provides:

API route definitions

Request/response handling

Middleware configuration (authentication, validation, error handling)

Static file serving

CORS configuration

2.2.3 Mongoose

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing schema validation and object manipulation.

Key Features:

Schema Definition: Mongoose schemas define document structure with types, validation, and defaults.

Models: Models are constructors that compile schemas into working document instances.

Hooks: Pre and post hooks enable custom logic on database operations.

Query Builder: Chainable queries simplify complex database operations.

Population: Reference population enables JOIN-like operations across collections.

Version Used: Mongoose 7+

In Artisan's Corner:

Mongoose defines schemas for:

Users

Stores

Products

Cart Items

Orders

Reviews

Notifications

2.2.4 JSON Web Token (JWT)

JSON Web Token is a compact, URL-safe means of representing claims to be transferred between two parties.

Key Features:

Compact: JWTs are URL-safe and can be sent via URL parameters or HTTP headers.

Self-Contained: JWTs contain all necessary information, avoiding database lookups.

Verifiable: Digital signatures enable claim verification.

In Artisan's Corner:

JWT implements authentication:

Access Tokens: Short-lived tokens (15 minutes) for API authentication

Refresh Tokens: Long-lived tokens (7 days) for session renewal

Token Structure: Contains user ID and role in payload

2.2.5 bcryptjs

bcryptjs is a JavaScript implementation of the bcrypt password hashing algorithm.

Key Features:

Adaptive Cost: Hashing cost can be adjusted as computing power increases.

Secure: Based on the proven bcrypt algorithm.

Pure JavaScript: No native dependencies, enabling universal compatibility.

Salting: Automatic salt generation prevents rainbow table attacks.

In Artisan's Corner:

bcryptjs secures:

Password hashing during registration and login

Password comparison for authentication

Salt rounds configured for security

2.2.6 Express Validator

Express Validator is a set of express middleware for server-side data validation.

Key Features:

Chainable Validation: Multiple validators can be chained.

Custom Validation: Enables complex validation logic.

Sanitization: Input sanitization prevents injection attacks.

Error Formatting: Structured error messages for API responses.

In Artisan's Corner:

Express Validator validates:

User registration inputs (email format, password strength)

Product creation fields (required fields, price range)

Cart operations (valid quantities)

Order details (shipping address)

2.2.7 Helmet

Helmet is Express middleware that sets various HTTP headers for security.

Security Headers:

X-Content-Type-Options: Prevents MIME-type sniffing

X-Frame-Options: Prevents clickjacking

X-XSS-Protection: Enables XSS filtering

Strict-Transport-Security: Forces HTTPS

Content-Security-Policy: Controls resource loading

In Artisan's Corner:

Helmet secures API responses and prevents common web vulnerabilities.

2.2.8 CORS

CORS (Cross-Origin Resource Sharing) middleware enables cross-origin requests from specified origins.

Key Features:

Origin Whitelist: Specifies allowed origins

Methods: Defines allowed HTTP methods

Headers: Specifies allowed request headers

Credentials: Handles cookie sharing

In Artisan's Corner:

CORS configures:

Frontend origin (http://localhost:5173)

Production origin (deployed URL)

Allowed methods and headers


================================================================
2.3 DATABASE TECHNOLOGIES
================================================================

2. DATABASE TECHNOLOGIES

The database layer provides persistent storage for all application data, enabling data retrieval, modification, and relationships.

2.3.1 MongoDB

MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents with dynamic schemas.

Key Features:

Document Model: Data is stored in documents (analogous to rows in SQL) within collections (analogous to tables).

Dynamic Schemas: Documents in the same collection can have different fields.

Scalability: Horizontal scaling through sharding enables large data volumes.

Rich Queries: MongoDB supports complex queries, aggregations, and indexing.

In Artisan's Corner:

MongoDB stores:

User profiles and authentication data

Vendor store information

Product catalogs

Shopping carts

Order history

Product reviews

2.3.2 MongoDB Atlas

MongoDB Atlas is the cloud-hosted version of MongoDB, providing fully managed database infrastructure.

Key Features:

Fully Managed: Automatic backups, scaling, and maintenance

Cloud Providers: AWS, Azure, Google Cloud deployment options

Security: Built-in encryption and access control

Data API: RESTful data access without database drivers

Free Tier: Free cluster for development and testing

In Artisan's Corner:

MongoDB Atlas provides:

Free shared cluster for development

Automatic scaling when needed

Data persistence across sessions

Geographic distribution for performance

2.3.3 Database Schema Design

The database schema design defines collections, documents, and relationships for the marketplace.

Users Collection:
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: buyer, vendor, admin),
  avatar: String,
  isEmailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}

Stores Collection:
{
  _id: ObjectId,
  owner: ObjectId (ref: Users),
  name: String,
  slug: String (unique),
  description: String,
  logo: String,
  status: String (enum: pending, approved, rejected),
  createdAt: Date,
  updatedAt: Date
}

Products Collection:
{
  _id: ObjectId,
  vendor: ObjectId (ref: Users),
  store: ObjectId (ref: Stores),
  name: String,
  slug: String,
  description: String,
  price: Number,
  category: String,
  images: [String],
  stock: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}

Orders Collection:
{
  _id: ObjectId,
  buyer: ObjectId (ref: Users),
  items: [{
    product: ObjectId,
    vendor: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  commission: Number,
  vendorEarnings: Number,
  stripePaymentId: String,
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  status: String (enum: pending, shipped, delivered),
  createdAt: Date,
  updatedAt: Date
}

Reviews Collection:
{
  _id: ObjectId,
  product: ObjectId (ref: Products),
  user: ObjectId (ref: Users),
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}

2.3.4 Database Indexes

Indexes improve query performance for frequently accessed data:

Users: email (unique)
Products: vendor, category, isActive
Orders: buyer, status, createdAt
Reviews: product, rating

2.3.5 Data Relationships

The schema implements relationships:

User-to-Store: One-to-One (each vendor has one store)

User-to-Order: One-to-Many (one user can have many orders)

Store-to-Products: One-to-Many (one store can have many products)

Product-to-Reviews: One-to-Many (one product can have many reviews)

Order-to-Products: Many-to-Many (orders contain multiple products from multiple vendors)


================================================================
2.4 THIRD-PARTY INTEGRATIONS
================================================================

2. FOURTH-PARTY INTEGRATIONS

Third-party integrations extend the platform with specialized services for payments, media storage, emails, and real-time communication.

2.4.1 Stripe

Stripe is a payment processing platform that handles credit card payments with PCI-compliant infrastructure.

Key Features:

Payment Intents: Secure payment creation with client-side confirmation

Card Elements: Embedded payment forms for secure data handling

Webhooks: Event notifications for payment status changes

Test Mode: Testing environment with test card numbers

Refunds: API-based refund processing

In Artisan's Corner:

Stripe processes:

Credit and debit card payments

Payment intent creation during checkout

Webhook handling for payment confirmation

Refund processing for cancelled orders

Test card: 4242 4242 4242 4242

2.4.2 Cloudinary

Cloudinary is a cloud-based image management service for upload, storage, optimization, and transformation.

Key Features:

Image Upload: API-based file upload with automatic processing

Transformations: Resizing, cropping, format conversion

CDN Delivery: Global content delivery network

Auto-Optimization: Automatic format selection and compression

Lazy Loading: On-demand image delivery

In Artisan's Corner:

Cloudinary handles:

Product image uploads

Image transformations (thumbnails, optimized sizes)

URL generation for images

Image deletion

2.4.3 Nodemailer

Nodemailer is a Node.js module for sending emails using SMTP transport.

Key Features:

SMTP Support: Connection to email services via SMTP

HTML Emails: Support for rich email content

Templates: Variable substitution for dynamic content

Attachments: File attachments support

In Artisan's Corner:

Nodemailer sends:

Verification emails

Password reset emails

Order confirmation emails

New order notifications to vendors

2.4.4 Socket.io

Socket.io is a JavaScript library for real-time, bidirectional communication between clients and servers.

Key Features:

WebSocket Fallback: Automatic fallback for older browsers

Rooms: Namespace for group communication

Events: Event-based communication model

Broadcasting: Server-to-multiple-client messaging

In Artisan's Corner:

Socket.io provides:

Real-time order status notifications

New order alerts to vendors

Real-time cart updates

Notification delivery

2.4.5 Third-Party Service Comparison

Service          Purpose                 Free Tier           Key Feature
Stripe          Payments              Test Mode           PCI Compliant
Cloudinary     Images               25 credits/month    CDN Delivery
Nodemailer    Email              SMTP-dependent     Template Support
Socket.io     Real-time          Unlimited         Fallback Support


================================================================
2.5 DEVELOPMENT TOOLS
================================================================

2. DEVELOPMENT TOOLS

Development tools support the development, debugging, testing, and deployment processes.

2.5.1 Visual Studio Code

Visual Studio Code is a source code editor with debugging, syntax highlighting, and extension support.

Extensions Used:

ESLint: JavaScript linting

Prettier: Code formatting

Tailwind CSS IntelliSense: Tailwind autocomplete

GitLens: Git integration

Live Server: Local development server

2.5.2 Git

Git is a distributed version control system for tracking code changes.

Commands Used:

git init: Initialize repository

git add: Stage changes

git commit: Save changes

git push: Upload to remote

git pull: Download changes

Repository: GitHub

2.5.3 Postman

Postman is an API development and testing tool.

Uses:

API endpoint testing

Request debugging

Collection organization

Environment variables

Automated testing

2.5.4 MongoDB Compass

MongoDB Compass is a GUI for MongoDB database management.

Uses:

Database inspection

Query building

Data visualization

Index management

2.5.5 Browser DevTools

Browser DevTools (Chrome/Firefox) provide developer debugging capabilities.

Panels:

Elements: HTML inspection

Console: JavaScript debugging

Network: Request monitoring

Application: Storage inspection

2.5.6 Technology Stack Summary

Layer              Technology                 Version
Frontend           React.js                 18+
Frontend           Redux Toolkit            Latest
Frontend           Tailwind CSS            3+
Frontend           Vite                   5+
Backend            Node.js                 18+
Backend            Express.js              4+
Database           MongoDB                Latest
Database           Mongoose               7+
Auth               JSON Web Token         Latest
Auth               bcryptjs               Latest
Images             Cloudinary             Latest
Payments           Stripe                Latest
Email              Nodemailer             Latest
Real-time          Socket.io              Latest


================================================================
CHAPTER 3: DATA COLLECTION AND ANALYSIS
================================================================

CHAPTER 3: DATA COLLECTION AND ANALYSIS

This chapter addresses the data aspects of the project, including data sources, preprocessing, feature considerations, and exploratory analysis.

3. DATA COLLECTION AND ANALYSIS

Data collection and analysis form the foundation for any software system, informing design decisions and ensuring the system addresses actual requirements.

3.1 DATA COLLECTION

Data collection for this project encompasses requirements gathering, existing system analysis, and data sourcing for system functionality.

3.1.1 Requirements Data

3.1.1.1 Stakeholder Requirements

Through analysis of similar platforms and e-commerce best practices, the following stakeholder requirements were identified:

Buyer Requirements:
- Easy product discovery through search and categories
- Clear product information including multiple images
- Secure payment processing
- Order tracking and history
- Ability to leave reviews for purchased products
- Wishlist functionality for future purchases
- Responsive design for mobile browsing

Vendor Requirements:
- Easy store creation and setup
- Simple product listing process
- Multi-image upload capability
- Sales analytics and insights
- Order management tools
- Earnings tracking
- Notification of new orders

Administrator Requirements:
- Vendor approval workflow
- Product moderation capabilities
- Platform-wide statistics
- User management tools
- Revenue monitoring

3.1.1.2 Functional Requirements

The functional requirements derived from stakeholder analysis include:

Authentication: User registration, login, password reset, email verification

Store Management: Store creation, profile editing, application approval

Product Management: CRUD operations, image upload, categorization, search

Cart and Wishlist: Add/remove items, quantity update, save-for-later

Checkout: Address collection, payment processing, order creation

Order Management: Status updates, history tracking, vendor updates

Reviews: Leave reviews, star ratings, vendor responses

Dashboards: Sales analytics, earnings, order management

3.1.1.3 Non-Functional Requirements

Performance: Page load under 3 seconds, API response under 500ms

Security: Encrypted passwords, JWT authentication, input validation

Reliability: 99% uptime during operation

Usability: Intuitive navigation, clear CTAs, responsive design

Maintainability: Modular code structure, documentation

3.1.2 System Data

3.1.2.1 Database Collections

The system manages data in the following MongoDB collections:

Users: Store user accounts and authentication data

Stores: Vendor store profiles

Products: Product listings with images

Cart: Shopping cart contents per user

Wishlists: Saved products per user

Orders: Purchase records

Reviews: Product reviews and ratings

Notifications: System notifications

3.1.2.2 Sample Data Requirements

The system requires sample data for demonstration:

Users: 3 users (buyer, vendor, admin) with test passwords
Stores: 1 sample store with profile data
Products: 10+ sample products with multiple images
Categories: Handmade, Jewelry, Pottery, Textiles, Woodwork
Reviews: Sample reviews for products

3.1.2.3 API Data Requirements

The REST API exchanges data in JSON format:

Request Format:
{
  "field1": "value1",
  "field2": "value2"
}

Response Format:
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}

Error Response:
{
  "success": false,
  "error": "Error message"
}

3.1.3 External Data

3.1.3.1 Stripe Data

Stripe provides payment data:

Payment Intent: Contains payment ID, amount, currency, status

Customer Data: Card information (tokenized)

Transaction Data: Payment history, refund capability

3.1.3.2 Cloudinary Data

Cloudinary provides image data:

Upload Response: Public ID, URL, format, dimensions

Transformations: Generated URLs with transformation parameters

3.1.3.3 Third-Party APIs

Email Delivery: Nodemailer sends transactional emails

Real-time Data: Socket.io emits events for notifications


================================================================
3.2 DATA PREPROCESSING
================================================================

3. DATA PREPROCESSING

Data preprocessing ensures data quality and proper formatting before storage and use.

3.2.1 Input Validation

3.2.1.1 User Input Validation

User registration inputs are validated:

Email: Valid email format required
Password: Minimum 8 characters
Name: Minimum 2 characters
Role: Must be buyer, vendor, or admin

Validation Implementation:
email: validator.isEmail(options)
password: validation.isLength({ min: 8 })
name: validation.isLength({ min: 2 })

3.2.1.2 Product Input Validation

Product creation requires:

Name: Required, 3-100 characters
Description: Required, 10-5000 characters
Price: Required, positive number
Category: Required, valid category
Stock: Required, non-negative integer
Images: 1-5 images required

3.2.1.3 Order Input Validation

Order creation requires:

Items: Non-empty array
Shipping Address: Complete address
Payment: Valid payment intent

3.2.2 Data Transformation

3.2.2.1 Password Hashing

Passwords are transformed before storage:

Plain Text: User enters password
Salt Generation: bcrypt.genSalt()
Hash Creation: bcrypt.hash(password, salt)
Storage: Hashed password stored

Verification Process:
Input Password + Stored Salt -> Compare Hash

3.2.2.2 Token Generation

JWT tokens are generated with claims:

Access Token Claims:
{
  "userId": "user_id",
  "role": "buyer/vendor/admin",
  "type": "access",
  "exp": "expiration_time"
}

Refresh Token Claims:
{
  "userId": "user_id",
  "type": "refresh",
  "exp": "expiration_time"
}

3.2.2.3 Image Processing

Images are processed before storage:

Upload: File sent to Cloudinary API
Transformation: Resize to standard dimensions
Optimization: Convert to WebP format
CDN URL: Generated public URL stored

3.2.3 Data Sanitization

3.2.3.1 XSS Prevention

User inputs are sanitized to prevent cross-site scripting:

Escape HTML: Convert < > to &lt; &gt;
Remove Scripts: Strip <script> tags
Validate URLs: Verify image URLs

3.2.3.2 SQL Injection Prevention

MongoDB query injection is prevented:

Parameterized Queries: Use Mongoose parameterization
Input Validation: Reject unexpected input types
Operator Blocking: Block $where, $eval operators

3.2.3.3 Input Length Limits

Input lengths are limited:

Name: 100 characters maximum
Description: 5000 characters maximum
Email: 255 characters maximum
Password: 128 characters maximum

3.2.4 Data Normalization

3.2.4.1 Email Normalization

Emails are normalized:

Lowercase: Convert to lowercase
Trim: Remove leading/trailing whitespace

3.2.4.2 Category Normalization

Categories are normalized:

Lowercase: Convert to lowercase
Hyphenate: Replace spaces with hyphens

3.2.4.3 Currency Normalization

Amounts are normalized to cents:

Input: 100.00 USD
Calculation: 100.00 * 100 = 10000 cents
Storage: 10000

Display: 10000 / 100 = $100.00


================================================================
3.3 FEATURE ENGINEERING
================================================================

3. FEATURE ENGINEERING

Feature engineering involves creating derived data that enhances system functionality and user experience.

3.3.1 Commission Calculation

3.3.1.1 Platform Commission

5% commission is calculated on vendor sales:

Order Total: $100.00
Commission: 100.00 * 0.05 = $5.00
Vendor Earnings: 100.00 - 5.00 = $95.00

3.3.1.2 Commission Tracking

Commission is tracked per order:

{
  orderId: "order_id",
  vendorId: "vendor_id",
  orderAmount: 100.00,
  commissionAmount: 5.00,
  vendorEarnings: 95.00,
  status: "calculated"
}

3.3.2 Rating Aggregation

3.3.2.1 Average Rating

Average product rating is calculated:

Reviews: [5, 4, 5, 3, 4] = 21 total
Number of Reviews: 5
Average Rating: 21 / 5 = 4.2

3.3.2.2 Rating Storage

Aggregated ratings are stored with products:

{
  productId: "product_id",
  averageRating: 4.2,
  reviewCount: 5
}

3.3.3 Search Features

3.3.3.1 Full-Text Search

Products are searchable by name and description:

Index Creation: db.products.createIndex({ name: "text", description: "text" })

Search Query: db.products.find({ $text: { $search: "handmade" } })

3.3.3.2 Filtering

Products support filtering:

By Category: { category: "pottery" }
By Price Range: { price: { $gte: 10, $lte: 100 } }
By Vendor: { vendor: vendorId }
By Rating: { averageRating: { $gte: 4 } }

3.3.4 Cart Calculations

3.3.4.1 Cart Total

Cart totals are calculated:

Items: [
  { price: 25.00, quantity: 2 },
  { price: 50.00, quantity: 1 }
]

Subtotal: (25.00 * 2) + (50.00 * 1) = 100.00
Tax: 100.00 * 0.08 = 8.00
Total: 100.00 + 8.00 = 108.00

3.3.4.2 Save for Later

Items moved to save for later:

Original Cart:
{
  items: [{ product: "p1", quantity: 1, savedForLater: false }]
}

After Save:
{
  items: [{ product: "p1", quantity: 1, savedForLater: true }]
}

3.3.5 Order Status Tracking

3.3.5.1 Status Progression

Order status progresses:

Pending -> Shipped -> Delivered

3.3.5.2 Status Updates

Status updates include timestamps:

{
  status: "shipped",
  shippedAt: "2026-01-15T10:00:00Z",
  deliveredAt: null
}

Status Change:
{
  status: "delivered",
  shippedAt: "2026-01-15T10:00:00Z",
  deliveredAt: "2026-01-17T14:00:00Z"
}


================================================================
3.4 EXPLORATORY DATA ANALYSIS
================================================================

3. EXPLORATORY DATA ANALYSIS

Exploratory data analysis examines existing data patterns to inform system design and validate requirements.

3.4.1 E-Commerce Platform Analysis

3.4.1.1 Feature Comparison

Existing e-commerce platforms were analyzed:

Platform          Multi-Vendor    Commission    Features    Complexity
Shopify          Yes           0-2%         High       Medium
Etsy             Yes           6.5%         Medium     Low
Amazon           Yes           15%          High       High
WooCommerce       No           0            Medium    High

Artisan's Corner:

Multi-Vendor: Yes
Commission: 5%
Features: Full e-commerce
Complexity: Medium

3.4.1.2 User Flow Analysis

Common e-commerce user flows:

Product Discovery: Homepage -> Category -> Product Listing -> Product Detail
Cart to Purchase: Product Detail -> Add to Cart -> Cart -> Checkout -> Order Confirmation
Vendor Management: Dashboard -> Products -> Add/Edit Product -> Save

3.4.2 Technology Analysis

3.4.2.1 MERN Stack Analysis

The MERN stack (MongoDB, Express, React, Node) is widely used for e-commerce:

Strengths:
- Single language (JavaScript) throughout
- Large ecosystem of packages
- Active community support
- Scalable architecture
- Cost-effective development

Limitations:
- Learning curve for React
- State management complexity
- Query performance tuning needed

3.4.2.2 Alternative Technologies

Alternative stacks were considered:

LAMP (Linux, Apache, MySQL, PHP): Traditional, mature
Django (Python): Rapid development, built-in admin
Ruby on Rails: Convention over configuration

Decision: MERN stack chosen for:
- JavaScript consistency
- Component architecture
- Industry demand
- Developer familiarity

3.4.3 User Experience Analysis

3.4.3.1 Navigation Patterns

Expected user navigation patterns:

Buyer Journey:
1. Homepage
2. Browse/Search Products
3. View Product Details
4. Add to Cart
5. View Cart
6. Checkout
7. Payment
8. Order Confirmation
9. Order Tracking

Vendor Journey:
1. Login
2. Vendor Dashboard
3. Products
4. Create/Edit Product
5. View Orders
6. Update Order Status
7. View Analytics

3.4.3.2 Interface Expectations

Based on user research:

Modern e-commerce sites require:
- Clean, modern design
- Clear product images
- Easy navigation
- Fast page loads
- Mobile responsiveness
- Trust indicators

Artisan's Corner Interface:

- Tailwind CSS styling
- Image-focused product cards
- Sticky navigation
- Fast Vite development server
- Responsive breakpoints
- Verified vendor badges

3.4.4 Security Analysis

3.4.4.1 Authentication Security

Security measures analyzed:

Password Storage: bcrypt hashing (adaptive cost)
Token Security: JWT with short expiration
Session Management: Refresh token rotation

3.4.4.2 Payment Security

Stripe handles payment security:

PCI Compliance: Stripe manages card data
Tokenization: Card data tokenized client-side
Webhooks: Server-side verification

3.4.4.3 Data Security

Data protection measures:

Input Validation: Server-side validation
Sanitization: XSS prevention
Rate Limiting: API abuse prevention
CORS: Origin restrictions
Helmet: Security headers

3.4.5 Performance Analysis

3.4.5.1 Expected Load

Estimated system load:

Simultaneous Users: 50-100
API Requests per Minute: 500-1000
Image Storage: 1GB
Database Size: 100MB

3.4.5.2 Performance Optimizations

Implemented optimizations:

Frontend:
- Vite HMR for fast development
- Tailwind CSS (minimal bundle)
- Image lazy loading
- Component code splitting

Backend:
- MongoDB indexing
- JWT verification (stateless)
- Express routing
- Error handling middleware


================================================================
CHAPTER 4: SYSTEM REQUIREMENTS AND ANALYSIS
================================================================

CHAPTER 4: SYSTEM REQUIREMENTS AND ANALYSIS

This chapter specifies the system requirements in detail, including functional and non-functional requirements, hardware and software specifications, and system analysis.

4. SYSTEM REQUIREMENTS AND ANALYSIS

4.1 SYSTEM REQUIREMENTS SPECIFICATION

System requirements define what the system must do, forming the foundation for design and implementation.

4.1.1 FUNCTIONAL REQUIREMENTS

Functional requirements specify the system's behaviors and features.

4.1.1.1 User Authentication Requirements

FR-001: User Registration
Description: Users must be able to register as Buyers with email and password
Priority: High
Inputs: Name, Email, Password
Outputs: User account created, Confirmation email sent

FR-002: User Login
Description: Users must be able to log in with email and password
Priority: High
Inputs: Email, Password
Outputs: JWT access token, JWT refresh token

FR-003: Email Verification
Description: Users must verify email address through sent link
Priority: Medium
Inputs: Verification token
Outputs: User account verified

FR-004: Password Reset
Description: Users must be able to reset forgotten passwords
Priority: High
Inputs: Email address
Outputs: Password reset email sent

FR-005: Role-Based Access
Description: System must restrict access based on user role
Priority: High
Inputs: User role
Outputs: Appropriate access levels

4.1.1.2 Vendor Store Requirements

FR-006: Vendor Application
Description: Users must be able to apply to become vendors
Priority: High
Inputs: Store name, Description, Logo
Outputs: Vendor application submitted

FR-007: Store Creation
Description: Approved vendors must be able to create stores
Priority: High
Inputs: Store details
Outputs: Store created

FR-008: Store Management
Description: Vendors must be able to manage store profiles
Priority: High
Inputs: Updated store details
Outputs: Store updated

4.1.1.3 Product Management Requirements

FR-009: Product Creation
Description: Vendors must be able to create product listings
Priority: High
Inputs: Product details, Images
Outputs: Product created

FR-010: Product Listing
Description: Products must be viewable to all users
Priority: High
Inputs: None
Outputs: Product listing page

FR-011: Product Update
Description: Vendors must be able to update their products
Priority: High
Inputs: Updated product details
Outputs: Product updated

FR-012: Product Deletion
Description: Vendors must be able to delete products
Priority: Medium
Inputs: Product ID
Outputs: Product deleted (soft delete)

FR-013: Product Search
Description: Users must be able to search products
Priority: High
Inputs: Search query
Outputs: Search results

FR-014: Product Filtering
Description: Users must be able to filter products
Priority: Medium
Inputs: Filter criteria
Outputs: Filtered results

4.1.1.4 Shopping Cart Requirements

FR-015: Add to Cart
Description: Users must be able to add products to cart
Priority: High
Inputs: Product ID, Quantity
Outputs: Item added to cart

FR-016: Update Cart Quantity
Description: Users must be able to modify cart quantities
Priority: High
Inputs: Cart item ID, New quantity
Outputs: Quantity updated

FR-017: Remove from Cart
Description: Users must be able to remove cart items
Priority: High
Inputs: Cart item ID
Outputs: Item removed

FR-018: Save for Later
Description: Users must be able to save items for later
Priority: Medium
Inputs: Cart item ID
Outputs: Item moved to saved list

FR-019: Cart Persistence
Description: Cart must persist across sessions
Priority: High
Outputs: Saved cart data

4.1.1.5 Wishlist Requirements

FR-020: Add to Wishlist
Description: Users must be able to save products to wishlist
Priority: Medium
Inputs: Product ID
Outputs: Product added to wishlist

FR-021: Remove from Wishlist
Description: Users must be able to remove wishlist items
Priority: Medium
Inputs: Wishlist item ID
Outputs: Item removed

FR-022: Move to Cart
Description: Users must be able to move wishlist items to cart
Priority: Medium
Inputs: Wishlist item ID
Outputs: Item moved to cart

4.1.1.6 Checkout Requirements

FR-023: Checkout Process
Description: Users must be able to complete purchases
Priority: High
Inputs: Shipping address, Payment method
Outputs: Order created

FR-024: Payment Processing
Description: System must process payments through Stripe
Priority: High
Inputs: Payment details
Outputs: Payment confirmed

FR-025: Order Confirmation
Description: Users must receive order confirmation
Priority: High
Outputs: Confirmation email

4.1.1.7 Order Management Requirements

FR-026: Order Status Update
Description: Vendors must be able to update order status
Priority: High
Inputs: Order ID, New status
Outputs: Order status updated

FR-027: Order History
Description: Users must be able to view order history
Priority: High
Outputs: Order history page

4.1.1.8 Review Requirements

FR-028: Leave Review
Description: Buyers must be able to review purchased products
Priority: Medium
Inputs: Rating, Comment
Outputs: Review created

FR-029: View Reviews
Description: Users must be able to view product reviews
Priority: Medium
Outputs: Reviews displayed

FR-030: Vendor Response
Description: Vendors must be able to respond to reviews
Priority: Low
Inputs: Response text
Outputs: Response added

4.1.1.9 Dashboard Requirements

FR-031: Vendor Dashboard
Description: Vendors must have sales analytics dashboard
Priority: High
Outputs: Dashboard with charts and metrics

FR-032: Admin Panel
Description: Admins must have platform management panel
Priority: High
Outputs: Admin dashboard

4.1.2 NON-FUNCTIONAL REQUIREMENTS

Non-functional requirements specify system qualities beyond specific behaviors.

4.1.2.1 Performance Requirements

NFR-001: Response Time
Description: API requests must complete within 500ms
Priority: High
Target: < 500ms average

NFR-002: Page Load Time
Description: Pages must load within 3 seconds
Priority: High
Target: < 3 seconds

NFR-003: Concurrent Users
Description: System must support 50+ concurrent users
Priority: Medium
Target: 50+ users

NFR-004: File Upload Time
Description: Image uploads must complete within 10 seconds
Priority: Medium
Target: < 10 seconds

4.1.2.2 Security Requirements

NFR-005: Password Security
Description: Passwords must be hashed with bcrypt
Priority: High
Standard: Minimum 10 salt rounds

NFR-006: Authentication Tokens
Description: JWT tokens must expire appropriately
Priority: High
Standard: 15 min access, 7 day refresh

NFR-007: Input Validation
Description: All inputs must be validated server-side
Priority: High
Standard: Reject invalid input

NFR-008: HTTPS
Description: Production must use HTTPS
Priority: High
Standard: TLS 1.2+

4.1.2.3 Usability Requirements

NFR-009: Responsive Design
Description: System must work on mobile devices
Priority: High
Standard: iOS Safari, Android Chrome

NFR-010: Browser Support
Description: System must support modern browsers
Priority: High
Standard: Chrome, Firefox, Safari, Edge

NFR-011: Accessibility
Description: System must follow basic accessibility practices
Priority: Medium
Standard: Alt text, keyboard navigation

4.1.2.4 Reliability Requirements

NFR-012: Uptime
Description: System must maintain 99% uptime
Priority: High
Target: 99%

NFR-013: Error Handling
Description: System must handle errors gracefully
Priority: High
Standard: User-friendly messages

NFR-014: Data Backup
Description: Database must be backed up regularly
Priority: High
Standard: Daily backups


================================================================
4.2 HARDWARE AND SOFTWARE REQUIREMENTS
================================================================

4. HARDWARE AND SOFTWARE REQUIREMENTS

This section specifies the hardware and software required to run the Artisan's Corner application.

4.2.1 HARDWARE REQUIREMENTS

4.2.1.1 Development System Requirements

The following hardware is required for development:

Processor: Intel Core i5 or equivalent (minimum)
RAM: 8 GB (recommended), 4 GB (minimum)
Storage: 20 GB free disk space
Display: 1280x720 resolution minimum
Network: Internet connection for API calls

4.2.1.2 Server Requirements (Production)

Production server specifications:

Compute: 2 vCPU, 4 GB RAM (minimum)
Storage: 20 GB SSD
Bandwidth: 1 TB transfer monthly
Operating System: Ubuntu 22.04 LTS or equivalent

4.2.1.3 Database Requirements

MongoDB Atlas Free Tier:

Storage: 512 MB
RAM: Shared
Connections: Shared
Backup: Daily automated

4.2.2 SOFTWARE REQUIREMENTS

4.2.2.1 Development Software

Required software for development:

Node.js: Version 18 or higher
npm: Latest version (comes with Node.js)
Git: Version 2.x or higher
Code Editor: Visual Studio Code (recommended)

4.2.2.2 Frontend Dependencies

package.json dependencies:

react: ^18.2.0
react-dom: ^18.2.0
react-router-dom: ^6.x
@reduxjs/toolkit: ^2.x
react-redux: ^9.x
axios: ^1.x
chart.js: ^4.x
react-chartjs-2: ^5.x
tailwindcss: ^3.x
vite: ^5.x

4.2.2.3 Backend Dependencies

package.json dependencies:

express: ^4.x
mongoose: ^7.x
jsonwebtoken: ^9.x
bcryptjs: ^4.x
cors: ^2.x
helmet: ^7.x
dotenv: ^16.x
express-validator: ^7.x
stripe: ^14.x
cloudinary: ^1.x
nodemailer: ^6.x
socket.io: ^4.x

4.2.2.4 Third-Party Services

Required external services:

MongoDB Atlas: Database hosting
Stripe: Payment processing
Cloudinary: Image storage
Gmail: Email sending (SMTP)

4.2.2.5 Browser Requirements

Supported browsers:

Google Chrome: Latest version
Mozilla Firefox: Latest version
Apple Safari: Latest version
Microsoft Edge: Latest version

4.2.3 ENVIRONMENT CONFIGURATION

4.2.3.1 Development Environment Variables

Frontend (.env):
VITE_API_URL=http://localhost:5000/api

Backend (.env):
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

4.2.3.2 API Endpoints

Base URL: http://localhost:5000/api

Authentication:
POST /auth/register
POST /auth/login
GET /auth/me
POST /auth/forgot-password
POST /auth/reset-password/:token

Products:
GET /products
GET /products/:id
POST /products
PUT /products/:id
DELETE /products/:id

Stores:
GET /stores
GET /stores/:id
POST /stores
PUT /stores/:id

Orders:
GET /orders/my
GET /orders/vendor
POST /orders
PUT /orders/:id/status

Cart:
GET /cart
POST /cart
PUT /cart/:itemId
DELETE /cart/:itemId

Reviews:
GET /reviews/product/:productId
POST /reviews


================================================================
4.3 SYSTEM OVERVIEW
================================================================

4. SYSTEM OVERVIEW

The system overview provides a high-level description of the Artisan's Corner application and its operation.

4.3.1 SYSTEM DESCRIPTION

Artisan's Corner is a multi-vendor e-commerce platform designed specifically for handmade goods. The system enables multiple artisans to operate independent stores within a unified marketplace, connecting craft makers with customers seeking unique handcrafted products.

4.3.2 USER ROLES

4.3.2.1 Buyer

Buyers are customers who browse and purchase products:

Capabilities:
- Browse products and stores
- Add products to cart or wishlist
- Complete purchases
- View order history
- Leave reviews

Access Level: Public + authenticated features

4.3.2.2 Vendor

Vendors are sellers offering handmade products:

Capabilities:
- Create and manage store
- List and manage products
- Process orders
- View analytics
- Respond to reviews

Access Level: Requires vendor approval

4.3.2.3 Administrator

Administrators manage the platform:

Capabilities:
- Approve vendor applications
- Moderate content
- Manage users
- View platform statistics
- Monitor revenue

Access Level: Full platform access

4.3.3 SYSTEM OPERATION

4.3.3.1 Buyer Flow

Product Discovery:
1. Browse homepage
2. Search products
3. Filter by category
4. View product details

Purchase Process:
1. Add to cart
2. View cart
3. Proceed to checkout
4. Enter shipping address
5. Enter payment information
6. Confirm purchase
7. Receive confirmation

Post-Purchase:
1. View order status
2. Receive updates
3. Leave review

4.3.3.2 Vendor Flow

Store Setup:
1. Apply to become vendor
2. Wait for approval
3. Create store profile
4. Add products

Order Processing:
1. Receive new order notification
2. Prepare order
3. Mark as shipped
4. Confirm delivery

Management:
1. View dashboard
2. Monitor sales
3. Update inventory
4. Manage orders

4.3.3.3 Administrator Flow

Platform Management:
1. Review vendor applications
2. Approve/reject vendors
3. Moderate content
4. Monitor statistics

4.3.4 SYSTEM CHARACTERISTICS

Key characteristics of Artisan's Corner:

Multi-Vendor: Multiple sellers operate in one platform

Role-Based: Different interfaces for different roles

Responsive: Works on desktop and mobile

Secure: JWT auth, password hashing, input validation

Real-Time: Socket.io notifications

Integrated: Stripe payments, Cloudinary images


================================================================
4.4 SYSTEM ANALYSIS
================================================================

4. SYSTEM ANALYSIS

System analysis examines the system requirements in detail to ensure proper implementation.

4.4.1 FEASIBILITY ANALYSIS

4.4.1.1 Technical Feasibility

The technical feasibility is high:

Technical Resources: Sufficient expertise in team
Technology Stack: Proven MERN stack
Integration: Standard APIs available
Support: Large community resources

4.4.1.2 Economic Feasibility

The economic feasibility is high:

Development Cost: Low (open-source tools)
Hosting Cost: Free tiers available
Maintenance: Reasonable effort
ROI: Sustainable commission model

4.4.1.3 Operational Feasibility

The operational feasibility is high:

User Adoption: Familiar e-commerce patterns
Training Needs: Minimal
Support Requirements: Standard

4.4.2 REQUIREMENTS ANALYSIS

4.4.2.1 Requirements Validation

All requirements have been analyzed for:

Completeness: All features covered
Consistency: No conflicting requirements
Clarity: Requirements are clear
Feasibility: All can be implemented

4.4.2.2 Requirements Prioritization

Requirements prioritized:

Critical: Authentication, Products, Cart, Checkout
Important: Reviews, Dashboards, Search
Nice-to-have: Advanced filters, Chat

4.4.3 RISK ANALYSIS

4.4.3.1 Identified Risks

Risks and mitigation:

Payment Failure: Stripe provides reliable processing
Image Upload Issues: Cloudinary handles errors
Database Connection: Atlas offers reliability
Security Breaches: Multiple security layers

4.4.3.2 Risk Mitigation

Mitigation strategies:

Error Handling: Comprehensive try-catch blocks
Input Validation: Server-side validation
Rate Limiting: Prevent abuse
Backups: Regular database backups


================================================================
CHAPTER 5: IMPLEMENTATION
================================================================

CHAPTER 5: IMPLEMENTATION

This chapter details the system design, algorithms, workflow diagrams, module descriptions, and implementation approach.

5. IMPLEMENTATION

5.1 SYSTEM DESIGN/ALGORITHMS

5.1.1 SYSTEM ARCHITECTURE

5.1.1.1 Layered Architecture

The system follows a multi-layered architecture:

Presentation Layer (Frontend):
- React.js components
- Redux state management
- Tailwind CSS styling
- React Router navigation

Application Layer (API):
- Express.js routes
- Controller logic
- Middleware functions
- Validation

Data Layer (Database):
- MongoDB collections
- Mongoose models
- Index definitions
- Aggregation pipelines

Integration Layer (External Services):
- Stripe payment processing
- Cloudinary image storage
- Nodemailer email
- Socket.io real-time

5.1.1.2 System Flow

System operation flow:

Client Request
    |
    V
React App (HTTP)
    |
    V
Express Server (API)
    |
    +--Authentication Middleware
    |
    +--Controller Logic
    |
    +--Database (MongoDB)
    |
    V
Response (JSON)

5.1.2 ALGORITHM DESIGN

5.1.2.1 Authentication Algorithm

User authentication flow:

1. User submits credentials
2. Validate input data
3. Find user in database
4. Compare password hashes
5. Generate JWT tokens
6. Return tokens to client

5.1.2.2 Payment Algorithm

Payment processing flow:

1. Calculate order total
2. Create Stripe PaymentIntent
3. Return client secret
4. Client confirms payment
5. Stripe webhook receives confirmation
6. Create order in database
7. Clear cart
8. Send confirmation email

5.1.2.3 Commission Algorithm

Commission calculation:

1. Get order items
2. Calculate subtotal per vendor
3. Apply 5% commission rate
4. Calculate vendor earnings
5. Store commission data
6. Update vendor earnings total

Commission Formula:
Commission = Order Total × 0.05
Vendor Earnings = Order Total - Commission

5.1.2.4 Search Algorithm

Product search implementation:

1. Receive search query
2. Sanitize query string
3. Split into terms
4. Search name using regex
5. Search description using regex
6. Score and sort results
7. Return paginated results

5.1.3 DATABASE DESIGN

5.1.3.1 Schema Design

Database schema follows document model:

Users Schema:
{
  _id: ObjectId,
  name: String (required),
  email: String (unique, required),
  password: String (required),
  role: String (enum, default: buyer),
  avatar: String,
  isEmailVerified: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}

Products Schema:
{
  _id: ObjectId,
  vendor: ObjectId (ref: Users),
  store: ObjectId (ref: Stores),
  name: String (required),
  slug: String,
  description: String (required),
  price: Number (required),
  category: String (required),
  images: [String],
  stock: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}

5.1.3.2 Index Design

Indexes for query optimization:

Users: { email: 1 } (unique)
Products: { vendor: 1 }, { category: 1 }, { isActive: 1 }
Orders: { buyer: 1 }, { status: 1 }
Reviews: { product: 1 }

5.1.3.3 Relationship Design

Database relationships:

User -> Store (One-to-One via userId)
User -> Orders (One-to-Many)
Store -> Products (One-to-Many)
Product -> Reviews (One-to-Many)


================================================================
5.2 WORKFLOW/PROCESS DIAGRAMS
================================================================

5. WORKFLOW/PROCESS DIAGRAMS

5.2.1 USER REGISTRATION WORKFLOW

User registration process:

1. User visits registration page
2. Fills registration form
3. Submits form
4. Server validates input
5. Hashes password
6. Creates user document
7. Generates verification token
8. Sends verification email
9. Returns success response
10. User verifies email
11. Account activated

5.2.2 PRODUCT PURCHASE WORKFLOW

Purchase process:

1. Browse products
2. Add to cart
3. View cart
4. Proceed to checkout
5. Enter shipping address
6. Select payment method
7. Enter card details
8. Click "Place Order"
9. Create payment intent
10. Confirm payment
11. Webhook receives confirmation
12. Create order
13. Clear cart
14. Send confirmation email
15. Redirect to success page

5.2.3 VENDOR ORDER PROCESSING

Vendor order handling:

1. Vendor receives notification
2. View pending orders
3. Prepare items for shipment
4. Pack and ship items
5. Update order status (Shipped)
6. Mark asDelivered when received

5.2.4 ADMIN VENDOR APPROVAL

Vendor approval process:

1. User applies to become vendor
2. Admin receives notification
3. View vendor application
4. Verify information
5. Approve or reject
6. Vendor notified of decision
7. If approved, enable selling

5.2.5 DATA FLOW DIAGRAM

System data flow:

[User] --Register/Login--> [Authentication Service]
[User] --Browse--> [Product Service]
[User] --Add to Cart--> [Cart Service]
[User] --Checkout--> [Payment Service]
[Payment Service] --Confirm--> [Order Service]
[Order Service] --Notify--> [Vendor]
[User] --View Orders--> [Order Service]

5.2.6 USE CASE DIAGRAM

Primary use cases:

User:
- Register
- Login
- Browse Products
- Search Products
- Add to Cart
- Place Order
- View Orders
- Leave Review

Vendor:
- Create Store
- Add Product
- Manage Orders
- View Analytics

Administrator:
- Approve Vendors
- Moderate Content
- View Statistics
- Manage Users


================================================================
5.3 MODULE DESCRIPTION
================================================================

5. MODULE DESCRIPTION

This section describes the major modules of the Artisan's Corner system.

5.3.1 AUTHENTICATION MODULE

5.3.1.1 Module Overview

The authentication module handles all user security functions:

Registration:
- Validate input data
- Check existing user
- Hash password (bcrypt)
- Create user document
- Send verification email

Login:
- Validate credentials
- Find user
- Compare password
- Generate tokens
- Return user data

Password Reset:
- Generate reset token
- Send email
- Verify token
- Update password

5.3.1.2 Key Functions

registerUser(userData)
loginUser(email, password)
verifyToken(token)
resetPassword(token, newPassword)

5.3.2 STORE MODULE

5.3.2.1 Module Overview

The store module manages vendor stores:

Create Store:
- Validate vendor role
- Check existing store
- Create store document
- Return store data

Update Store:
- Verify ownership
- Update fields
- Return updated store

5.3.2.2 Key Functions

createStore(vendorId, storeData)
updateStore(storeId, vendorId, data)
getStoreByVendor(vendorId)

5.3.3 PRODUCT MODULE

5.3.3.1 Module Overview

The product module handles product listings:

Create Product:
- Validate vendor
- Upload images
- Create document
- Return product

Update Product:
- Verify ownership
- Update fields
- Handle image updates

Delete Product:
- Soft delete (isActive: false)

Search Products:
- Full-text search
- Apply filters
- Return paginated results

5.3.3.2 Key Functions

createProduct(vendorId, productData)
updateProduct(productId, vendorId, data)
deleteProduct(productId, vendorId)
searchProducts(query, filters)
getProductsByVendor(vendorId)

5.3.4 CART MODULE

5.3.4.1 Module Overview

The cart module manages shopping carts:

Add Item:
- Check stock
- Check existing item
- Add/update item

Update Quantity:
- Validate quantity
- Update item

Remove Item:
- Remove from cart

Save for Later:
- Toggle save status

5.3.4.2 Key Functions

addToCart(userId, productId, quantity)
updateCartItem(itemId, userId, quantity)
removeFromCart(itemId, userId)
getCart(userId)

5.3.5 ORDER MODULE

5.3.5.1 Module Overview

The order module handles purchases:

Create Order:
- Validate cart
- Process payment
- Create order document
- Calculate commission

Update Status:
- Verify ownership
- Update status
- Notify user

5.3.5.2 Key Functions

createOrder(userId, paymentIntentId, address)
updateOrderStatus(orderId, vendorId, status)
getOrdersByBuyer(userId)
getOrdersByVendor(vendorId)

5.3.6 REVIEW MODULE

5.3.6.1 Module Overview

The review module handles product reviews:

Create Review:
- Verify purchase
- Check existing review
- Create review
- Update product rating

Get Reviews:
- Get product reviews
- Calculate average

5.3.6.2 Key Functions

createReview(userId, productId, rating, comment)
getProductReviews(productId)

5.3.7 DASHBOARD MODULE

5.3.7.1 Module Overview

The dashboard module provides analytics:

Vendor Dashboard:
- Sales over time
- Top products
- Recent orders
- Earnings summary

Admin Dashboard:
- Total users
- Total vendors
- Platform revenue
- Recent signups

5.3.7.2 Key Functions

getVendorAnalytics(vendorId)
getAdminAnalytics()

5.3.8 NOTIFICATION MODULE

5.3.8.1 Module Overview

The notification module handles real-time alerts:

Socket.io Events:
- connect: User connects
- new_order: Order placed
- order_status: Status changes
- notification: General alerts

5.3.8.2 Key Functions

emitNotification(userId, event, data)
sendOrderNotification(vendorId, orderId)


================================================================
5.4 CODING STANDARDS
================================================================

5. CODING STANDARDS

5.4.1 CODE ORGANIZATION

5.4.1.1 Project Structure

artisans-corner/
├── client/                 # React frontend
│   ├── src/
│   │   ├── app/          # Redux store
│   │   ├── components/   # Reusable components
│   │   ├── pages/       # Route pages
│   │   ├── features/    # Redux slices
│   │   ├── services/    # API services
│   │   └── utils/       # Helpers
│   └── ...
│
└── server/                # Node.js backend
    ├── controllers/      # Route handlers
    ├── models/          # Mongoose schemas
    ├── routes/          # Express routes
    ├── middleware/      # Auth, validation
    └── utils/          # Helpers

5.4.2 NAMING CONVENTIONS

Files:
- components: PascalCase (Navbar.jsx)
- routes: kebab-case (productRoutes.js)
- models: PascalCase (Product.js)
- controllers: PascalCase (productController.js)

Variables:
- camelCase: userName, productList
- camelCase: isActive, hasPermission

Constants:
- UPPER_SNAKE_CASE: MAX_UPLOAD_SIZE

5.4.3 COMMENT STANDARDS

File Headers:
/**
 * Product Controller
 * Handles product-related operations
 */

Function Comments:
/**
 * Get all products
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */

5.4.4 ERROR HANDLING

Standard error format:
{
  success: false,
  message: "Error description",
  error: process.env.NODE_ENV === "development" ? error : undefined
}

5.4.5 SECURITY STANDARDS

Password Requirements:
- Minimum 8 characters
- Hash with bcrypt (10 rounds)

Input Validation:
- Server-side only
- Reject invalid data
- Sanitize inputs

API Security:
- JWT for authentication
- Rate limiting
- CORS configuration


================================================================
5.5 TESTING AND VALIDATION
================================================================

5. TESTING AND VALIDATION

This section summarizes testing approaches used in the project.

5.5.1 TESTING TYPES

5.5.1.1 Unit Testing

Individual functions tested:

Authentication: Registration, login, token generation
Products: CRUD operations
Cart: Add, update, remove
Orders: Create, status update

5.5.1.2 Integration Testing

Multiple components tested:

API Endpoints: All routes tested with Postman
Database: CRUD operations verified
Authentication: Full flow verification

5.5.1.3 Black Box Testing

Features tested:

User Registration: Valid/invalid inputs
Product Search: Various queries
Cart Operations: All flows
Checkout: Complete process

5.5.1.4 User Interface Testing

Manual testing:

Responsive Design: All screen sizes
Form Validation: Messages display
Loading States: Spinners appear
Error Handling: Error messages show

5.5.2 TEST CASE SUMMARY

Feature              Test Cases    Status
User Authentication   15          Passed
Product Management  20          Passed
Cart Operations    15          Passed
Checkout Flow    10          Passed
Order Management  12          Passed
Reviews          8          Passed
Vendor Dashboard  10          Passed
Admin Panel      15          Passed

Total: 105 test cases executed

5.5.3 TESTING TOOLS

Tools used:

Jest: Unit testing
Postman: API testing
MongoDB Compass: Database verification
Browser DevTools: Frontend debugging
Stripe Dashboard: Payment testing


================================================================
CHAPTER 6: FUTURE SCOPE AND CONCLUSION
================================================================

CHAPTER 6: FUTURE SCOPE AND CONCLUSION

This chapter addresses future enhancements, limitations, and concluding remarks.

6. FUTURE SCOPE AND CONCLUSION

6.1 FUTURE SCOPE

6.1.1 ENHANCEMENT OPPORTUNITIES

6.1.1.1 Mobile Application

Future development could include:

React Native mobile app development for iOS and Android
Push notifications
Offline functionality
Camera integration for product photos

6.1.1.2 Advanced Features

AI-Based Recommendations:
Product suggestions based on browsing history
Similar product matching
Personalized home page

Live Chat:
Real-time messaging between buyers and vendors
Chat history
File sharing

Social Integration:
Social media login (Google, Facebook)
Product sharing
Social reviews

6.1.1.3 Business Features

Vendor Subscriptions:
Basic: 10% commission
Professional: 8% commission
Enterprise: 5% commission

Multi-Currency:
USD, EUR, GBP support
Currency conversion
Localized pricing

International Shipping:
Shipping calculator integration
Tracking integration
Multi-country fulfillment

6.1.2 EXTENSION ROADMAP

Short-term (Q3-Q4 2026):
- Mobile app development
- AI recommendations
- Social login

Medium-term (2027):
- Multi-currency
- International shipping
- Vendor subscriptions

Long-term (2028+):
- AI-powered search
- AR product viewing
- International expansion


================================================================
6.2 LIMITATIONS
================================================================

6. LIMITATIONS

The current system has the following limitations:

6.2.1 TECHNICAL LIMITATIONS

6.2.1.1 Payment Processing

Only Stripe test mode is supported.
Production payments require Stripe verification.
No refund processing through API.

6.2.1.2 Image Handling

Maximum 5 images per product.
Image storage dependent on Cloudinary.
No image editing within platform.

6.2.1.3 Scalability

Single server deployment.
No load balancing.
Limited caching implementation.

6.2.2 FUNCTIONAL LIMITATIONS

6.2.2.1 Features Not Included

No mobile application.
No multi-currency.
No international shipping.
No live chat.
No AI recommendations.

6.2.2.2 User Experience

Basic search only.
Limited filtering options.
No advanced analytics.

6.2.3 OPERATIONAL LIMITATIONS

6.2.3.1 Support

No live customer support.
No automated helpdesk.
Limited documentation.

6.2.3.2 Maintenance

No automated deployment.
Manual scaling required.
Limited monitoring.


================================================================
6.3 CONCLUSION
================================================================

6. CONCLUSION

6.3.1 PROJECT SUMMARY

This project successfully developed "Artisan's Corner: Multi-Vendor Handmade Goods Marketplace," a comprehensive e-commerce platform connecting artisans with customers. The system demonstrates complete full-stack development capabilities using modern web technologies.

6.3.2 KEY ACHIEVEMENTS

The project achieved:

1. Complete E-commerce Platform
Full online marketplace with all essential features for buying and selling.

2. Multi-Vendor Architecture
Multiple vendors can operate independent stores within one platform.

3. Role-Based Access Control
Three distinct user roles with appropriate permissions and interfaces.

4. Modern Technology Stack
React, Node.js, MongoDB, Stripe implementation.

5. Secure Authentication
JWT-based authentication with password hashing and email verification.

6. Payment Integration
Professional payment processing through Stripe.

7. Real-Time Features
Socket.io notifications for order updates.

8. Responsive Design
Mobile-friendly interface with Tailwind CSS.

9. Vendor Dashboard
Sales analytics and business management tools.

10. Admin Panel
Platform management and moderation tools.

6.3.3 TECHNICAL COMPETENCY

This project demonstrates competency in:

Full-Stack Development
Database Design
API Development
Authentication Implementation
Payment Integration
Project Management

6.3.4 LEARNING OUTCOMES

The development process provided learning in:

System Design Patterns
Security Best Practices
API Development
Database Management
Testing Approaches
Documentation

6.3.5 VALUE PROPOSITION

Artisan's Corner provides value for:

Artisans: Accessible platform for selling handmade goods
Customers: Curated marketplace for unique handcrafted items
Platform: Sustainable commission-based revenue model

6.3.6 CLOSING REMARKS

This project represents a significant learning achievement and demonstrates the ability to develop complex web applications. The skills developed through this project provide a strong foundation for continued growth in software development roles.

The completed system is production-ready for small-scale deployment and provides a solid foundation for future enhancements.


================================================================
CHAPTER 7: BIBLIOGRAPHY
================================================================

CHAPTER 7: BIBLIOGRAPHY

7. BIBLIOGRAPHY

7.1 BOOKS

[1] "Learning React" by Alex Banks and Eve Porcello
    O'Reilly Media, 2020

[2] "Node.js Design Patterns" by Mario Casciaro
    Packt Publishing, 2016

[3] "MongoDB: The Definitive Guide" by Shannon Bradshaw
    O'Reilly Media, 2019

[4] "Full Stack React Projects" by Shama Hoque
    Packt Publishing, 2020

[5] "JavaScript: The Good Parts" by Douglas Crockford
    O'Reilly Media, 2008

7.2 ONLINE RESOURCES

[6] React.js Documentation
    https://react.dev/

[7] Node.js Documentation
    https://nodejs.org/

[8] Express.js Documentation
    https://expressjs.com/

[9] MongoDB Documentation
    https://www.mongodb.com/

[10] Mongoose Documentation
    https://mongoosejs.com/

[11] Stripe Documentation
    https://stripe.com/docs

[12] Cloudinary Documentation
    https://cloudinary.com/

[13] JWT.io Documentation
    https://jwt.io/

[14] Tailwind CSS Documentation
    https://tailwindcss.com/

[15] Redux Toolkit Documentation
    https://redux-toolkit.js.org/

7.3 TUTORIALS

[16] "Build an E-commerce App with React"
    https://www.youtube.com/

[17] "MERN Stack Tutorial"
    https://www.mongodb.com/

[18] "Stripe Payment Integration"
    https://stripe.com/

7.4 REFERENCE WEBSITES

[19] Stack Overflow
    https://stackoverflow.com/

[20] MDN Web Docs
    https://developer.mozilla.org/

[21] GitHub
    https://github.com/


================================================================
APPENDIX A: SAMPLE DATA
================================================================

Sample user accounts for testing:

Email: admin@artisanscorner.com
Password: Admin@123!
Role: Administrator

Email: vendor@example.com
Password: Vendor@123!
Role: Vendor (Approved)

Email: buyer@example.com
Password: Buyer@123!
Role: Buyer

Test Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits


================================================================
APPENDIX B: API ENDPOINTS
================================================================

Complete API Endpoint Reference:

AUTHENTICATION
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/forgot-password
POST   /api/auth/reset-password/:token

PRODUCTS
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

STORES
GET    /api/stores
GET    /api/stores/:id
POST   /api/stores
PUT    /api/stores/:id

ORDERS
GET    /api/orders/my
GET    /api/orders/vendor
POST   /api/orders
PUT    /api/orders/:id/status

CART
GET    /api/cart
POST   /api/cart
PUT    /api/cart/:itemId
DELETE /api/cart/:itemId

REVIEWS
GET    /api/reviews/product/:productId
POST   /api/reviews


================================================================

End of Project Report

================================================================