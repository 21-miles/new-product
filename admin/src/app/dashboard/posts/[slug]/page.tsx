"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const fetchPostBySlug = async (slug: string) => {
  const res = await fetch(`http://localhost:4040/posts/${slug}`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch post with slug: ${slug}`);
  }
  return await res.json();
};

const insertNewPost = async (newPost: any) => {
  const res = await fetch("http://localhost:4040/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (!res.ok) {
    throw new Error("Failed to insert new post");
  }
  return await res.json();
};

const updatePost = async (slug: string, updatedPost: any) => {
  const res = await fetch(`http://localhost:4040/posts/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  });

  if (!res.ok) {
    throw new Error(`Failed to update post with slug: ${slug}`);
  }
  return await res.json();
};

const PostsForm = ({ params }: { params: { slug?: string } }) => {
  const router = useRouter();
  const { slug } = params;
  const [post, setPost] = useState<any>({
    slug: "",
    frontmatter: {
      title: "",
      author: "",
      date: "",
      categories: [],
      tags: [],
    },
  });
  const [loading, setLoading] = useState(!!slug); // Só carrega se for edição
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const getPost = async () => {
        try {
          const data = await fetchPostBySlug(slug);
          setPost(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      getPost();
    }
  }, [slug]);

  const handleInputChange = (field: string, value: string) => {
    setPost((prev: any) => ({
      ...prev,
      frontmatter: {
        ...prev.frontmatter,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      if (slug) {
        await updatePost(slug, post);
      } else {
        await insertNewPost(post);
      }
      router.push("/dashboard/posts");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" mb={3}>
        {slug ? "Edit Post" : "New Post"}
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {!slug && (
          <TextField
            label="Slug"
            value={post.slug}
            onChange={(e) => setPost({ ...post, slug: e.target.value })}
            fullWidth
          />
        )}
        <TextField
          label="Title"
          value={post.frontmatter.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          fullWidth
        />
        <TextField
          label="Author"
          value={post.frontmatter.author}
          onChange={(e) => handleInputChange("author", e.target.value)}
          fullWidth
        />
        <TextField
          label="Date"
          type="date"
          value={post.frontmatter.date}
          onChange={(e) => handleInputChange("date", e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Categories"
          value={post.frontmatter.categories.join(", ")}
          onChange={(e) =>
            handleInputChange(
              "categories",
              e.target.value.split(",").map((c) => c.trim())
            )
          }
          fullWidth
        />
        <TextField
          label="Tags"
          value={post.frontmatter.tags.join(", ")}
          onChange={(e) =>
            handleInputChange(
              "tags",
              e.target.value.split(",").map((t) => t.trim())
            )
          }
          fullWidth
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {slug ? "Save" : "Create"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default PostsForm;
