# Notes Native (Golang) 📝

A **minimalistic**, **secure**, and **lightweight** note-taking application, **Notes Native** combines simplicity and power, leveraging Golang's performance to deliver a developer-friendly experience. Designed to be **scalable**, **fast**, and suitable for both personal and professional use.

---

## 🚀 Features

- **Complete CRUD Functionality**: Manage your notes and todos seamlessly.
- **Blazing Fast Performance**: Built with Go for optimal speed and efficiency.
- **Secure by Design**: Integrated authentication and middleware for robust data protection.
- **Lightweight Architecture**: Minimal dependencies ensure a clean, performant backend.
- **Developer-Friendly**: Powered by [Gin Framework](https://gin-gonic.com/) for extensibility and ease of development.
- **Dockerized Setup**: Hassle-free deployment with Docker.

---

## 🛠 Tech Stack

| **Technology** | **Purpose**                       |
|-----------------|-----------------------------------|
| **Golang**      | Backend development              |
| **Gin**         | HTTP web framework               |
| **PostgreSQL**  | Database for persistent storage  |
| **Docker**      | Simplified environment setup     |

---

## 📥 Installation

Get started with these simple steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/om-baji/notes-native-golang.git
   cd notes-native-golang

## 🔗 API Endpoints

### **Authentication**

| Method | Endpoint    | Description               |
|--------|-------------|---------------------------|
| POST   | `/signup`   | Register a new user       |
| POST   | `/signin`   | Log in an existing user   |
| GET    | `/validate` | Validate the user session |

### **Notes**

| Method | Endpoint    | Description               |
|--------|-------------|---------------------------|
| GET    | `/notes`    | Retrieve all notes        |
| POST   | `/notes`    | Create a new note         |
| PUT    | `/notes`    | Update an existing note   |
| DELETE | `/notes`    | Delete a specific note    |

### **Todos**

| Method | Endpoint     | Description               |
|--------|--------------|---------------------------|
| GET    | `/todos`     | Retrieve all todos        |
| POST   | `/todos`     | Create a new todo         |
| PUT    | `/todo`      | Update a specific todo    |
| PUT    | `/todo/:id`  | Toggle the status of a todo |
| DELETE | `/todo`      | Delete a specific todo    |

## 📂 Folder Structure

```plaintext
notes-native-golang/
├── backend/           # Go server-side code
├── frontend/          # React-based frontend
├── DockerFile.golang  # Dockerfile for backend
├── DockerFile.react   # Dockerfile for frontend
├── README.md          # Project documentation
```


### Images

## 📷 Screenshots

### **Dashboard Overview**
![Dashboard](https://github.com/user-attachments/assets/12119cf2-c976-4a6e-800a-32d5317f60c5)

### **Create and Manage Notes**
![Notes Management](https://github.com/user-attachments/assets/121d49d2-0adb-42ec-9629-42bf3a149d77)

### **Todo Functionality**
![Todos](https://github.com/user-attachments/assets/43dbcb10-42b5-444d-85ac-ab5ca5073df7)
