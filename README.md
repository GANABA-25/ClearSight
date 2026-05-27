# 👁️ ClearSight

**ClearSight** is a mobile health application built with **React Native (Expo)** that helps in the early detection of **cataracts** by scanning and analyzing eye images. The system uses **Azure Custom Vision AI** for image classification and a **Node.js + MongoDB backend** for data processing and user management.

---

## 🚀 Project Overview

ClearSight aims to improve early eye disease detection by allowing users to scan their eyes using their mobile device. The image is analyzed using a trained AI model, and the result indicates whether cataract signs are detected or not.

The project is structured as a **monorepo**, containing both the **frontend (React Native app)** and the **backend (Node.js API)** in a single repository.

---

## 🧠 Key Features

- 📸 Eye scanning using mobile camera
- 🤖 AI-powered cataract detection (Azure Custom Vision)
- 📊 Instant diagnostic results
- 👤 User data storage and history tracking
- 🔐 Secure backend API with Node.js
- 📱 Cross-platform mobile support (Android & iOS)
- ☁️ Cloud-based model inference

---

## 🏗️ Tech Stack

### 📱 Frontend (Mobile App)

- React Native (Expo)
- JavaScript / TypeScript
- Expo Camera
- Axios (API calls)
- React Navigation

### 🖥️ Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- REST API architecture

### 🤖 AI / Machine Learning

- Azure Custom Vision
- Image classification model for cataract detection

---

## 📁 Project Structure

```bash
ClearSight/
├── frontend/        # React Native Expo app
├── backend/         # Node.js API server
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ClearSight.git
cd ClearSight
```

---

### 2. Install dependencies

#### 📱 Frontend

```bash
cd frontend
npm install
npx expo start
```

#### 🖥️ Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the **backend** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
AZURE_ENDPOINT=your_azure_custom_vision_endpoint
AZURE_KEY=your_azure_api_key
```

---

## 🌐 API Features

- User authentication (if implemented)
- Image upload & processing
- Cataract prediction endpoint
- Scan history storage

---

## 📸 Screenshots

> Add app screenshots here:

- Home Screen
- Camera Scan Screen
- Result Screen
- History Screen

---

## 🚀 Future Improvements

- 📊 Improve AI model accuracy
- 👨‍⚕️ Doctor dashboard integration
- 📡 Offline scan caching
- 🔔 Health alerts & reminders
- 🌍 Cloud deployment (backend scaling)

---

## 👨‍💻 Author

Built by **ClearSight Team**

---

## ⚠️ Disclaimer

ClearSight is designed for **educational and screening purposes only** and does not replace professional medical diagnosis.

---

## ⭐ Notes

- Keep `.env` file private
- Ensure backend and frontend URLs are correctly configured
- Use proper Azure keys for AI model access
