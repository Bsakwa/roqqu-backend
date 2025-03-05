# User Management System API

A complete RESTful API for managing users, addresses, and posts built with Node.js, TypeScript, and SQLite.

[![API Documentation](public/postman.png "Click to View API Documentation")](https://documenter.getpostman.com/view/32091073/2sAYdkH91a)

> 📘 **Documentation Access:** Click the image to view the complete Postman API documentation

## Features

- User management (create, retrieve, count)
- Address management (create, retrieve, update)
- Post management (create, retrieve, delete)
- RESTful API design
- Pagination support
- Input validation
- Error handling
- Graceful shutdown
- Unit tests

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: SQLite
- **ORM**: Knex.js
- **Testing**: Jest, Supertest
- **Validation**: Express-validator
- **Other**: CORS, Helmet, Morgan

## API Endpoints

### User Endpoints
- `GET /users?pageNumber=0&pageSize=10` - Returns a paginated list of users
- `GET /users/count` - Returns the total number of users
- `GET /users/{id}` - Returns details of a specific user, including their address
- `POST /users` - Creates a new user

### Address Endpoints
- `GET /addresses/{userID}` - Returns the address associated with a user
- `POST /addresses` - Creates an address for a user
- `PATCH /addresses/{userID}` - Modifies the address associated with a user

### Post Endpoints
- `GET /posts?userId={userId}` - Returns all posts for a specific user
- `POST /posts` - Creates a new post for a user
- `DELETE /posts/{id}` - Deletes a post by its ID

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Bsakwa/roqqu-backend
cd roqqu-backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory (optional)
```
PORT=3000
NODE_ENV=development
```

4. Run database migrations and seed data
```bash
npm run migrate
npm run seed
```

5. Build the TypeScript code
```bash
npm run build
```

### Running the API

#### Development mode
```bash
npm run dev
```

#### Production mode
```bash
npm run build
npm start
```

### Running Tests
```bash
npm run test
```

## Project Structure

```
user-management-system/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── db/            # Database related files
│   │   ├── migrations/  # Database migrations
│   │   └── seeds/       # Seed data
│   ├── middleware/    # Custom middleware
│   ├── models/        # Data models
│   ├── routes/        # API routes
│   ├── utils/         # Utility functions
│   ├── app.ts         # Express app setup
│   └── server.ts      # Server entry point
├── tests/             # Test files
├── .env               # Environment variables
├── knexfile.ts        # Knex configuration
├── package.json       # Project dependencies
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```

# Deployment

### Setting up for Production

1. Set the appropriate environment variables
```
NODE_ENV=production
PORT=8080
DATABASE_PATH=./dist/db.sqlite
```

2. Build the application
```bash
npm run build
```

3. Start the server
```bash
npm start
```

### Deploying to a Hosting Service

The application can be deployed to various hosting services:

- **Heroku**: Use the Procfile and specify Node.js buildpack
- **DigitalOcean App Platform**: Connect to your GitHub repository
- **AWS Elastic Beanstalk**: Deploy using the EB CLI
- **Render**: Set up automatic deployments from GitHub

## License

MIT

## Author

Brian Sakwa
