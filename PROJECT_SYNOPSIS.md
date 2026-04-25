Project Synopsis

for

Artisan's Corner: Multi-Vendor Handmade Goods Marketplace



Mohammed Mayish
23BCAICD214
Bachelor of Computer Applications (BCA)
Yenepoya Institute of Arts, Science, Commerce and Management
Mangalore
April 2025



Under the Guidance of
<Name of Internal Project Guide>
<Designation, Department>
Yenepoya Institute of Arts, Science, Commerce and Management
Mangalore




Submitted to

YENEPOYA INSTITUTE OF ARTS, SCIENCE, COMMERCE AND MANAGEMENT
BALMATTA, MANGALORE
YENEPOYA (DEEMED TO BE UNIVERSITY)


I. Title of the Project

**Artisan's Corner: Multi-Vendor Handmade Goods Marketplace**

The project is a full-featured multi-vendor e-commerce marketplace platform designed specifically for handmade goods, connecting artisans and craft makers directly with customers seeking unique handcrafted products. This web-based application enables multiple vendors to set up their own stores within a unified marketplace, manage their product listings, process orders, and receive payments through integrated payment gateways. The platform serves as a bridge between local artisans and customers, eliminating intermediaries and ensuring fair pricing for handcrafted items. The title "Artisan's Corner" reflects the focus on handmade, artisanal products while "Multi-Vendor Handmade Goods Marketplace" clearly indicates the platform's capability to host multiple seller stores in a single e-commerce environment.


II. Statement of the Problem

**When the candidate undertakes the project work, concentrate more on the problem. The problem has been clearly stated below.**

The traditional handmade goods market faces several critical challenges that this project addresses:

1. **Limited Market Access for Artisans**: Local artisans and craft makers typically sell their products at physical markets, craft fairs, or through intermediaries like gift shops and galleries. These channels limit their customer reach to a local geographic area and reduce profit margins due to intermediary commissions.

2. **Lack of Dedicated Online Platforms**: Existing e-commerce platforms like Amazon, eBay, or Shopify are generic and do not provide specialized features for handmade goods. artisans struggle to compete with mass-produced items and face high fees for individual stores.

3. **Technical Barriers**: Building an individual e-commerce store requires technical knowledge in web development, payment processing, image optimization, and order management. Many talented artisans lack these technical skills.

4. **Payment Processing Challenges**: Individual sellers face difficulties in setting up merchant accounts and payment processing, especially for small-scale operations with limited transaction volumes.

5. **No Built-in Multi-Vendor Support**: Existing platforms either support single-vendor stores or charge excessive fees for multi-vendor functionality, making it impractical for small artisan communities.

This project addresses these problems by creating a specialized multi-vendor marketplace that enables artisans to:
- Create their own stores within minutes
- List products with multiple images
- Manage inventory and orders
- Receive secure payments through Stripe
- Track sales and earnings through dashboards
- Build customer relationships through reviews


III. Why this Particular Topic Chosen

**This section involves the software engineer's thinking ability and the command over problem-solving pedagogy.**

This topic was chosen for the following reasons:

1. **Growing Demand for Handmade Goods**: The handmade goods market has seen significant growth in recent years as consumers increasingly value unique, artisanal products over mass-manufactured items. This trend creates a strong market opportunity for dedicated handmade marketplaces.

2. **Supporting Local Artisans**: Many talented artisans and craft makers in local communities lack the technical resources to establish their own online stores. This project provides an affordable solution by offering a shared platform where multiple vendors can operate within a single marketplace infrastructure.

3. **Comprehensive Learning Opportunity**: This project represents a complete full-stack e-commerce development challenge that demonstrates proficiency in:
   - Frontend development with React.js and Redux Toolkit
   - Backend development with Node.js and Express.js
   - Database design with MongoDB and Mongoose
   - Authentication and security with JWT and bcrypt
   - Payment processing with Stripe integration
   - Image management with Cloudinary CDN
   - Real-time functionality with Socket.io

