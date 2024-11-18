# Kar-Go App  

### **Team Members**  
- Eve Kiai  
- Evans Kabiru  
- Bradley Ochieng  

---

## **Description**  
# **Kar-Go** is an application designed to streamline the management of incoming and outgoing cargo for companies. # It provides a user-friendly interface for tracking cargo, addressing issues of lost or damaged goods, and aiding in cargo accounting.  

---

## **Problem Statement**  
# Managing cargo can be challenging, with common issues including:  
- # Cargo being lost or misplaced.  
- # Difficulty tracking and managing the condition of cargo.  
- # Lack of accountability for damages.  

---

## **Solution Statement**  
# Kar-Go provides a centralized platform where companies can:  
- # Track incoming and outgoing cargo efficiently.  
- # Manage cargo details, ensuring accountability for damages.  
- # Streamline the accounting process related to cargo operations.  

---

## **Project MVP/User Stories**  
# As a user, you can:  
1. # **View all cargo** in the application.  
2. # **Select specific cargo** to view its details.  
3. # **Delete specific cargo** entries as needed.  
4. # **Add new cargo** into the application.  

---

## **Technologies Used**  
- # **Frontend**: HTML, CSS, JavaScript, React.js  
- # **Backend**: JSON Server  

---

## **Future Plans**  
1. # **Comment Section**:  
   # Allow users to add comments on individual cargo profiles to track observations or specific notes.  

2. # **Five-Star Rating System**:  
   # Introduce a rating system to evaluate the state or quality of cargo based on its condition.  

# **Project structure **:
kar-go/
├── backend/
│   ├── db.json
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── .gitignore
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.png
│   │   ├── components/
│   │   │   ├── CargoList.js
│   │   │   ├── CargoDetails.js
│   │   │   ├── CargoForm.js
│   │   │   ├── CommentSection.js
│   │   │   ├── Footer.js
│   │   │   ├── Navbar.js
│   │   │   ├── Rating.js
│   │   │   ├── Search.js
│   │   │   └── CargoItem.js
│   │   ├── pages/
│   │   │   ├── About.js
│   │   │   ├── CargoManagement.js
│   │   │   └── Home.js
│   │   ├── services/
│   │   │   ├── app.css
│   │   │   ├── app.jsx
│   │   │   ├── index.css
│   │   │   ├── index.js
│   │   │   └── main.js
│   │   ├── styles/
│   │   │   └── styles.css
│   │   ├── routes/
│   │   │   └── AppRoutes.js
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
├── README.md
---

## **How to Run the Application**  

### **Prerequisites**  
- # Node.js installed on your machine.  
- # JSON Server installed globally or locally.  

### **Steps**  
1. # Clone the repository:  
   ```bash  
   git clone https://github.com/your-repo/kar-go.git  
   cd kar-go 
 
# License
# Copyright(c) Eve,Evans,Bradley 2024
# Happy Cargo Management! 🚛