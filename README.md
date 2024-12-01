# Notes Native (Golang)

A minimalistic and performant note-taking application built using Golang, designed to be fast, scalable, and developer-friendly.

## Features

- 📝 **Create, Read, Update, Delete Notes and Todos**: Full CRUD functionality for managing notes and todos.
- ⚡ **Native Performance**: Leverages Go's efficiency for seamless performance.
- 🔒 **Secure**: Authentication and data protection baked in with middleware.
- 📂 **Lightweight**: Minimal dependencies for optimal performance.
- 🛠 **Developer-Friendly**: Built with [Gin](https://gin-gonic.com/) for a clean and extensible framework.

## Tech Stack

- **Backend**: [Golang](https://golang.org/) with [Gin](https://gin-gonic.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) via Docker
- **Deployment**: Dockerized for consistent and efficient setup

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/om-baji/notes-native-golang.git
   cd notes-native-golang
    ```

## API Endpoints

### Authentication

| Method | Endpoint    | Description            |
|--------|-------------|------------------------|
| POST   | `/signup`   | Register a new user    |
| POST   | `/signin`   | Log in an existing user|
| GET    | `/validate` | Validate user session  |

### Notes

| Method | Endpoint    | Description             |
|--------|-------------|-------------------------|
| GET    | `/notes`    | Fetch all notes         |
| PUT    | `/notes`    | Update an existing note |
| POST   | `/notes`    | Create a new note       |
| DELETE | `/notes`    | Delete a note           |

### Todos

| Method | Endpoint     | Description                |
|--------|--------------|----------------------------|
| GET    | `/todos`     | Fetch all todos            |
| GET    | `/todo`      | Fetch a specific todo      |
| PUT    | `/todo`      | Update an existing todo    |
| PUT    | `/todo/:id`  | Toggle the status of a todo|
| POST   | `/todos`     | Create a new todo          |
| DELETE | `/todo`      | Delete a todo              |

