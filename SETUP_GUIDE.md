# Environment Variables Setup Guide

This guide will help you get all the required credentials for the `.env` files.

---

## 1. MongoDB (Database)

### Option A: MongoDB Atlas (Cloud - Recommended for beginners)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a new cluster (choose FREE tier)
4. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Username: `rentaluser` (or your choice)
   - Password: Generate a secure password (save it!)
5. Whitelist your IP:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your IP
6. Get connection string:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rental_platform?retryWrites=true&w=majority`

### Option B: Local MongoDB
1. Install MongoDB Community Edition: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/rental_platform`

**Use this in `backend/.env`:**
```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rental_platform?retryWrites=true&w=majority
```

---

## 2. Cloudinary (Image Uploads)

1. Go to https://cloudinary.com/users/register/free
2. Sign up for a free account
3. After login, go to Dashboard
4. You'll see:
   - **Cloud name** (e.g., `dxyz1234`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

**Use these in `backend/.env`:**
```
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

---

## 3. JWT Secret (Authentication)

This is just a random string for signing tokens. You can use any long random string.

**Quick way to generate:**
- Use an online generator: https://randomkeygen.com/
- Or use Node.js: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

**Use this in `backend/.env`:**
```
JWT_SECRET=your_long_random_string_here_at_least_32_characters
```

---

## 4. Frontend URL (Backend .env)

For local development, use:
```
FRONTEND_URL=http://localhost:5173
```

---

## 5. Backend URL (Frontend .env)

For local development, use:
```
VITE_BACKEND_URL=http://localhost:5000
```

---

## Quick Setup Steps

1. **Get MongoDB URI** (Atlas or local)
2. **Get Cloudinary credentials** (sign up free)
3. **Generate JWT secret** (random string)
4. **Create `backend/.env`** with all values
5. **Create `frontend/.env`** with backend URL
6. **Run the project!**

---

## Example Complete .env Files

### `backend/.env`
```
PORT=5000
MONGO_URI=mongodb+srv://rentaluser:mypassword123@cluster0.abc123.mongodb.net/rental_platform?retryWrites=true&w=majority
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
CLOUDINARY_CLOUD_NAME=dxyz1234
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
FRONTEND_URL=http://localhost:5173
```

### `frontend/.env`
```
VITE_BACKEND_URL=http://localhost:5000
```

**⚠️ Never commit `.env` files to Git! They contain secrets.**

