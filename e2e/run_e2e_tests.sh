#!/bin/bash

set -e

echo "Starting F1 Letterboxd E2E Tests..."

# Check if backend is running
if ! curl -s http://localhost:8080/health > /dev/null 2>&1; then
    echo "Backend is not running on localhost:8080"
    echo "Please start the backend first: cd backend && go run main.go"
    exit 1
fi

# Check if frontend is running
if ! curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "Frontend is not running on localhost:5173"
    echo "Please start the frontend first: cd frontend && npm run dev"
    exit 1
fi

echo "Both servers are running, starting Playwright tests..."

# Debug: Show current directory and contents
echo "Current directory: $(pwd)"
echo "Contents: $(ls -la)"

# Find the e2e directory
E2E_DIR=""
if [ -d "e2e" ]; then
    E2E_DIR="e2e"
elif [ -f "playwright.config.ts" ]; then
    E2E_DIR="."
else
    echo "Could not find e2e directory or playwright.config.ts"
    exit 1
fi

echo "Using E2E directory: $E2E_DIR"

# Change to e2e directory
cd "$E2E_DIR"

# Debug: Show e2e directory contents
echo "E2E directory contents:"
ls -la

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm ci
fi

# Run Playwright tests
echo "Running Playwright tests..."
echo "Test directory contents:"
ls -la tests/

# Copy test files to resolve symlinks
echo "Copying test files to resolve symlinks..."
mkdir -p actual_tests
cp -L tests/*.spec.ts actual_tests/

# Run with copied test files
npx playwright test --project=chromium actual_tests/

echo "E2E tests completed successfully!"