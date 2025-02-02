# Real-Time Chat Application

A full-stack chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring real-time messaging capabilities using Socket.IO.




<img width="1440" alt="15" src="https://github.com/user-attachments/assets/75e15400-b30a-4cb4-a159-f7c49ca13eff" />



## Features

- Real-time messaging using Socket.IO
- User authentication with JWT
- Responsive modern UI with Tailwind CSS
- Profile picture upload with Cloudinary
- Online user status indicators
- Message history persistence
- Secure password hashing with bcrypt
- Environment variable configuration
- Production-ready setup

<img width="1440" alt="15 1" src="https://github.com/user-attachments/assets/7208266c-aa7b-4cbb-8317-ecc49dd7ec77" />
<img width="1440" alt="15 3" src="https://github.com/user-attachments/assets/933da715-9bcf-444b-9907-bf21b7112edb" />


## Tech Stack

### Frontend
- React with Vite
- Tailwind CSS for styling
- Zustand for state management
- Socket.IO client for real-time communication
- Axios for HTTP requests

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- Socket.IO for real-time functionality
- JWT for authentication
- Cloudinary for image storage
- Bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (version >= 16.x)
- MongoDB database
- Cloudinary account for image storage

### Installation

1. Clone the repository:
```bash
git clone <https://github.com/abhishek-profiles/sky-sync.git>
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

Create a `.env` file in the backend directory with the following variables:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:5173
```




### Development

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Access the application at `http://localhost:5173`

### Production Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Start the production server:
```bash
cd ../backend
npm start
```

The application will be served from the backend server, with the frontend static files being served from the `frontend/dist` directory.

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5001)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `NODE_ENV`: Environment mode (development/production)
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `FRONTEND_URL`: Frontend application URL

## Features in Detail

### Real-time Messaging
- Instant message delivery using Socket.IO
- Online/offline user status
- Message history persistence in MongoDB

### User Authentication
- Secure user registration and login
- JWT-based authentication
- Protected API routes

### Profile Management
- Profile picture upload and update
- Cloudinary integration for image storage
- User profile customization
