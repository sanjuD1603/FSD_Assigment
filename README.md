# FSD_Assigment

## Project Structure

The project is divided into two main parts:

### Backend

The backend directory contains the server-side code, including API endpoints, database models, and business logic.

### Frontend

The frontend directory contains the client-side code, including the user interface, styles, and client-side logic.

### Directory Tree

```
/FSD_Assignment
├── Backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── index.ts
├── Frontend
│   ├── src
│   │   ├── app
│   │   ├── sign-in
│   │   ├── sign-up
│   │   ├── page.tsx
│   │   ├── components
│   │   │├── ui
│   │   │   └── custom
│   │   │       ├── sidebar
│   │   │       ├── navbar
│   │   │       └── productsgrid
│   │   ├── lib
│   │   │   ├── store
│   │   │   │   ├── filterAndSort.tsx
│   │   │   │   ├── productQuery.ts
│   │   │   │   └── utils.ts
│   │   │   ├── providers
│   │   │       └── task-query-provider.tsx
│   └── package.json
└── README.md
```

### How to Run

#### Backend

1. Navigate to the `Backend` directory.
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`

#### Frontend

1. Navigate to the `Frontend` directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
