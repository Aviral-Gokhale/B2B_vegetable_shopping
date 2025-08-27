# AgrilConnect - B2B Vegetable Delivery Service

A modern B2B platform connecting farmers directly with food businesses, providing fresh produce delivery with reliable service and competitive pricing.

![AgrilConnect](https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80)

## 🌟 Features

### For Customers
- **Product Catalog**: Browse fresh vegetables with detailed descriptions and pricing
- **Smart Search & Filtering**: Find products by category or search terms
- **Shopping Cart**: Add items, adjust quantities, and manage orders
- **Flexible Ordering**: Choose delivery dates and time slots
- **Multiple Payment Options**: Cash on delivery or online payment via Razorpay
- **Order History**: Track past orders and their status
- **WhatsApp Integration**: Quick ordering and support via WhatsApp

### For Administrators
- **Admin Dashboard**: Comprehensive management interface
- **Product Management**: Add, edit, and manage product inventory
- **Category Management**: Organize products into categories
- **Order Management**: View and update order status
- **Delivery Management**: Track deliveries and manage schedules
- **User Management**: Manage business profiles and user roles
- **Inquiry Management**: Handle contact form submissions
- **Role-Based Access Control**: Different permission levels for admin, manager, staff, and users

### Technical Features
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live order status updates
- **Secure Authentication**: Email/password and Google OAuth integration
- **Role-Based Permissions**: Granular access control system
- **Data Persistence**: Reliable data storage with Supabase
- **Type Safety**: Full TypeScript implementation
- **Comprehensive Testing**: Unit and integration tests with Vitest

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Zustand** - Lightweight state management
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Robust relational database
- **Row Level Security (RLS)** - Database-level security
- **Supabase Auth** - Authentication and user management
- **Edge Functions** - Serverless functions for API endpoints

### Payment & Communication
- **Razorpay** - Online payment processing
- **WhatsApp Integration** - Customer support and quick ordering

### Testing & Development
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **ESLint** - Code linting and formatting
- **Happy DOM** - Lightweight DOM implementation for testing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/agrilconnect.git
   cd agrilconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database migrations in the `supabase/migrations` folder
   - Configure authentication providers if needed
   - Set up Row Level Security policies

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application.

## 📁 Project Structure

```
agrilconnect/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── AdminDashboard.tsx
│   │   ├── ProductCatalog.tsx
│   │   ├── Cart.tsx
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   │   └── usePermissions.ts
│   ├── lib/              # Utility libraries
│   │   ├── supabase.ts
│   │   └── razorpay.ts
│   ├── store/            # State management
│   │   ├── authStore.ts
│   │   ├── cartStore.ts
│   │   └── ...
│   ├── test/             # Test utilities and mocks
│   ├── types/            # TypeScript type definitions
│   └── App.tsx           # Main application component
├── supabase/
│   ├── functions/        # Edge functions
│   └── migrations/       # Database migrations
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🧪 Testing

The project includes comprehensive testing with Vitest and React Testing Library.

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run tests once (CI mode)
npm run test:ci
```

### Test Coverage
- **Store Tests**: Authentication, cart management, and state logic
- **Component Tests**: User interactions and rendering
- **Integration Tests**: End-to-end user workflows
- **Mock Services**: Supabase and external API mocking

## 🚀 Deployment

### Frontend Deployment
The application can be deployed to various platforms:

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Deploy with continuous integration
- **Bolt Hosting**: Use the built-in deployment feature

### Backend Services
- **Supabase**: Handles database, authentication, and edge functions
- **Razorpay**: Manages payment processing

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 👥 User Roles & Permissions

### Admin
- Full access to all features
- User management and role assignment
- System configuration

### Manager
- Product and category management
- Order management
- Inventory control
- Customer inquiries

### Staff
- View products and categories
- Process and update orders
- Basic customer support

### User (Customer)
- Browse and purchase products
- Manage personal orders
- Contact support

## 🔐 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Role-Based Access Control**: Granular permissions system
- **Secure Authentication**: Email/password and OAuth integration
- **Input Validation**: Client and server-side validation
- **CORS Protection**: Secure API endpoints

## 📱 Mobile Responsiveness

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🤝 Contributing

We welcome contributions to AgrilConnect! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Maintain consistent code formatting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- Fresh produce images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- Built with [Supabase](https://supabase.com)
- Payments powered by [Razorpay](https://razorpay.com)

---

**AgrilConnect** - Bridging the gap between farmers and food businesses with fresh, quality produce and reliable service.
