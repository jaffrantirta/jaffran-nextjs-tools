#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Function to create a new Next.js page
const createTable = (pageName) => {
  const pagesDir = path.join(process.cwd(), `src/app/${pageName}`);
  const pagePath = path.join(pagesDir, `table.tsx`);

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
  import React, { useContext, useEffect, useState } from "react";
  import { ${
    pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }Context } from "@/context/${pageName}Context";
  import moment from "moment";
  import Link from "next/link";
  import DeleteModal from "./delete";
  import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Spinner, Pagination } from "@nextui-org/react";
  import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/table";
  
  export default function Table() {
    const { ${pageName}, getErrorMessage, fetch } = useContext(${
    pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }Context);
    const [page, setPage] = useState(${
      pageName.charAt(0).toUpperCase() + pageName.slice(1)
    }.data?.current_page ?? 1);
    const [keyword, setKeyword] = useState("");
  
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (keyword !== "") fetch(page, keyword);
      }, 1000);
  
      if (keyword === "") {
        fetch(page, keyword);
      }
  
      return () => clearTimeout(delayDebounceFn);
    }, [keyword, page]);
  
    return (
      <div>
        <Card>
          <CardHeader>
            <div className="grid gid-cols-1 text-center gap-3 md:flex md:justify-between md:items-center">
              <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                List ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}
              </h3>
              <Input
                type="text"
                placeholder="Pencarian..."
                value={keyword}
                onValueChange={(value) => setKeyword(value)}
              />
              <p className="text-xs">
                Total: <span>{(${pageName}?.data?.total ?? 0).toLocaleString()}</span>
              </p>
            </div>
            {${pageName}.error && (
              <div classname="text-center mt-5 text-red-500 w-full">
                <p>{getErrorMessage(${pageName}.error)}</p>
              </div>
            )}
          </CardHeader>
          <CardBody>
            <Table className="mt-5 overflow-x-auto">
            <TableHeader>
              <TableRow>
                <TableCell className="w-1/4">No.</TableCell>
                <TableCell className="w-1/4">ID</TableCell>
                <TableCell className="w-1/4">
                  Tanggal
                </TableCell>
                <TableCell className="w-1/4">Aksi</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {${pageName}?.data?.data?.map((item: any, index: number) => (
                <TableRow key={item.id}>
                  <TableCell className="w-1/4">
                    {number(page, ${pageName}.data.per_page ?? 10, index)}
                  </TableCell>
                  <TableCell className="w-1/4">{item.id}</TableCell>
                  <TableCell className="w-1/2">
                    {moment(item.created_at).format("LLL")}
                  </TableCell>
                  <TableCell className="w-1/4">
                    <Link
                      href="#"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </Link>
                    <DeleteModal id={item.id}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </CardBody>
          <CardFooter>
            {${pageName}.loading && <Spinner />}
            {${pageName}?.data?.total === 0 && <Callout_ title="Tidak ada data" />}
            <Divider />
            {${pageName}.data && ${pageName}.data.total > 0 && (
              <div className="mt-5 flex items-center justify-center">
                <Pagination
                  page={page}
                  total={${pageName}?.data?.last_page}
                  onChange={setPage}
                />
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }`;

  fs.writeFileSync(pagePath, pageContent);
  console.log(`Page ${pageName} table.tsx created successfully!`);
};

// Get the page name from command line arguments
const pageName = process.argv[2];
if (pageName) {
  createTable(pageName);
} else {
  console.log("No page name provided. Please provide a page name.");
}