4. **Technical Challenges**: The multi-vendor architecture presents interesting technical challenges including:
   - Role-based access control (Buyer, Vendor, Administrator)
   - Commission calculation and vendor earnings
   - Order management across multiple stores
   - Product moderation and vendor approval
   - Revenue tracking and reporting

5. **Real-world Application**: Unlike theoretical projects, this system solves an actual market need and has the potential for deployment and practical use.

6. **Career Opportunities**: Experience with multi-vendor e-commerce platforms is highly valued in the job market, especially with companies building marketplace-based business models.


IV. Objective and Scope

**Here the candidate has to clearly define the objective. This should give a clear picture of the project.**

**Objectives:**

The primary objectives of this project are:

1. **User Authentication System**: Implement secure user registration, login, email verification, password reset, and JWT-based authentication with role-based access control for three user types: Buyers, Vendors, and Administrators.

2. **Multi-Vendor Store Management**: Enable vendors to create and manage their own stores with unique store profiles, logos, descriptions, and product listings.

3. **Product Management**: Provide complete CRUD (Create, Read, Update, Delete) operations for products with support for multiple images, detailed descriptions, pricing, categories, and inventory tracking.

4. **Shopping Cart Functionality**: Implement shopping cart features including adding/removing items, quantity management, save-for-later, and real-time total calculation.

5. **Wishlist**: Allow buyers to save products for future purchase consideration.

6. **Secure Checkout**: Integrate Stripe payment gateway for secure checkout processing with support for credit/debit cards.

7. **Order Management**: Enable order placement, status tracking (Pending, Shipped, Delivered), and order history for buyers and vendors.

8. **Product Reviews**: Allow buyers to leave product reviews with ratings and comments.

9. **Vendor Dashboard**: Provide vendors with sales analytics, earnings tracking, and order management tools.

10. **Admin Panel**: Enable administrators to approve vendors, moderate products, and monitor platform revenue.

**Scope:**

The scope of this project includes:

**In-Scope:**
- User registration and authentication with JWT tokens
- Vendor store creation and management
- Product listing with up to 5 images per product
- Category-based product organization
- Shopping cart with persist-for-later feature
- Wishlist functionality
- Stripe checkout integration
- Order status tracking
- Product reviews and ratings (1-5 stars)
- Vendor dashboard with Chart.js sales visualization
- Admin panel for vendor approval and product moderation
- Real-time notifications via Socket.io
- Responsive design for desktop and mobile devices
- 5% platform commission on vendor sales

**Out-of-Scope:**
- Mobile application development
- Multi-currency support
- International shipping calculation
- AI-based product recommendations
- Vendor subscription plans
- Live chat between buyers and vendors
- Advanced analytics and business intelligence
- Social media integration
- Mobile app push notifications
- Vendor-to-vendor communication
- Multi-language support


V. Methodology

**This section exclusively covers the methodology used in problem solution.**

**Development Methodology: MVC Architecture with RESTful API Design**

This project follows the Model-View-Controller (MVC) architectural pattern combined with RESTful API design principles:

**Model Layer:**
- Mongoose schemas define data structures for all entities
- MongoDB collections store Users, Products, Stores, Orders, Cart items, Reviews
- Indexes created for frequently queried fields
- Database relationships established through references

**View Layer (Frontend):**
- React.js components render user interfaces
- Redux Toolkit manages application state
- Tailwind CSS provides responsive styling
- Vite build tool optimizes production bundles

**Controller Layer (Backend):**
- Express.js route handlers process client requests
- Business logic implemented in controller functions
- Middleware validates requests and authenticates users
- Error handling middleware catches and responds to errors

**API Design:**
- RESTful endpoints follow standard HTTP conventions
- GET for retrieving data, POST for creating resources
- PUT/PATCH for updates, DELETE for removals
- JSON data interchange format
- JWT tokens authenticate API requests

