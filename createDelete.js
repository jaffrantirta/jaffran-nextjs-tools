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

  const pageContent = `
  import { ${
    pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }Context } from "@/context/${pageName}Context";
  import React, { useContext } from "react";
  import { useState } from "react";
  import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Button
  } from "@nextui-org/react";
  
  export default function DeleteModal({
    id,
  }: {
    id: number;
  }) {
    const { destroy } = useContext(${
      pageName.charAt(0).toUpperCase() + pageName.slice(1)
    }Context);
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const handleDelete = async () => {
      await destroy(id);
      handleClose();
    };
  
    return (
      <>
        <Button
          onClick={handleOpen}
          color="red"
          variant="bordered"
        >Delete</Button>
        <Modal
          isOpen={open}
          onClose={handleClose}
        >
        <ModalHeader>Hapus ${
          pageName.charAt(0).toUpperCase() + pageName.slice(1)
        }</ModalHeader>
          <ModalBody><p>Apakah yakin ingin menghapus ?</p></ModalBody>
          <ModalFooter>
          <Button onClick={handleDelete} variant="secondary" color="red">
          Hapus
        </Button>
        <Button onClick={handleClose} variant="primary">
          Batal
        </Button>
          </ModalFooter>
        </Modal>
      </>
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
