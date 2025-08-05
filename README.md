# 🎨 Art Platform

Art Platform is a **Node.js + Express** web application that allows users to **share artworks, follow other artists, and interact with the community**. It includes **authentication, profile management, dark mode, and responsive design**.

---

## ✅ Features
- **User Authentication**
  - Sign Up, Login, Logout
- **Profile Management**
  - Edit bio and profile picture
  - View followers and following lists
- **Artwork Management**
  - Upload new artworks with images
  - Edit and delete artworks
- **Social Features**
  - Follow and unfollow other users
  - View other artists’ profiles and artworks
- **Explore Section**
  - Discover artworks uploaded by all users in a modern grid layout
- **Dark Mode**
  - Toggle between light and dark themes (saved in local storage)
- **Responsive Design**
  - Works well on desktop and mobile devices

---

## 🛠️ Tech Stack
- **Frontend:** EJS Templates, Custom CSS (Responsive Design)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** bcrypt.js for password hashing
- **Image Uploads:** Multer
- **Dark Mode:** Vanilla JavaScript

---

## 🔍 CRUD Operations in the Project
The application implements **full CRUD functionality** across different features:

- **Create**
  - User registration (Sign Up)
  - Uploading new artworks
- **Read**
  - Viewing artworks on **Explore Page**
  - Viewing user profiles, followers, and following lists
- **Update**
  - Editing user profile (bio and profile picture)
  - Editing existing artworks
- **Delete**
  - Deleting an artwork
  - Deleting user account

---

## 🌟 Key UI Features
- **Homepage**: Welcomes the user, offers quick navigation
- **Navbar**: Dynamic links based on user login status
- **Footer**: Clean and minimal with copyright
- **Profile Page**:
  - Circular profile picture (Instagram style)
  - Grid layout for artworks
- **Explore Page**:
  - column responsive grid like Instagram
- **Followers & Following Pages**:
  - Modern list with avatar thumbnails
- **Buttons**:
  - Primary (yellow), Secondary (gray), Danger (red)
  - Different shades in **Dark Mode**
- **Dark Mode**:
  - Background: #121212
  - Buttons: gray & blue for better contrast

---

## 📸 Screenshots

### Sign-up
![Sign-up](public\assets\sign-up-page.png)

### Login
![Login](/public/assets/login-page.png)

### Homepage
![Homepage](/public/assets/homepage.png)

### Profile Page
![Profile Page](/public/assets/profile.png)

### Explore Page
![Explore Page](/public/assets/explor-page.png)

### Dark Mode
![Dark Mode](/public/assets/dark-mode.png)

