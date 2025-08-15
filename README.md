# Secure Mini API (Express + TypeScript + JWT)

A small Express.js + TypeScript API demonstrating secure JWT authentication and role-based access control.

---

## Features
- **POST** `/api/v1/login` – mock login that returns a JWT with user role in the payload
- **GET** `/api/v1/items` – protected route requiring JWT authentication
- Role-based filtering (admin sees all, user sees limited items)
- Loads item data from a JSON file (no database required)
- Secure defaults: Helmet, CORS, JWT verification
- Clean, modular structure

---

## Prerequisites
- Node.js **v18+**
- npm (comes with Node.js)

---

## Installation

1. **Extract the ZIP or clone the repository**
   ```bash
   cd secure-mini-api(Cloned Directory)
2. **Install dependencies**
   npm install
3. **Update the .env file**
4. **Running the API**
   npm run dev
5. **Verify all Endpoints Via Command Prompt/Postman**
## Project structure
    src/
    ├── data/
    │   ├── items.ts
    │   └── users.ts
    ├── middleware/
    │   └── auth.ts
    ├── routes/
    │   ├── items.route.ts
    │   └── login.route.ts
    ├── server.ts
    └── types.ts
    .env.example
