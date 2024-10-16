# 🦴 Hip Fracture Risk Assessment 🦴

Welcome to the **Hip Fracture Risk Assessment** app! This tool is designed for orthopedic practitioners to assess patients for the risk of hip fractures through a dynamic questionnaire.

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
-   **Prisma** 📚: Database ORM (for future use cases)
-   **PostgreSQL** 🐘: The relational database used for data storage
-   **Tailwind CSS** 🎨: For styling

## 📝 Features

-   **Dynamic Questionnaire** 📋: Practitioners can fill out a series of questions to assess patient risk.
-   **Real-time Evaluation** 💡: Answers are processed to give practitioners immediate feedback on hip fracture risk.

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

### Running Tests

To run tests (if available):

```bash
npm test
```

## 🤝 Contributing

If you'd like to contribute, feel free to fork the repo and submit a pull request. All contributions are welcome!

## 🏥 About

This app is intended for **orthopedic practitioners** to quickly assess a patient’s risk of hip fracture. It aims to simplify the process of gathering relevant data and providing insights to practitioners.

---

Feel free to reach out if you have any questions or suggestions! 👋
