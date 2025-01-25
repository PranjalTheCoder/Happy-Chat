# 💬 Realtime Chat App  

Experience seamless communication with our **Realtime Chat App**, a modern, feature-rich application designed for instant messaging, file sharing, and group chats. Built with the latest technologies, this app combines functionality, performance, and an engaging user interface.

---

## 🚀 Features  
- **Real-time Messaging**: Instant data updates using **Socket.io**.  
- **File Sharing**: Send images, videos, audio, or any file up to **5MB**.  
- **Group Chats**: Create and manage groups with **3-100 members**.  
- **Admin Panel**: Access detailed analytics and user management via a secret key.  
- **Infinite Scrolling**: Efficient message loading in chunks for a smoother experience.  
- **Typing Indicators**: See when someone is typing in real time.  
- **Notifications**: Get instant updates for messages and friend requests.  
- **Search & Friend Requests**: Easily find and connect with other users.  
- **Responsive Design**: Optimized for all devices.  

---

## 🛠️ Technologies & Tools  

### **Frontend**  
- **React** (Vite + SWC): Lightning-fast development with modern tooling.  
- **MUI**: A beautiful UI with Material Design components.  
- **Redux**: Robust state management.  
- **Axios**: API requests made simple.  
- **Framer Motion**: Smooth animations for dynamic messaging.  
- **Infinite Scroll**: Auto-load more content as you scroll.  

### **Backend**  
- **Node.js & Express**: Scalable and efficient server-side operations.  
- **Socket.io**: Real-time bidirectional communication.  
- **Express Validator**: Backend validation for secure data handling.  
- **MongoDB**: NoSQL database for dynamic data storage.  
- **Multer**: File upload handling middleware.  

### **File Storage**  
- **Cloudinary**: Fast and reliable file storage and delivery.  

### **Additional Libraries**  
- **Moment.js**: Date and time formatting.  
- **React-Helmet-Async**: Manage metadata for SEO.  
- **React-Hot-Toast**: Beautiful toast notifications.  
- **React Chart.js**: Stunning charts for the admin dashboard.  
- **Material Icons**: Sleek, modern icons for UI elements.  

---

## 🌟 Key Features Breakdown  
- **Group Chat Management**:  
  - Create, rename, or delete groups.  
  - Add or remove members.  
  - Automatically assign a new admin when the current admin leaves.  

- **Admin Dashboard**:  
  - View user statistics, messages, and chat data.  
  - Accessible only with a secret key for security.  

- **Authentication**:  
  - Secure login and signup with hashed passwords.  
  - Token-based authentication using **JWT**.  

- **Real-time Notifications**:  
  - Push notifications for friend requests and messages.  

- **File Sharing**:  
  - Share attachments directly in chats.  

---

## 🧩 Project Structure  

### **Frontend**  

```plaintext
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   ├── dialogs/
│   │   ├── layout/
│   │   └── shared/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

### **Backend**
# 🧩 Project Structure: Backend  

```plaintext
server/
├── constants/
├── controllers/
├── middlewares/
├── modules/
├── routes/
├── utils/
├── app.js
└── package.json
```

---

# 🌐 API Endpoints  

## **User API**  
- `POST /api/auth/login` – Login a user.  
- `POST /api/auth/signup` – Register a new user.  
- `GET /api/users/search` – Search for users.  

## **Chat API**  
- `POST /api/chats/create` – Create a new chat or group.  
- `GET /api/chats` – Retrieve all chats for a user.  
- `POST /api/chats/messages` – Send a new message.  
- `GET /api/chats/messages` – Retrieve paginated messages.  

## **Admin API**  
- `GET /api/admin/stats` – Retrieve admin analytics data.  

---

# 📈 How It Works  

1. **Infinite Scrolling**  
   Messages load dynamically in small chunks as the user scrolls down.  

2. **Real-Time Messaging**  
   Powered by **Socket.io**, ensuring that messages and typing indicators update instantly.  

3. **File Upload**  
   Files are uploaded to **Cloudinary** and delivered efficiently.  

4. **Admin Panel**  
   Accessible via a **secret key**, providing comprehensive data visualization.  

---

# 🖥️ Installation  

## 1. Clone the Repository  
```bash
git clone https://github.com/PranjalTheCoder/Happy-Chat.git
https://github.com/PranjalTheCoder/Happy-Chat.git
```
## 2. Install Dependencies

 - **Frontend**
  ```bash
  cd client  
  npm install  
  npm run dev
  ```

 - **Backend**
  ```bash
  cd server  
  npm install  
  npm start
  ```

- **Environment Variables**
  Create .env files in both client and server directories with appropriate keys, including
    - MongoDB URI
    - JWT Secret
    - Cloudinary API keys

---

## 🎨 Design Inspiration  
This app's design combines minimalist UI components from **MUI** with animations powered by **Framer Motion**, ensuring a seamless and engaging user experience.

## 🤝 Contributing  
Contributions are welcome! Feel free to **fork** the repository and submit a **pull request**.

## 📝 License  
This project is licensed under the **MIT License**.

## 🌟 Acknowledgments  
Special thanks to the open-source community for libraries and tools like **React**, **Socket.io**, **MongoDB**, and **Cloudinary** that make projects like this possible!


   
