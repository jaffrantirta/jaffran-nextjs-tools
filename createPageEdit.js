#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Function to create a new Next.js page
const createPage = (pageName) => {
  const pagesDir = path.join(process.cwd(), `src/app/${pageName}/[id]`);
  const pagePath = path.join(pagesDir, `page.tsx`);

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

  const pageContent = `
  "use client";
import React from "react";
import Info from "./info";
import { ${
    pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }Provider } from "@/context/${pageName}Context";

export default function ShowAdmin({ params }: { params: { id: number } }) {
  return (
    <${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Provider>
      <div className="flex flex-col gap-3 p-10">
        <h1>Detail ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}</h1>
        <Info ${
          pageName.charAt(0).toUpperCase() + pageName.slice(1)
        }Id={params.id} />
      </div>
    </${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Provider>
  );
}

  `;

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
