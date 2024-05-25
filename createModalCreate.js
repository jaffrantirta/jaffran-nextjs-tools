#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Function to create a new Next.js page
const createPage = (pageName) => {
  const pagesDir = path.join(process.cwd(), `src/app/${pageName}`);
  const pagePath = path.join(pagesDir, `create.tsx`);

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
  import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/textinput";
import { ${
    pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }Context } from "@/context/${pageName}Context";
import { useForm } from "@/helpers/form";
import { RiAddLine, RiSave2Line } from "@remixicon/react";
import React, { useContext, useEffect, useState } from "react";
import { FormEvent } from "react";

export function CreateModal() {
  const { values, setValue, reset } = useForm({
    user: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const { admin, store, getErrorMessage, getErrors } = useContext(AdminContext);

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();
    await store(values);
  };

  useEffect(() => {
    if (!admin.loading && !admin.error) {
      reset();
      closeModal();
    }
  }, [admin]);

  return (
    <div className="flex justify-end">
      <Button className="w-full md:w-fit" onClick={openModal} icon={RiAddLine}>
        Tambah
      </Button>
      <Modal
        isOpen={isOpen}
        header={"Tambah admin baru"}
        onClose={closeModal}
        footer={
          <>
            <Button variant="secondary" onClick={closeModal}>
              Batal
            </Button>
            <Button
              icon={RiSave2Line}
              variant="primary"
              type="submit"
              form="admin-form"
              disabled={admin.loading}
              loading={admin.loading}
              loadingText="Menyimpan..."
            >
              Simpan
            </Button>
          </>
        }
      >
        <>
          {admin.error && (
            <div>
              <p>{getErrorMessage() ?? admin.error}</div>
            </div>
          )}
          <form id="admin-form" onSubmit={handleSubmitForm}>
            <div className="space-y-4">
              <Input
                name="user.name"
                label="Nama"
                type="text"
                placeholder="Nama admin"
                value={values.user.name}
                onValueChange={(value) => setValue("user.name", value)}
                isInvalid={getErrors("user.name")}
                errorMessage={getErrors("user.name")}
                isDisabled={admin.loading}
              />
              <Input
                name="user.email"
                label="Email"
                type="email"
                placeholder="Email admin"
                value={values.user.email}
                onValueChange={(value) => setValue("user.email", value)}
                isInvalid={getErrors("user.email")}
                errorMessage={getErrors("user.email")}
                isDisabled={admin.loading}
              />
              <Input
                name="user.phone"
                label="Nomor Telepon"
                type="text"
                placeholder="Nomor telepon admin"
                value={values.phone}
                isInvalid={getErrors("user.phone")}
                errorMessage={getErrors("user.phone")}
                onValueChange={(value) => setValue("user.phone", value)}
                isDisabled={admin.loading}
              />
              <Input
                name="user.password"
                label="user.Password"
                type="password"
                placeholder="Password admin"
                value={values.password}
                onValueChange={(value) => setValue("user.password", value)}
                isInvalid={getErrors("user.password")}
                errorMessage={getErrors("user.password")}
                isDisabled={admin.loading}
              />
              <Input
                name="user.password_confirmation"
                label="Password Konfirmasi"
                type="password"
                placeholder="Masukan ulang password admin"
                value={values.password_confirmation}
                onValueChange={(value) =>
                  setValue("user.password_confirmation", value)
                }
                isInvalid={getErrors("user.password_confirmation")}
                errorMessage={getErrors("user.password_confirmation")}
                isDisabled={admin.loading}
              />
            </div>
          </form>
        </>
      </Modal>
    </div>
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
