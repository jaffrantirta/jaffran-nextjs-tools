#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Function to create a new Next.js page
const createPage = (pageName) => {
  const pagesDir = path.join(process.cwd(), "pages");
  const pagePath = path.join(pagesDir, `${pageName}.tsx`);

  if (!fs.existsSync(pagesDir)) {
    console.error(
      "Error: Pages directory does not exist. Please ensure you are in a Next.js project."
    );
    process.exit(1);
  }

  if (fs.existsSync(pagePath)) {
    console.error(`Error: Page ${pageName}.tsx already exists.`);
    process.exit(1);
  }

  const pageContent = `import React from "react";

export default function ${
    pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }() {
  return (
    <div>
      <h1>${pageName.charAt(0).toUpperCase() + pageName.slice(1)} Page</h1>
    </div>
  );
}`;

  fs.writeFileSync(pagePath, pageContent);
  console.log(`Page ${pageName}.tsx created successfully!`);
};

// Get the page name from command line arguments
const pageName = process.argv[2];
if (pageName) {
  createPage(pageName);
} else {
  console.log("No page name provided. Please provide a page name.");
}
