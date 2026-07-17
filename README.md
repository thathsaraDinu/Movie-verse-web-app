# Movie Verse Web

A modern, feature-rich movie discovery and management platform built with Next.js, featuring comprehensive movie information from TMDB, user authentication, watchlist management, and social sharing capabilities.

## 🌟 Live Demo

Visit the live application: [https://movieverseweb.vercel.app](https://movieverseweb.vercel.app)

## ✨ Features

### Movie Discovery
- **Trending Movies**: Browse the latest trending films from TMDB
- **Upcoming Releases**: Stay updated with upcoming movie releases
- **Popular Movies**: Access popular movies across different genres
- **Genre Filtering**: Filter movies by genre with dedicated genre pages
- **Advanced Search**: Search for movies by title with real-time results
- **Movie Details**: View comprehensive movie information including:
  - Plot summaries and overviews
  - Cast and crew information
  - Trailers and videos
  - Similar movie recommendations
  - Rating and release information

### User Authentication
- **Secure Sign Up/Sign In**: Email and password-based authentication
- **Role-Based Access**: Admin and user roles with different permissions
- **Protected Routes**: Middleware-based route protection for dashboard and admin areas
- **Session Management**: Secure JWT-based sessions with NextAuth.js

### Watchlist Management
- **Personal Watchlists**: Create and manage multiple personalized watchlists
- **Add/Remove Movies**: Easily add or remove movies from your watchlists
- **Watchlist Customization**: Custom names and cover images for watchlists
- **Social Sharing**: Share watchlists with other users via unique tokens
- **Shared Watchlists**: View shared watchlists from other users
- **Snapshot Feature**: Create time-limited shared watchlists with expiration

### User Interface
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Responsive Design**: Fully responsive layout for all device sizes
- **Modern UI Components**: Built with Radix UI and Tailwind CSS
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Particle Effects**: Interactive particle background for visual appeal
- **Loading States**: Skeleton loaders and spinners for better perceived performance

### Performance & Optimization
- **Image Optimization**: TMDB CDN integration for optimized image delivery
- **Caching Strategy**: Next.js ISR (Incremental Static Regeneration) with 30-minute revalidation
- **Bundle Optimization**: Package import optimization for smaller bundle sizes
- **Gzip Compression**: Enabled for faster content delivery
- **ETag Support**: Efficient caching with ETag headers

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 16**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type-safe development

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI component library
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Swiper**: Carousel/slider component
- **Embla Carousel**: Alternative carousel implementation

### State Management & Data Fetching
- **TanStack Query (React Query)**: Server state management
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **next-themes**: Theme management

### Authentication & Database
- **NextAuth.js**: Authentication solution
- **MongoDB**: NoSQL database via Mongoose
- **bcryptjs**: Password hashing

### API Integration
- **TMDB API**: The Movie Database for movie data
- **Custom TMDB Client**: Optimized API client with error handling and rate limiting

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **pnpm**: Package manager

## 📁 Project Structure

```
Movie-verse-web-app/
├── app/                      # Next.js App Router pages
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── movies/         # Movie data endpoints
│   │   ├── watchlist/      # Watchlist CRUD operations
│   │   ├── genres/         # Genre data endpoints
│   │   └── actor/          # Actor data endpoints
│   ├── auth/               # Authentication pages
│   ├── movies/             # Movie detail pages
│   ├── genres/             # Genre browsing pages
│   ├── watchlist/          # Watchlist management pages
│   └── search/             # Search functionality
├── components/             # React components
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   ├── movies/            # Movie-specific components
│   ├── watchlist/         # Watchlist components
│   ├── moviedetails/      # Movie detail components
│   ├── providers/         # Context providers
│   └── navbar/            # Navigation components
├── lib/                   # Utility libraries
│   ├── tmdb/             # TMDB API client and functions
│   ├── models/           # Mongoose database models
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database connection
│   └── utils.ts          # General utilities
├── middleware.ts          # Next.js middleware for route protection
├── next.config.js        # Next.js configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database (local or cloud)
- TMDB API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Movie-verse-web-app.git
   cd Movie-verse-web-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your values:
   ```env
   # MongoDB Connection String
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   
   # NextAuth Configuration
   NEXTAUTH_SECRET=your-random-secret-string-at-least-32-characters-long
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js session encryption | Yes |
| `NEXTAUTH_URL` | Base URL for NextAuth.js (localhost:3000 for dev) | Yes |

## 🏗️ Architecture

### Authentication Flow
1. User signs up/signs in via credentials provider
2. NextAuth.js creates JWT session with user role and ID
3. Middleware protects routes based on user authentication and role
4. Session data available throughout the app via AuthProvider

### Data Flow
1. TMDB API client fetches movie data with caching and error handling
2. React Query manages server state with caching and refetching
3. MongoDB stores user data and watchlists
4. API routes handle CRUD operations for watchlists

### Route Protection
- `/dashboard/*` - Requires authentication
- `/admin/*` - Requires admin role
- Middleware redirects unauthorized users appropriately

## 🎨 Key Components

### TMDB Integration
- Custom client with rate limiting and error handling
- Optimized image URL generation using TMDB CDN
- Comprehensive movie, genre, actor, and video data fetching
- Type-safe TypeScript interfaces for all TMDB responses

### Watchlist System
- MongoDB schema with user relationships
- Share token generation for social sharing
- Snapshot functionality with expiration dates
- Real-time updates via React Query

### UI Components
- Built with Radix UI primitives for accessibility
- Styled with Tailwind CSS for consistency
- Animated with Framer Motion for polish
- Responsive design for all screen sizes

## 🔒 Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT-based session management
- Protected API routes with authentication checks
- Role-based access control (admin/user)
- Environment variable protection
- Secure headers configuration

## 📊 Performance Optimizations

- Next.js ISR for static generation with revalidation
- TMDB CDN for optimized image delivery
- Package import optimization for smaller bundles
- Gzip compression enabled
- ETag support for caching
- Lazy loading with React Suspense
- Code splitting by route

## 🧪 Testing

The project uses ESLint for code quality and linting:
```bash
pnpm lint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

Built with ❤️ by [Your Name]

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie database API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Radix UI](https://www.radix-ui.com/) for the accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
