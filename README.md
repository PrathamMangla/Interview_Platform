# Interview Experience Platform

A platform for sharing and viewing interview experiences.

## Features

- User authentication
- Create, read, update, and delete interview experiences
- Search and filter submissions
- Responsive design
- Real-time form validation
- Error handling

## Tech Stack

- Frontend: React (Vite), TailwindCSS, React Query
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   cd temp-client && npm install
   cd ../server && npm install
   ```
3. Set up environment variables:
   
   **Server (.env):**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   **Client (.env):**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd server && npm run dev

   # Start frontend development server
   cd temp-client && npm run dev
   ```

## Project Structure

```
├── temp-client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── .env
│   └── package.json
│
└── server/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── .env
    └── package.json
```

## API Endpoints

### Auth Routes
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Interview Experience Routes
- GET `/api/experiences` - Get all experiences
- GET `/api/experiences/:id` - Get single experience
- POST `/api/experiences` - Create new experience
- PUT `/api/experiences/:id` - Update experience
- DELETE `/api/experiences/:id` - Delete experience

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 