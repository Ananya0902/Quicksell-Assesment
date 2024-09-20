# React Application with Custom Components

## Overview

This project is a modern React application that features a dynamic UI with various reusable components. The application is optimized for both development and production environments, leveraging Docker for containerization. It is designed with a focus on responsiveness, customizability, and smooth user experience.

---

## Features

- **Custom Cursor**: Enhances the user interface by adding a trailing custom cursor effect.
- **Grid Layout**: A flexible, responsive grid layout to organize content dynamically.
- **Card Component**: Displays individual items or content within cards that support various interactions (e.g., hover or click actions).
- **Loader**: A loader animation to indicate data fetching or processing states.
- **Theme Toggle**: Enables users to switch between dark and light themes.
- **User Icon**: Displays a user avatar or a default user icon for profile representation.
- **Dropdown for Grouping & Sorting**: Allows the sorting and grouping of items by status, user, or priority.

---

## Project Structure

```bash
/root-directory
│
├── /public
│   ├── index.html               # Main HTML file
│   └── favicon.ico              # App favicon
│
├── /src
│   ├── /components              # Reusable components
│   │   ├── /CustomCursor        # Custom cursor effect
│   │   ├── /Grid                # Grid layout for displaying content
│   │   ├── /Card                # Card layout for displaying individual items
│   │   ├── /Header              # Header with navigation
│   │   ├── /Loader              # Loader animation
│   │   ├── /Toggle              # Dark/Light mode toggle
│   │   └── /UserIcon            # User icon or avatar
│   ├── /context                 # Theme context for dark/light mode
│   ├── /interfaces              # TypeScript interfaces
│   ├── /utils                   # Helper functions like status and priority icons
│   │   └── helper.tsx           # Helper functions for the app
│   ├── App.tsx                  # Main app component
│   ├── index.tsx                # App entry point
│   └── styles                   # Global CSS/SCSS files
│
├── Dockerfile                   # Docker setup for containerization
├── .dockerignore                # Files to ignore during Docker build
├── package.json                 # Node dependencies
├── README.md                    # Project documentation
└── .gitignore                   # Files to ignore in Git

## Installation

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your system. You can download it [here](https://nodejs.org/).
- **Docker**: If you want to run the application in a containerized environment, Docker is required. Install it from [here](https://www.docker.com).

### Running Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ananya0902/your-project-repo.git
   cd your-project-repo
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

   The application will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## Usage

### Key Components

1. **Custom Cursor**:
   Adds a trailing effect to the default cursor for a unique user interaction experience.
   ```tsx
   <CustomCursor />
   ```

2. **Grid Layout**:
   Organizes content in a responsive grid layout.
   ```tsx
   <Grid items={itemsArray} />
   ```

3. **Card Component**:
   Displays content within a card layout, useful for showing individual data items.
   ```tsx
   <Card item={itemObject} onClick={handleCardClick} />
   ```

4. **Theme Toggle**:
   Toggles between dark and light themes.
   ```tsx
   <Toggle />
   ```

5. **Loader**:
   Displays a loading animation during data fetch operations.
   ```tsx
   <Loader />
   ```

6. **User Icon**:
   Renders a user avatar or default icon.
   ```tsx
   <UserIcon user={userObject} />
   ```

7. **Dropdown for Grouping & Sorting**:
   Allows for data sorting and grouping by criteria like status, priority, or user.
   ```tsx
   <DisplayDropdown 
      grouping={groupingValue} 
      setGrouping={handleGroupingChange} 
      ordering={orderingValue} 
      setOrdering={handleOrderingChange} 
   />
   ```

---

## Scripts

- **`npm start`**: Runs the app in development mode.
- **`npm run build`**: Builds the app for production to the `build/` folder.
- **`npm run lint`**: Lints the project files to ensure code quality.
- **`npm test`**: Runs the test suite (if available).

---

## Docker Setup

The project is Dockerized for easy deployment and production environment setup.

### Docker Build & Run

1. **Build the Docker image**:

   ```bash
    docker build -t your-app-name .
   ```

2. **Run the Docker container**:

   ```bash
   docker run -it your-app-name
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000) after the container is up and running.

### `.dockerignore`

The following files and folders are excluded from the Docker image build process:

```
node_modules
npm-debug.log
.git
Dockerfile
README.md
.env
```

---

## Deployment

### Building for Production

To create an optimized production build, run:

```bash
npm run build
```

The build is output to the `build/` directory and can be deployed to any static hosting platform (e.g., Netlify, Vercel, AWS S3).

---

Repository Links

- GitHub Repository:  
  `https://github.com/Ananya0902/Quicksell-Assesment`
  
- Live Site (Hosted Link):  
  `https://quicksell-ananya2802.netlify.app/`

---
```
---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
```

You can copy this entire block and paste it into your `README.md` file. Just make sure to replace the placeholders with your actual repository and hosted application links.