**Development Approach: Iterative and Modular**

The development followed an iterative approach with sequential feature development:

1. **Phase 1 - Foundation**: Set up project structure, install dependencies, configure MongoDB connection, implement basic authentication (register/login)

2. **Phase 2 - Product Management**: Implement vendor store creation, product CRUD operations, image upload via Cloudinary

3. **Phase 3 - Shopping Features**: Build shopping cart, wishlist, product search and filtering

4. **Phase 4 - Checkout & Orders**: Integrate Stripe payment, implement order processing, create order status tracking

5. **Phase 5 - Reviews & Ratings**: Add product review system, star ratings, vendor responses

6. **Phase 6 - Dashboards**: Build vendor dashboard with Chart.js analytics, admin panel for platform management

7. **Phase 7 - Polish**: Add real-time notifications, responsive design improvements, error handling

**Justification of Methodology:**

This methodology was chosen because:

1. **Separation of Concerns**: MVC cleanly separates data, presentation, and logic concerns, making the codebase maintainable

2. **Scalability**: RESTful APIs enable horizontal scaling and mobile app integration

3. **Industry Standard**: React-Node-Mongo stack is widely used in production applications

4. **Component Reusability**: React's component-based architecture enables code reuse across the application

5. **State Management**: Redux Toolkit provides predictable state management for complex e-commerce flows


VI. Process Description

**The process description should be elaborate and include modules, functioning, and process logic.**

**System Architecture Overview:**

The system consists of multiple interconnected modules that work together to provide a complete e-commerce marketplace:

**1. Authentication Module**

The authentication module handles all user-related security functions:

- **User Registration**: New users register with email, password, and role selection (Buyer/Vendor). Passwords are hashed using bcrypt with salt rounds. User document created in MongoDB with default role "buyer".

- **User Login**: Credentials validated against database. JWT access token (15-minute expiry) and refresh token (7-day expiry) generated on successful login. Tokens include user ID and role in payload.

- **Email Verification**: Nodemailer sends verification email with unique token. User status updated on email confirmation.

- **Password Reset**: Forgot password flow generates reset token sent via email. Token validated within 15 minutes for password update.

- **Role-Based Access**: Middleware checks user role before allowing access to vendor/admin routes. Buyers cannot access vendor dashboards.

**2. Store Module**

The store module enables vendor store management:

- **Store Creation**: Vendors submit application with store name, description, and logo. Status defaults to "pending" until admin approval.

- **Store Profile**: Store page displays store information, all products, and ratings. SEO-friendly URLs with store slug.

- **Store Update**: Vendors can update store details but require re-approval for name/logo changes.

**3. Product Module**

The product module handles all product-related operations:

- **Product Creation**: Vendors create products with name, description, price, category, stock quantity, and up to 5 images. Validation ensures required fields and pricing rules.

- **Image Upload**: Images uploaded to Cloudinary CDN. Multiple images supported with primary image designation. Thumbnails generated automatically.

- **Product Search**: Full-text search on name and description. Filters available for category, price range, vendor, and ratings.

- **Product Update**: Vendors can update any field except created date. Inventory updates trigger stock alerts.

- **Product Deletion**: Soft delete marks products as inactive rather than removing from database. Historical orders preserve product reference.

**4. Cart Module**

The cart module manages shopping cart functionality:

- **Add to Cart**: Products added with selected quantity. Cart persists in database linked to user ID. Same product added multiple times increases quantity.

- **Quantity Update**: Users can increase/decrease item quantity within stock limits. Real-time total calculation.

- **Save for Later**: Items can be moved to "save for later" list without deletion. Separate UI section displays saved items.

- **Remove Items**: Individual items removed from cart. Empty cart state displayed when no items.

- **Cart Persistence**: Cart data stored in MongoDB cart collection, linked to user. Cart restored on login.

**5. Wishlist Module**

The wishlist module allows product saving:

- **Add to Wishlist**: Any product can be added to wishlist. Duplicate prevention ensures single entry per product.

