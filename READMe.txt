npm i jsonwebtoken bcryptjs cors cookie-parser cloudinary

Model - Database Interaction
Controller - front - back interaction
View - Frontend UI

build process in package.json
 "scripts": {
    "test": "node backend/server.js",
    "build": "npm install && npm install --include=dev --prefix frontend && npm run build --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "nodemon backend/server.js",
    "client": "npm run dev --prefix frontend"
  }, 

//we must change this in our root package.json because it is react + vite in frontend

PORT = 
MONGO_URL = 
JWT_SECRET = 
NODE_ENV = 
CLOUDINARY_API_KEY =
CLOUDINARY_API_SECRET =
CLOUDINARY_CLOUD_NAME =  
