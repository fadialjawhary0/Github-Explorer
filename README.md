# GitHub Explorer

## Demo Video

[![GitHub Explorer Demo](https://img.youtube.com/vi/5fuKVKw5qCY/0.jpg)](https://www.youtube.com/watch?v=5fuKVKw5qCY)

**Watch the full demo:** [GitHub Explorer Demo](https://www.youtube.com/watch?v=5fuKVKw5qCY)

## Features

- **Advanced Search**: Search for repositories and users with exact match options
- **Filtering**: Filter by language, sort by stars/forks, and order results
- **Responsive Design**: Optimized for all screen sizes with mobile-first approach
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Real-time Search**: Debounced search with instant results
- **Caching**: LocalStorage-based caching system for improved performance
- **Loading States**: Skeleton components for smooth loading experiences
- **Error Handling**: Comprehensive error handling with retry mechanisms
- **404 Page**: Custom not found page with navigation back to home
- **Interactive Tooltips**: Helpful tooltips for better user guidance
- **Repository Details**: View comprehensive repository information including forks, stars, and languages
- **User Profiles**: Explore GitHub user profiles

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: MobX
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **Theme**: next-themes

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18.0 or higher)
- npm or yarn package manager

## Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:fadialjawhary0/Github-Explorer.git
cd github-explorer
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# GitHub Token (MUST)
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Testing

This project includes comprehensive unit tests using Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

```
src/
├── components/
│   ├── ui/__tests__/
│   │   └── Select.test.tsx
│   └── filters/__tests__/
│       └── RepositoryFilters.test.tsx
├── hooks/__tests__/
│   └── useDebounce.test.ts
└── utils/__tests__/
    └── cn.test.ts
```

## Performance & User Experience

### Caching System

The application implements a sophisticated caching system using LocalStorage to improve performance and reduce API calls:

- **Cache Duration**: 1 hour for all cached data
- **Automatic Cleanup**: Expired cache entries are automatically removed
- **Cache Types**:
  - Search results (repositories and users)
  - Repository details and extensions
  - User profile information
  - Repository file extensions

### Error Handling

Comprehensive error handling system with user-friendly messages:

- **Rate Limiting**: Handles GitHub API rate limits gracefully
- **Network Errors**: Provides retry mechanisms for failed requests
- **404 Handling**: Custom not found page with navigation options
- **Error Messages**: Clear, actionable error messages for users

## API Integration

The application integrates with the GitHub API:

- **Search Repositories**: Find repositories by name, language, and other criteria
- **Search Users**: Find GitHub users
- **Repository Details**: Get detailed repository information
- **Rate Limiting**: Handles API rate limits gracefully

---