- **Wishlist View**: Dedicated page displays all wishlisted products with current pricing.

- **Move to Cart**: One-click move from wishlist to cart streamlines purchase flow.

- **Remove from Wishlist**: Users can remove items individually or clear entire wishlist.

**6. Order Module**

The order module handles purchase and fulfillment:

- **Checkout Flow**: Cart converted to order on payment. Stripe PaymentIntent created for total amount.

- **Payment Processing**: Stripe webhook confirms payment success. Order status updated to "confirmed".

- **Order Creation**: Order document created with items, shipping address, payment ID, and vendor breakdown.

- **Status Tracking**: Order status progresses: Pending → Shipped → Delivered. Vendors update status for their items.

- **Order History**: Buyers view complete order history with order details and tracking.

- **Commission Calculation**: 5% commission calculated on vendor subtotal. Platform revenue tracked per order.

**7. Review Module**

The review module enables customer feedback:

- **Leave Review**: Buyers who purchased product can leave review with 1-5 star rating and comment.

- **Review Display**: Product page shows average rating and individual reviews. Newest reviews displayed first.

- **Vendor Response**: Vendors can respond to reviews within 30 days.

- **Review Validation**: Only verified purchasers can review. Prevents fake reviews.

**8. Vendor Dashboard Module**

The vendor dashboard provides business insights:

- **Sales Analytics**: Chart.js visualizations show daily/weekly/monthly sales. Top products ranked by revenue.

- **Earnings Tracking**: Total earnings, pending payouts, and commission deducted amounts displayed.

- **Order Management**: Vendor views orders containing their products. Can mark as shipped/delivered.

- **Product Performance**: Individual product sales and views tracking.

**9. Admin Module**

The admin module enables platform management:

- **Vendor Approval**: Pending vendor applications reviewed and approved/rejected. Approval triggers welcome email.

- **Product Moderation**: Flagged products reviewable. Administrators can remove inappropriate content.

- **Revenue Dashboard**: Platform-wide sales statistics, commission collected, total vendors/users.

- **User Management**: View all users, reset passwords, suspend accounts.


**Data Flow Diagram:**

User → React Frontend → REST API → Express Controller → Mongoose Model → MongoDB

Payment: User → Stripe Checkout → Webhook → Order Controller → Database Update


VII. Resources and Limitations

**The requirement of resources and limitations must be given.**

**Hardware Requirements:**

- **Development System**: Computer with minimum 4GB RAM, dual-core processor, 20GB storage
- **Server**: Node.js-compatible hosting (local machine, VPS, or cloud service)
- **Database**: MongoDB (local installation or MongoDB Atlas cloud service)
- **Client Devices**: Any modern web browser (Chrome, Firefox, Safari, Edge)
- **Internet Connection**: Stable broadband connection for API calls and image uploads

**Software Requirements:**

**Frontend:**
- React.js 18+ - Component-based UI library
- Redux Toolkit - State management
- Tailwind CSS - Utility-first CSS framework
- Vite - Build tool and development server
- React Router DOM - Client-side routing
- Chart.js / react-chartjs-2 - Data visualization
- Axios - HTTP client for API calls

**Backend:**
- Node.js 18+ - JavaScript runtime
- Express.js - Web application framework
- MongoDB - NoSQL database
- Mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT token management
- Stripe - Payment processing
- Cloudinary - Image CDN and transformation
- Nodemailer - Email sending
- Socket.io - Real-time WebSocket communication
- Express Validator - Input validation
- Helmet - Security headers
- CORS - Cross-origin resource sharing

**Database Collections:**
- Users - User accounts and authentication
- Stores - Vendor store profiles
- Products - Product listings
- Cart - Shopping cart items
- Wishlists - Saved products
- Orders - Purchase orders
- Reviews - Product reviews and ratings
- Notifications - Real-time notifications
- Coupons - Discount codes

**Data Requirements:**

