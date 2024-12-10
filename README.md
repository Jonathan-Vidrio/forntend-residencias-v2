
# Project Name

This project is a web application built with Next.js, leveraging Firebase for storage, and consuming an API. It is designed to provide a fast and interactive user experience.

---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/user/nextjs-project.git
   ```

2. Navigate to the project directory:
   ```bash
   cd nextjs-project
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Configure environment variables:  
   Create a `.env.local` file and add the following keys:
   ```
   # API
   HOST_URL=http://localhost:4000/api/v1
   # PRIVATE_KEY used for encryption operations
   PRIVATE_KEY=kW2+nVBB8zVEJnoPRFWNSN3u4Di29PmCxL1JXnx//mA

   # Firebase
   API_KEY=AIzaSyCUaZXaWkouEpGaQ3vJ_LM7qgE9RqE74kM
   AUTH_DOMAIN=sisgosa-b8515.firebaseapp.com
   PROJECT_ID=sisgosa-b8515
   STORAGE_BUCKET=sisgosa-b8515.appspot.com
   MESSAGING_SENDER_ID=130788298995
   APP_ID=1:130788298995:web:753e19b6e779ab6e74a786
   ```

---

## Usage

- **Development mode**:
  ```bash
  npm run dev
  ```
  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

- **Build for production**:
  ```bash
  npm run build
  ```

- **Run the application in production**:
  ```bash
  npm start
  ```

---

## Available Scripts

- `dev`: Runs the server in development mode.
- `build`: Builds the application for production.
- `start`: Runs the compiled application in production mode.
- `lint`: Lints the code using ESLint.
- `format`: Formats the code using Prettier.
- `docs`: Generates documentation using Typedoc.

---

## Main Dependencies

- **Framework**: [Next.js](https://nextjs.org/) (v15.0.3)
- **React Libraries**: React (v19.0.0) and React DOM (v19.0.0)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/)
- **Firebase**: For storage.
- **UUID**: For generating unique identifiers.
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/).
- **Encryption**: [Jose](https://github.com/panva/jose).

---

## Styles

This project uses [Tailwind CSS](https://tailwindcss.com/) for rapid and flexible styling configuration.

