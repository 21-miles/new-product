"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const fetchPagesData = async () => {
  const res = await fetch("http://localhost:4040/pages", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch pages data");
  }
  const data = await res.json();
  console.log("Fetched pages data:", data); // Log the fetched data
  return data;
};

interface Page {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
  };
}

const PagesPage = () => {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPagesData();
        setPages(data.pages);
        console.log("Set pages data:", data.pages); // Log the data being set
      } catch (error) {
        console.error("Error fetching pages data:", error);
      }
    };
    getData();
  }, []);

  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "slug", headerName: "Slug", width: 250 },
    { field: "description", headerName: "Description", width: 400 },
  ];

  const rows = pages.map((page, index) => ({
    id: index,
    title: page.frontmatter.title,
    slug: page.slug,
    description: page.frontmatter.description,
  }));

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Paper>
  );
};

export default PagesPage;
