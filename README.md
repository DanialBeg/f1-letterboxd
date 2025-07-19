# F1 Letterboxd

[![CI/CD Pipeline](https://github.com/DanialBeg/f1-letterboxd/actions/workflows/ci.yml/badge.svg)](https://github.com/DanialBeg/f1-letterboxd/actions/workflows/ci.yml)
[![Playwright Tests](https://github.com/DanialBeg/f1-letterboxd/actions/workflows/playwright.yml/badge.svg)](https://github.com/DanialBeg/f1-letterboxd/actions/workflows/playwright.yml)

A Letterboxd-style application for Formula 1 races, allowing users to rate and review F1 races with a dramatic hero section and comprehensive testing suite.

## Features

- 🏎️ Browse F1 seasons and races with hero background imagery
- ⭐ Interactive star rating system with half-star precision (0.5 - 5.0)
- 📝 Write detailed race reviews with user avatars
- 🏆 View race winners, constructors, and podium finishers
- 🎨 Authentic F1-themed UI with official red color scheme (#FF1E00)
- 📱 Responsive design for mobile and desktop
- 🖼️ Race car images from Wikimedia Commons
- 🍞 Breadcrumb navigation for easy page traversal
- 🌍 Timezone-aware race date display

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

### Testing & Build
- **Playwright** for comprehensive E2E testing
- **Bazel** for advanced build orchestration
- **GitHub Actions** for CI/CD pipeline
- **Node.js 20** LTS runtime environment
- Automated testing on push/PR with multi-browser support

## Project Structure

```
f1-letterboxd/
├── frontend/          # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable components (Header)
│   │   ├── pages/        # Page components (Home, Season, Race)
│   │   └── App.tsx       # Main app component
│   └── package.json
├── backend/           # Go API backend
│   ├── main.go       # Main server file with CORS
│   ├── seed.go       # Database seeding with race data
│   └── go.mod        # Go dependencies
├── e2e/              # End-to-end testing
│   ├── tests/        # Playwright test files
│   ├── playwright.config.ts
│   └── package.json
├── .github/workflows/ # CI/CD pipeline
│   ├── ci.yml        # Main CI workflow
│   └── playwright.yml # Dedicated E2E tests
├── BUILD.bazel       # Bazel build configurations
├── MODULE.bazel      # Bazel module definition
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v20+ LTS recommended)
- Go (v1.23+)
- SQLite (automatically handled)
- Optional: Bazel (for advanced build orchestration)

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

### Run E2E Tests (Playwright)
```bash
# Standard approach
cd e2e
npm install
npx playwright test                    # Run all tests
npx playwright test --project=chromium # Run Chromium only
npx playwright test --ui              # Run with UI mode
npx playwright show-report           # View test report

# Using Bazel (advanced)
bazel test //e2e:integration_tests   # Run via Bazel
```

### Run with Servers
```bash
# Terminal 1: Start backend
cd backend && go run main.go

# Terminal 2: Start frontend  
cd frontend && npm run dev

# Terminal 3: Run tests
cd e2e && npx playwright test --project=chromium
```

### Test Coverage
- Homepage hero section and navigation
- Season page race listings with ratings
- Race detail pages with interactive reviews
- Star rating system (half-star precision)
- Review submission with validation
- Cross-browser compatibility
- Mobile responsiveness
- Error handling and edge cases

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
- Dramatic hero section with F1 race background imagery
- Grid of available seasons with F1 red theming
- Quick navigation to season pages
- Responsive design for all devices

### Season Page
- List of all races in the season with race cards
- Race information including location, date, and winner
- Rating displays for reviewed races
- Breadcrumb navigation

### Race Detail Page
- Complete race information (circuit, winner, date, podium)
- Interactive star rating system with half-star precision
- Review submission form with validation
- Display of all user reviews with avatars
- Timezone-aware date display

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

All PRs must pass:
- ✅ Backend tests and build
- ✅ Frontend build and linting
- ✅ ESLint checks
- ✅ Playwright E2E tests (11 test scenarios)
- ✅ Multi-browser compatibility testing

## License

This project is licensed under the MIT License.