- **Sample Data**: Pre-loaded product categories and sample vendor accounts for demonstration
- **Test Credentials**: Pre-configured test accounts for admin, vendor, and buyer roles
- **Stripe Test Keys**: Stripe test mode API keys for payment testing

**API Resources:**

- **RESTful Endpoints**: Approximately 30+ API endpoints covering all features
- **Authentication Headers**: JWT access token required for protected routes
- **Rate Limiting**: API rate limiting to prevent abuse

**Limitations:**

This system has the following limitations:

1. **Payment Processing**: Uses Stripe test mode only. Production mode requires Stripe account verification.

2. **Image Storage**: Limited to 5 images per product. Cloudinary storage costs apply for high traffic.

3. **Email Service**: Uses Gmail SMTP with app password. Production should use dedicated email service.

4. **No Mobile App**: Mobile experience limited to responsive web design only.

5. **Single Currency**: Only USD supported. Multi-currency requires additional integration.

6. **No International Shipping**: Shipping calculations not implemented. Flat shipping or local pickup assumed.

7. **Limited Search**: Basic text search without advanced features like synonyms or fuzzy matching.

8. **Session Management**: JWT tokens cannot be individually invalidated (requires token expiration or blacklist).

9. **No Refund Processing**: Refund workflow not implemented. Manual refund through Stripe dashboard.

10. **Scalability**: Single-server deployment. Production requires load balancing and caching.

**Scope for Future Work:**

- Mobile application (React Native or Flutter)
- Vendor subscription plans with different commission rates
- Advanced analytics dashboard
- AI-based product recommendations
- Live chat between buyers and vendors
- Social media login integration
- Multi-language support
- Real-time inventory sync
- Vendor shipping label generation


VIII. Testing Technologies Used

**After development, the system has been tested using various testing techniques.**

**Testing Approach:**

The testing strategy combines multiple testing methodologies to ensure system quality:

**1. Unit Testing**

Individual components and functions tested in isolation:

- **Backend Controllers**: Each controller function tested with mocked request/response objects. Database operations mocked to avoid data pollution.
- **Frontend Components**: React components tested using Jest and React Testing Library. Component rendering and user interaction verified.
- **Utility Functions**: Helper functions like commission calculation, currency formatting tested with various inputs.

**2. Integration Testing**

Multiple components working together tested:

- **API Endpoints**: Using Postman, all REST endpoints tested with actual HTTP requests. Status codes, response data, and headers verified.
- **Database Operations**: CRUD operations tested with actual MongoDB operations to verify data persistence.
- **Authentication Flow**: Complete registration, login, token refresh, and logout tested.

**3. Black Box Testing**

Functional testing without knowledge of internal implementation:

- **User Registration**: Tested with valid/invalid email formats, weak passwords, duplicate emails.
- **Product Search**: Tested with various search terms, filters, and sorting options.
- **Cart Operations**: Tested add, update quantity, remove, and save-for-later functions.
- **Checkout Flow**: Tested complete purchase flow from cart to order confirmation.
- **Order Tracking**: Tested status updates and history display.

**4. White Box Testing**

Code-level testing with knowledge of implementation:

- **Controller Logic**: Verified correct data handling, error conditions, and edge cases.
- **Middleware Behavior**: Tested authentication and authorization logic.
- **Database Queries**: Verified query performance and indexing.
- **Security**: Tested SQL injection prevention, XSS protection, CSRF tokens.

**5. User Interface Testing**

Manual testing of user-facing features:

- **Responsive Design**: Tested across desktop, tablet, and mobile viewports.
- **Browser Compatibility**: Tested on Chrome, Firefox, Safari, and Edge.
- **Form Validation**: Verified client-side validation messages and error displays.
- **Loading States**: Tested spinner displays during API calls.
- **Error Handling**: Verified error message displays for failed operations.

**6. Payment Testing**

Stripe test mode used for payment verification:

