# Artisan's Corner - Multi-Vendor Handmade Goods Marketplace

A full-featured multi-vendor e-commerce marketplace for handmade goods, built with React.js, Node.js, Express, MongoDB, and Stripe.

## Features

### For Buyers
- Browse, search, and filter products
- Shopping cart with save-for-later
- Wishlist functionality
- Secure checkout with Stripe
- Order tracking and history
- Product reviews and ratings

### For Vendors
- "Become a Seller" application flow
- Full product CRUD with multi-image upload
- Sales dashboard with Chart.js analytics
- Order management (mark as Shipped/Delivered)
- Vendor earnings with 5% commission

### For Admins
- User and vendor management
- Product moderation (flag/remove)
- Platform revenue dashboard
- Vendor application approval

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js + Redux Toolkit + Tailwind CSS |
| Backend | Node.js + Express.js + REST API |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Payments | Stripe |
| Images | Cloudinary |
| Email | Nodemailer |
| Real-time | Socket.io |

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Stripe account
- Cloudinary account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd artisans-corner
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Create environment files:

**Server (.env in server/):**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret
STRIPE_SECRET_KEY=your-stripe-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Client (.env in client/):**
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client:
```bash
cd client
npm run dev
```

3. Open http://localhost:5173 in your browser

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@artisanscorner.com | Admin@123! |
| Vendor | vendor@example.com | Vendor@123! |
| Buyer | buyer@example.com | Buyer@123! |

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (vendor)
- `PUT /api/products/:id` - Update product (vendor)
- `DELETE /api/products/:id` - Delete product (vendor)

### Orders
- `GET /api/orders/my` - Get user's orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status (vendor)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update item quantity
- `DELETE /api/cart/:itemId` - Remove item

## Project Structure

```
artisans-corner/
├── client/                 # React frontend
│   ├── src/
│   │   ├── app/           # Redux store
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Route pages
│   │   ├── features/     # Redux slices
│   │   ├── services/     # API services
│   │   └── utils/        # Helpers
│   └── ...
│
└── server/                # Node.js backend
    ├── controllers/      # Route handlers
    ├── models/          # Mongoose schemas
    ├── routes/          # Express routes
    ├── middleware/       # Auth, validation
    ├── utils/           # Helpers
    └── ...
```

## License

MIT License - see LICENSE file for details.
