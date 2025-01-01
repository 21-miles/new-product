'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { DataGrid } from '@mui/x-data-grid'

// Component Imports
import React, { useEffect, useState } from 'react'

const fetchPostsData = async () => {
  const res = await fetch('http://localhost:4040/posts', {
    method: 'GET'
  })
  if (!res.ok) {
    throw new Error('Failed to fetch posts data')
  }
  const data = await res.json()
  console.log('Fetched posts data:', data) // Log the fetched data
  return data
}

const PostsPage = () => {
  console.log('PostsPage>>>>>>>>>>')

  interface Post {
    slug: string
    frontmatter: {
      title: string
      author: string
      date: string
      categories: string[]
      tags: string[]
    }
  }

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPostsData()
        setPosts(data.posts)
        console.log('Set posts data:', data.posts) // Log the data being set
      } catch (error) {
        console.error('Error fetching posts data:', error)
      }
    }
    getData()
  }, [])

  const columns = [
    { field: 'slug', headerName: 'Slug', width: 200 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'author', headerName: 'Author', width: 150 },
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'categories', headerName: 'Categories', width: 200 },
    { field: 'tags', headerName: 'Tags', width: 200 }
  ]

  const rows = posts.map((post, index) => ({
    id: index,
    slug: post.slug,
    title: post.frontmatter.title,
    author: post.frontmatter.author,
    date: post.frontmatter.date,
    categories: post.frontmatter.categories.join(', '),
    tags: post.frontmatter.tags.join(', ')
  }))
  console.log('posts::::::::', posts)

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} checkboxSelection />
    </Paper>
  )
}

export default PostsPage
