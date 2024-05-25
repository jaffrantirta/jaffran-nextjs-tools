#!/usr/bin/env node

const { execSync } = require("child_process");

// Function to execute shell commands
const exec = (command) => {
  execSync(command, { stdio: "inherit" });
};

// List of dependencies to install
const dependencies = [
  "@nextui-org/react",
  "framer-motion",
  "@fortawesome/fontawesome-svg-core",
  "@fortawesome/free-solid-svg-icons",
  "@fortawesome/free-regular-svg-icons",
  "@fortawesome/free-brands-svg-icons",
  "@fortawesome/react-fontawesome@latest",
  "moment@^2.30.1",
  "react-hot-toast@^2.4.1",
  "@remixicon/react@^3.0.0",
];

// Install dependencies
console.log("Installing dependencies...");
exec(`npm install ${dependencies.join(" ")}`);

console.log("Dependencies installed successfully!");
