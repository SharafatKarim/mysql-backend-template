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

### CORS

- Check the `src/index.js` and edit `cors` to allow only specific origins.

```js
app.use(cors({
  origin: 'http://localhost:5173', // Change this to your frontend URL
  credentials: true,
}));
```

### Database

Our database strcutre is as follows,

```sql
CREATE DATABASE IF NOT EXISTS university;
USE university;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  ID INT AUTO_INCREMENT UNIQUE,
  Username VARCHAR(128) NOT NULL UNIQUE,
  Password VARCHAR(256) NOT NULL,
  Email VARCHAR(128) NOT NULL UNIQUE,
  PRIMARY KEY (Email)
);

CREATE TABLE department (
  dept_name VARCHAR(20),
  building VARCHAR(15),
  budget NUMERIC(12,2) CHECK (budget > 0),
  PRIMARY KEY (dept_name)
);

CREATE TABLE student (
  ID VARCHAR(5),
  name VARCHAR(20) NOT NULL,
  dept_name VARCHAR(20),
  tot_cred NUMERIC(3,0) CHECK (tot_cred >= 0),
  PRIMARY KEY (ID),
  FOREIGN KEY (dept_name) REFERENCES department (dept_name)
  ON DELETE SET NULL
);

INSERT INTO department VALUES ('Biology', 'Watson', '90000');
INSERT INTO department VALUES ('Comp. Sci.', 'Taylor', '100000');
INSERT INTO department VALUES ('Elec. Eng.', 'Taylor', '85000');
INSERT INTO department VALUES ('Finance', 'Painter', '120000');
INSERT INTO department VALUES ('History', 'Painter', '50000');
INSERT INTO department VALUES ('Music', 'Packard', '80000');
INSERT INTO department VALUES ('Physics', 'Watson', '70000');

INSERT INTO student VALUES ('00128', 'Zhang', 'Comp. Sci.', '102');
INSERT INTO student VALUES ('12345', 'Shankar', 'Comp. Sci.', '32');
INSERT INTO student VALUES ('19991', 'Brandt', 'History', '80');
INSERT INTO student VALUES ('23121', 'Chavez', 'Finance', '110');
INSERT INTO student VALUES ('44553', 'Peltier', 'Physics', '56');
INSERT INTO student VALUES ('45678', 'Levy', 'Physics', '46');
INSERT INTO student VALUES ('54321', 'Williams', 'Comp. Sci.', '54');
INSERT INTO student VALUES ('55739', 'Sanchez', 'Music', '38');
INSERT INTO student VALUES ('70557', 'Snow', 'Physics', '0');
INSERT INTO student VALUES ('76543', 'Brown', 'Comp. Sci.', '58');
INSERT INTO student VALUES ('76653', 'Aoi', 'Elec. Eng.', '60');
INSERT INTO student VALUES ('98765', 'Bourikas', 'Elec. Eng.', '98');
INSERT INTO student VALUES ('98988', 'Tanaka', 'Biology', '120');
```

> Full database schema can be found in [this URL](https://github.com/SharafatKarim/pstu-cse-academic/tree/main/Semester%204/database/MySQL/sample%20table).

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
