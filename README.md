# Dropbox

This project is a simplified Dropbox-like application built using the MERN stack (MongoDB, Express, React, Node.js) with TypeScript.

## Features

- **File Upload and Storage**: Users can upload `.txt`, `.json`, `.jpg`, or `.png` files.
- **File Management**: Files are stored using multer and saved in an `uploads` directory. 
- **File Listing**: Retrieve a list of all uploaded files.
- **File Download**: Download files using a generated link.
- **File Viewing**: View supported files (text, images, etc.) directly in the browser.
- **Error Handling**: Comprehensive error handling for file operations.
- **Data Management**: MongoDB used to store file metadata.
- **RESTful APIs**: Backend provides RESTful API endpoints.
- **TypeScript Support**: Ensures type safety and maintainable code.
- **Docker Support**: Run MongoDB in a Docker container.

---

## Prerequisites

Ensure you have the following installed:
- Node.js (v18+)
- MongoDB (local or Docker container)
- Docker (if applicable)
- npm or yarn

---

## Installation

1. **Clone the Repository**
```bash
git clone https://github.com/DivyanshMangla/Dropbox.git
cd dropbox-project
```

2. **Set up the Server**
```bash
cd server
npm install
```

3. **Set up the Client**
```bash
cd ../client
npm install
```

4. **Configure Environment Variables**
Create `.env` files in both `server` and `client` directories using the provided `.env.example` templates.

Server `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/dropbox
UPLOAD_DIR=./uploads
```

Client `.env`:
```
REACT_APP_API_URL=http://localhost:5000
```

6. **Start the Application**
```bash
# Start the server
cd server
npm run dev

# Start the client
cd ../client
npm start
```

---

## API Endpoints

### **File Management**
- **POST /upload** - Upload a file
- **GET /files** - Get all uploaded files
- **GET /file/:id** - Download a specific file
- **GET /file/view/:id** - View a specific file

### Example API Request (Upload)
```bash
curl -X POST http://localhost:5000/upload \
  -F "file=@path/to/your/file.json"
```


## Contributing

Feel free to open an issue or submit a pull request for improvements or bug fixes.

---

## License

This project is licensed under the MIT License.