- **Test Cards**: Stripe test card numbers used (4242 4242 4242 4242 for success).
- **Webhook Testing**: Payment webhook tested using Stripe CLI.
- **Order Creation**: Verified order creation on successful payment.
- **Failed Payments**: Tested error handling for declined cards.

**Test Cases Summary:**

| Feature | Test Cases | Testing Type |
|---------|------------|--------------|
| User Registration | 15+ | Unit, Integration |
| User Login | 10+ | Unit, Integration |
| Product CRUD | 20+ | Unit, Integration |
| Cart Operations | 15+ | Black Box |
| Checkout Flow | 10+ | Integration, Payment |
| Order Management | 12+ | Integration |
| Reviews | 8+ | Unit, Black Box |
| Vendor Dashboard | 10+ | Black Box |
| Admin Panel | 15+ | Integration |

**Testing Tools Used:**

- Jest - JavaScript testing framework
- React Testing Library - React component testing
- Postman - API endpoint testing
- MongoDB Compass - Database inspection
- Stripe Dashboard - Payment testing
- Browser DevTools - Frontend debugging


IX. Conclusion

**The write-up must end with concluding remarks describing innovation, main achievements, and unique features.**

**Conclusion:**

This project successfully develops a comprehensive multi-vendor e-commerce marketplace for handmade goods using modern web technologies. The system demonstrates complete full-stack development capability addressing real-world marketplace challenges.

**Main Achievements:**

1. **Complete E-Commerce Solution**: A fully functional marketplace with user authentication, product management, shopping cart, checkout, order tracking, and payment processing.

2. **Multi-Vendor Architecture**: Platform supports multiple vendors operating independent stores within a single marketplace, each with their own products, orders, and earnings.

3. **Role-Based Access Control**: Three distinct user roles (Buyer, Vendor, Administrator) with appropriate permissions and dashboards for each role.

4. **Modern Technology Stack**: Implementation using industry-standard technologies including React.js, Node.js, Express.js, MongoDB, Stripe, and Cloudinary.

5. **Vendor Dashboard**: Sales analytics with Chart.js visualizations, earnings tracking, and order management tools for vendors.

6. **Admin Panel**: Platform management including vendor approval, product moderation, and revenue monitoring.

7. **Real-Time Functionality**: Socket.io enables real-time notifications for order updates and new orders.

8. **Responsive Design**: Mobile-friendly interface using Tailwind CSS for seamless experience across devices.

9. **Secure Payments**: Stripe integration provides secure payment processing with webhook handling.

10. **Commission System**: 5% platform commission automatically calculated on vendor sales.

**Innovations in Approach:**

1. **Specialized Marketplace**: Unlike generic e-commerce platforms, this system specifically targets handmade goods with features tailored to artisans.

2. **Vendor Application Flow**: Structured application process ensures quality vendors while preventing spam accounts.

3. **Review Verification**: Only verified purchasers can leave reviews, ensuring authentic feedback.

4. **Save for Later**: Shopping cart feature allows customers to save items for future purchase consideration.

5. **Commission Automation**: Automatic commission calculation and tracking streamlines platform revenue.

**Unique Features:**

- Multi-image product uploads with cloud storage
- Wishlist with one-click cart transfer
- Order status tracking across vendors
- Real-time sales analytics
- Email verification and password reset
- Product rating aggregation
- Responsive design for all devices

**System Strengths:**

- Clean code architecture with separation of concerns
- JSON RESTful API enabling future mobile app development
- Scalable MongoDB schema design
- Secure authentication with JWT and bcrypt
- Error handling and validation throughout

This project provides a solid foundation for a production-ready handmade goods marketplace and demonstrates proficiency in modern web development technologies suitable for professional software engineering roles.


--------------------------------------------------------------------

Note for Students:
1. Sub-headings are in Bold, using Bookman Old Style font, Size 14
2. Content/Text is written in Bookman Old Style font, Size 12
3. All sections follow the specified format