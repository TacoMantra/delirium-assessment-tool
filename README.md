# 🦴😵 Delirium Risk Assessment 😵🦴

Welcome to the **Delirium Risk Assessment** app! This tool is designed for orthopedic practitioners to assess post-surgical hip fracture patients for the risk of developing delirium through a dynamic questionnaire.

## 🚀 Getting Started

To get the app running on your local machine, follow these steps:

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/TacoMantra/delirium-assessment-tool
cd delirium-assessment-tool
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm i
```

### 3. Build the App

Before running the app, you need to build it with:

```bash
npm run build
```

### 4. Start the App

After building, start the app with:

```bash
npm start
```

This will launch the app at [http://localhost:3000](http://localhost:3000) by default.

### 5. Run in Development Mode

To run the app in development mode (with hot-reloading), use the following command:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) in development mode.

## 🛠️ Tech Stack

This app is built using the following technologies:

-   **Remix** ⚡: A full-stack React framework
-   **React** ⚛️: For building user interfaces
-   **Prisma** 📚: An ORM used for database schema management, seeding, query construction, and TypeScript types.
-   **PostgreSQL** 🐘: The relational database used for data storage

## 📝 Features

-   **Dynamic Questionnaire** 📋: Practitioners can fill out a series of questions to assess patient risk for developing delirium.
-   **Real-time Evaluation** 💡: Answers are processed to give practitioners immediate feedback on delirium risk.
-   **Security Measures** 🔐: The app uses cookie-based simple email/password authentication. Auth headers from the authentication cookie are required for all secured routes.

## 🔧 Available Scripts

Here are the available scripts you can use in the app:

-   **`npm run build`**: This script builds the app using Remix's Vite integration. It compiles all your code into optimized assets ready for production.
-   **`npm run dev`**: Runs the app in development mode using Remix and Vite, which enables hot-reloading as you make changes. The app runs on [http://localhost:5173](http://localhost:5173) in development mode.
-   **`npm run lint`**: This script runs ESLint to check for code style issues. It uses the `.gitignore` file to determine which files to ignore, caches the results, and stores the cache in the `node_modules/.cache/eslint` directory.
-   **`npm run start`**: This script runs the production build of the app by serving the built files located in `./build/server/index.js`. Make sure you've already run the `build` command before running this.
-   **`npm run typecheck`**: Runs TypeScript's `tsc` (TypeScript Compiler) to perform a type check across the codebase, ensuring type safety and catching any type errors.

## 🧑‍💻 Developer Guide

### Running in Development Mode

Run the app in development mode:

```bash
npm run dev
```

This will hot-reload the app as you make changes and run on port 5173.

### Building for Production

To build the app for production:

```bash
npm run build
```

### Running the App in Production

After building, run the app with:

```bash
npm start
```

### Running Lint Checks

To check for any linting issues, use:

```bash
npm run lint
```

### Type Checking

To ensure type safety with TypeScript:

```bash
npm run typecheck
```

### Database Setup

This app uses **PostgreSQL** for its database. To set it up:

1. Install PostgreSQL on your local machine or connect to an existing PostgreSQL instance.
2. Create a new database for the app.
3. Set up a `.env` file in the project root with the following variable:

    ```plaintext
    DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
    ```

    - Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your PostgreSQL credentials and database details.
    - **Important**: Keep the `.env` file private and never commit it to version control. Add it to `.gitignore` to ensure it remains secure.

4. Run the following commands to apply the Prisma schema and seed the database:

    ```bash
    npx prisma migrate dev
    npx prisma db seed
    ```

## 🤝 Contributing

If you'd like to contribute, feel free to fork the repo and submit a pull request. All contributions are welcome!

## 🏥 About

This app is intended for **orthopedic practitioners** to quickly assess post-surgical hip fracture patients for the risk of developing delirium. It aims to simplify the process of gathering relevant data and providing insights to practitioners.

---

Feel free to reach out if you have any questions or suggestions! 👋
