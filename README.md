# Music Release Campaign Manager

A comprehensive web application designed to help musicians, labels, and music marketers schedule release activities, send reminders, and coordinate with team members throughout the music release process.

## Overview

The Music Release Campaign Manager streamlines the complex process of planning and executing music releases across multiple platforms and channels. It provides tools for campaign scheduling, team coordination, asset management, and performance analytics.

## Features

- **Campaign Dashboard:** View all active and upcoming release campaigns at a glance
- **Calendar and Scheduling:** Create timelines, set reminders, and view unified calendars
- **Team Coordination:** Assign tasks and track completion status
- **Release Asset Management:** Upload, store, and share promotional materials
- **Platform Integration:** Connect with distribution platforms and social media
- **Automated Notifications:** Receive alerts for deadlines and send updates
- **Analytics and Reporting:** Track campaign performance and generate reports
- **Template Library:** Create and save campaign templates for future use

## Technology Stack

### Frontend
- React.js with Redux
- Material-UI components
- Chart.js for data visualization
- FullCalendar.js for calendar views
- SCSS for styling
- Axios for API communication

### Backend
- Node.js with Express
- MongoDB database
- JWT authentication with OAuth2
- AWS S3 for file storage
- Redis for caching
- Node-cron for task scheduling
- SendGrid for email notifications
- Twilio for SMS notifications

### DevOps
- Docker containerization
- GitHub Actions for CI/CD
- AWS hosting (EC2, S3, CloudFront)
- Sentry for error tracking
- New Relic for performance monitoring

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- Redis
- AWS account (for S3 storage)
- SendGrid account (for emails)
- Twilio account (for SMS)

### Installation

1. Clone the repository
```
git clone https://github.com/dxaginfo/music-release-campaign-manager-app.git
cd music-release-campaign-manager-app
```

2. Install dependencies
```
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
```
# Create .env file in server directory
cp server/.env.example server/.env
# Add your own values to the .env file
```

4. Start the development servers
```
# Start backend server
cd server
npm run dev

# In a new terminal, start frontend server
cd client
npm start
```

5. Access the application at `http://localhost:3000`

## Deployment

### Using Docker
```
# Build Docker images
docker-compose build

# Start the application
docker-compose up -d
```

### Manual Deployment
See the [deployment guide](docs/deployment.md) for detailed instructions on deploying to AWS.

## Project Structure

```
music-release-campaign-manager/
├── client/                 # React frontend application
│   ├── public/             # Static files
│   └── src/                # Source files
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── redux/          # Redux store and reducers
│       ├── services/       # API service calls
│       └── utils/          # Utility functions
├── server/                 # Node.js backend application
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Express middlewares
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── utils/              # Utility functions
├── docs/                   # Documentation
└── docker-compose.yml      # Docker compose configuration
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Material-UI](https://material-ui.com/)