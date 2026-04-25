================================================================
POWERPOINT PRESENTATION - ARTISAN'S CORNER
================================================================

SLIDE 1: TITLE SLIDE
================================================================
Title: Artisan's Corner: Multi-Vendor Handmade Goods Marketplace
Subtitle: A Project Report
Presented By: Mohammed Mayish
Register No: 23BCAICD214
Guide: <Internal Guide Name>
Institution: Yenepoya Institute of Arts, Science, Commerce and Management
Year: 2026


================================================================
SLIDE 2: AGENDA
================================================================
Agenda
1. Introduction
2. Problem Definition
3. Objectives & Scope
4. Technology Stack
5. System Architecture
6. Features
7. Database Design
8. Modules
9. Workflows
10. Testing
11. Future Scope
12. Conclusion


================================================================
SLIDE 3: 1. INTRODUCTION - BACKGROUND
================================================================
Background
• Digital revolution transformed retail through e-commerce
• Handmade goods market growing significantly
• Traditional marketplaces have limitations:
  - Geographic constraints
  - Intermediary costs (30-50%)
  - Limited operating hours
• Need for dedicated handmade goods platform


================================================================
SLIDE 4: 1. INTRODUCTION - PROJECT OVERVIEW
================================================================
Project Overview
• "Artisan's Corner: Multi-Vendor Handmade Goods Marketplace"
• Multi-vendor e-commerce platform for handmade goods
• Connects artisans directly with customers
• Features vendor stores, product management, checkout
• Three user roles: Buyer, Vendor, Administrator


================================================================
SLIDE 5: 1.6 PROBLEM DEFINITION
================================================================
Problem Definition
• Market Access Problem - Limited customer reach
• Technical Barrier - E-commerce knowledge required
• Trust & Verification - Product authenticity concerns
• Payment Processing - Complex merchant setup
• Platform Fees - High commissions (10-30%)

Solution: Specialized marketplace with 5% commission


================================================================
SLIDE 6: 1.2 OBJECTIVES
================================================================
Objectives
1. Secure User Authentication System
2. Multi-Vendor Store Management
3. Product Catalog with CRUD
4. Shopping Cart & Wishlist
5. Stripe Payment Integration
6. Order Management
7. Product Reviews & Ratings
8. Vendor Dashboard with Analytics
9. Admin Panel


================================================================
SLIDE 7: 1.4 SCOPE
================================================================
Scope - In Scope
• User Registration & Login
• Vendor Store Creation
• Product Management (CRUD)
• Shopping Cart & Wishlist
• Stripe Checkout
• Order Tracking
• Reviews & Ratings
• Dashboards & Analytics

Out of Scope
• Mobile App, Multi-currency, AI Recommendations


================================================================
SLIDE 8: 2. TECHNOLOGY STACK
================================================================
Technology Stack

FRONTEND                    BACKEND
React.js 18+              Node.js 18+
Redux Toolkit            Express.js 4+
Tailwind CSS 3+           MongoDB + Mongoose
Vite 5+                JWT + bcryptjs
React Router            Stripe, Cloudinary
Chart.js               Socket.io, Nodemailer


================================================================
SLIDE 9: 2. TOOLS & TECHNOLOGY
================================================================
Frontend Technologies
• React.js - Component-based UI
• Redux Toolkit - State management
• Tailwind CSS - Utility-first styling
• Vite - Build tool
• Chart.js - Analytics charts
• React Router - Navigation

Backend Technologies
• Node.js - JavaScript runtime
• Express.js - Web framework
• MongoDB - NoSQL database
• JWT - Authentication
• bcryptjs - Password hashing


================================================================
SLIDE 10: 2. THIRD-PARTY SERVICES
================================================================
Third-Party Integrations
• Stripe - Payment processing
• Cloudinary - Image storage CDN
• Nodemailer - Email sending
• Socket.io - Real-time notifications


================================================================
SLIDE 11: 4. SYSTEM REQUIREMENTS
================================================================
Functional Requirements
FR-001: User Registration & Login
FR-002: Email Verification
FR-003: Role-Based Access
FR-004-005: Vendor Store Management
FR-006-009: Product Management
FR-010-013: Shopping Cart
FR-014-017: Checkout & Payment
FR-018-020: Order Management
FR-021-023: Reviews & Ratings


================================================================
SLIDE 12: 4. NON-FUNCTIONAL REQUIREMENTS
================================================================
Non-Functional Requirements
• Performance: API response <500ms, Page load <3s
• Security: bcrypt hashing, JWT tokens
• Usability: Responsive, Browser support
• Reliability: 99% uptime
• Scalability: 50+ concurrent users


================================================================
SLIDE 13: 5. SYSTEM ARCHITECTURE
================================================================
System Architecture
[Client] → [Load Balancer] → [Server]
                              ↓
                    [Express API]
                              ↓
                    [Controllers]
                              ↓
                    [Models/Services]
                              ↓
                    [MongoDB Atlas]


================================================================
SLIDE 14: 5. DATABASE DESIGN
================================================================
Database Collections
• Users - User accounts
• Stores - Vendor profiles
• Products - Product listings
• Orders - Purchase records
• Reviews - Product reviews
• Cart - Shopping carts
• Notifications - Alerts


================================================================
SLIDE 15: 5. MODULE DESCRIPTION
================================================================
System Modules
1. Authentication Module
2. Store Module
3. Product Module
4. Cart Module
5. Order Module
6. Review Module
7. Dashboard Module
8. Notification Module


================================================================
SLIDE 16: 5. WORKFLOW DIAGRAMS
================================================================
User Registration Flow
User → Form → Validation → Hash Password →
Create User → Email Verification → Login


================================================================
SLIDE 17: 5. CHECKOUT WORKFLOW
================================================================
Checkout Flow
Cart → Address → Payment Intent →
Stripe Confirm → Create Order →
Clear Cart → Email Confirmation


================================================================
SLIDE 18: 5. TESTING
================================================================
Testing Approaches
• Unit Testing - Individual functions
• Integration Testing - API endpoints
• Black Box Testing - Features
• UI Testing - Manual testing

Total Test Cases: 100+


================================================================
SLIDE 19: 6. FUTURE SCOPE
================================================================
Future Scope
• Mobile Application (React Native)
• AI-Based Recommendations
• Live Chat
• Social Login
• Multi-Currency Support
• Vendor Subscriptions


================================================================
SLIDE 20: 6. LIMITATIONS
================================================================
Limitations
• Test mode payments only
• No mobile app
• Single currency (USD)
• No multi-language
• Basic search only
• Single server deployment


================================================================
SLIDE 21: 6. CONCLUSION
================================================================
Conclusion
Achievements:
✓ Complete e-commerce platform
✓ Multi-vendor architecture
✓ Role-based access control
✓ Secure authentication
✓ Payment integration
✓ Vendor & admin dashboards

Tech Stack: React, Node.js, MongoDB, Stripe


================================================================
SLIDE 22: THANK YOU
================================================================
Thank You

Questions?

Project By: Mohammed Mayish
Register No: 23BCAICD214
Guide: <Internal Guide Name>


================================================================
PRESENTATION TIPS
================================================================
Slide Design Tips:
• Use consistent font (Times New Roman or Arial)
• Keep text concise (bullet points)
• Use visuals where possible
• Dark text on light background
• Tables and figures as needed

Total Slides: 22

Content follows Table of Contents structure