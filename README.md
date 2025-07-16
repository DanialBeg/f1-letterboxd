# F1 Letterboxd

[![CI/CD Pipeline](https://github.com/DanialBeg/f1-letterboxd/actions/workflows/ci.yml/badge.svg)](https://github.com/DanialBeg/f1-letterboxd/actions/workflows/ci.yml)
[![Playwright Tests](https://github.com/DanialBeg/f1-letterboxd/actions/workflows/playwright.yml/badge.svg)](https://github.com/DanialBeg/f1-letterboxd/actions/workflows/playwright.yml)

A Letterboxd-style application for Formula 1 races, allowing users to rate and review F1 races.

## Features

- 🏎️ Browse F1 seasons and races
- ⭐ Rate races with half-star precision (0.5 - 5.0)
- 📝 Write detailed race reviews
- 🏆 View race winners, constructors, and podium finishers
- 🎨 F1-themed UI with official red color scheme
- 📱 Responsive design for mobile and desktop
- 🖼️ Race car images from Wikimedia Commons

## Tech Stack

### Backend
- **Go** with Gin framework
- **GORM** for database ORM
- **SQLite** for data storage
- RESTful API architecture

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **Axios** for API calls
- CSS3 with custom styling

### Testing
- **Playwright** for E2E testing
- **GitHub Actions** for CI/CD
- Automated testing on push/PR

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

### Backend Setup
```bash
cd backend
go mod tidy
go run .
```
Backend runs on `http://localhost:8080`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## Testing

### Run Playwright Tests
```bash
cd frontend
npm test                 # Run all tests
npm run test:ui         # Run with UI mode
npm run test:report     # View test report
```

### Test Coverage
- Homepage navigation and content
- Season page race listings
- Race detail pages with reviews
- Review submission with star ratings
- Mobile responsiveness
- Error handling

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

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

All PRs must pass:
- ✅ Backend tests
- ✅ Frontend build
- ✅ ESLint checks
- ✅ Playwright E2E tests

## License

This project is licensed under the MIT License.