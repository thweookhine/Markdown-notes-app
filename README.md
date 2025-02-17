# Markdown-Notes-API

API to save notes,upload note files and check grammar of notes including user auhtentication.

## Features

- **Signup:**- Signup user 
- **Login:**- Login User
- **Logout:**- Logout User
- **Save Note:**- Save notes as md file and stores also in db
- **Upload Note File:**-upload md file 
- **Check Grammar for note:**-Check grammar for note.

## Prerequisites

- Node.js installed on your system.
- Postgres installed on your system

**Using postgres docker**
```bash
docker pull postgres
```
```bash
docker run --name your_postgres-container -e POSTGRES_USER=your_postgres_user -e POSTGRES_PASSWORD=your_postgres_password -e POSTGRES_DB=your_db -p 5432:5432 -d postgres
```
**Running postgres**
```bash
docker exec -it postgres-container psql -U postgres
```

## Installation

**Clone the Repository**

```bash
git clone https://github.com/thweookhine/Markdown-notes-app.git

# Navigate to the project Directory
#For Running api 
cd Markdown-notes-app/backend
#For Running Frontend
cd Markdown-notes-app/frontend

```
**Install Dependencies**
```bash
npm install
```
**Run Server**
```bash
node index.js
```
**Run React**
```bash
npm run start
```

**Open your postman and import my collection**
```bash
md-notes-app-collection.json
```
