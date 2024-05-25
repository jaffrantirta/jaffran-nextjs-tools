#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Function to create a new Next.js page
const createPage = (pageName) => {
  const pagesDir = path.join(process.cwd(), `src/app/${pageName}`);
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

  const pageContent = `"use client";
  import Main from "@/app/_components/main";
  import Title from "@/app/_components/title";
  import { ${
    pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }Provider } from "@/context/${pageName}Context";
  import React from "react";
  import Table${
    pageName.charAt(0).toUpperCase() + pageName.slice(1)
  } from "./table";
  import { CreateModal } from "./create";

export default function ${
    pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }() {
  return (
    <${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Provider>
    <Main className="flex flex-col gap-3">
      <Title>${pageName.charAt(0).toUpperCase() + pageName.slice(1)}</Title>
      <CreateModal />
      <Table${pageName.charAt(0).toUpperCase() + pageName.slice(1)} />
    </Main>
  </${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Provider>
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
