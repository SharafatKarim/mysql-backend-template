# MYSQL-BACKEND-TEMPLATE

This is a template for a MySQL backend service. It is a simple service that connects to a MySQL database and performs basic CRUD operations.

## Setup

1. Clone the repository.

2. Install the dependencies,

```bash
npm install
```

3. Create a `.env` file according to `.env.example` and fill in the necessary values.
4. Run the service.

```bash
npm run dev
```

## Config

- Check the `src/index.js` and edit `cors` to allow only specific origins.

```js
app.use(cors({
  origin: 'http://localhost:5173', // Change this to your frontend URL
  credentials: true,
}));
```

## API

The service exposes the following endpoints:
<!-- app.use("/api/auth", authRoutes);
router.get('/users', allUsers);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.get('/check', checkAuth);
 -->

### Auth

1. `GET /api/users`: Get all users. [Commented out]
2. `POST /api/signup`: Create a new user.
3. `POST /api/signin`: Sign in a user.
4. `POST /api/signout`: Sign out a user.
5. `GET /api/check`: Check if a user is authenticated.

### Data

1. `GET /api/data/fetch`: Run a SQL query to fetch data. [NOT SECURE]

## Security

This service is not secure and is meant for template or educational purpose only. Do not use it in production.

> Here we can execute SQL queries directly from the API. This is a huge security risk and should never be done in a production environment. So, implement a proper ORM or query builder to prevent SQL injection attacks.
