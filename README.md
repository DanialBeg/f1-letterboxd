# F1 Letterboxd

A Formula 1 racing review platform inspired by Letterboxd. Users can browse F1 seasons, explore races, and leave reviews with ratings.

## Features

- 🏁 Browse F1 seasons and races
- ⭐ Rate and review races (1-5 stars)
- 🎨 Letterboxd-inspired dark UI
- 📱 Responsive design
- 🔍 Race details with circuit information, winners, and dates

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for development
- React Router for navigation
- Axios for API calls
- Letterboxd-inspired CSS styling

**Backend:**
- Go with Gin web framework
- GORM for database operations
- PostgreSQL database
- RESTful API design

## Project Structure

```
f1-letterboxd/
├── frontend/          # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   └── App.tsx       # Main app component
│   └── package.json
├── backend/           # Go API backend
│   ├── main.go       # Main server file
│   ├── seed.go       # Database seeding
│   └── go.mod        # Go dependencies
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- Go (v1.21+)
- PostgreSQL

### Frontend Setup

1. Navigate to the project root:
   ```bash
   cd f1-letterboxd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Install Go dependencies:
   ```bash
   cd backend
   go mod tidy
   ```

2. Set up PostgreSQL database:
   ```bash
   createdb f1_letterboxd
   ```

3. Update database connection in `main.go` if needed:
   ```go
   // Update this line with your PostgreSQL credentials
   db, err = gorm.Open(postgres.Open("host=localhost user=postgres dbname=f1_letterboxd sslmode=disable"), &gorm.Config{})
   ```

4. Run the backend server:
   ```bash
   go run .
   ```

   The API will be available at `http://localhost:8080`

### Database Schema

The application automatically creates the following tables:

- **seasons**: F1 championship seasons
- **races**: Individual races with details
- **reviews**: User reviews and ratings

Sample data for 2023 and 2024 seasons is automatically seeded.

## API Endpoints

- `GET /api/seasons` - Get all seasons
- `GET /api/seasons/:year/races` - Get races for a specific year
- `GET /api/races/:id` - Get race details
- `GET /api/races/:id/reviews` - Get reviews for a race
- `POST /api/races/:id/reviews` - Create a new review

## Features Overview

### Home Page
- Grid of available seasons
- Quick navigation to season pages

### Season Page
- List of all races in the season
- Race cards with basic information
- Ratings display for reviewed races

### Race Detail Page
- Complete race information (circuit, winner, date)
- Review submission form
- Display of all user reviews
- Interactive star rating system

## Styling

The UI closely mimics Letterboxd's design:
- Dark theme with orange accents (#ff6900)
- Card-based layouts
- Clean typography
- Hover effects and smooth transitions
- Responsive grid layouts

## Development

To make changes:

1. **Frontend**: Modify files in the `src/` directory. Changes will hot-reload.
2. **Backend**: Modify Go files and restart the server with `go run .`
3. **Styling**: Update `App.css` for visual changes

## Future Enhancements

- User authentication and profiles
- Advanced filtering and search
- Driver and team information
- Race highlights and media
- Social features (following, lists)
- Mobile app version