"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Pencil, Trash2, Plus } from 'lucide-react'
import Link from "next/link"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image?: string
  author?: string
  published: boolean
  category?: string
  tags?: string[]
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const emptyPost: Partial<BlogPost> = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    published: false,
    category: '',
    tags: []
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog')
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!editingPost) return

    try {
      const url = editingPost.id 
        ? `/api/admin/blog/${editingPost.id}` 
        : '/api/admin/blog'
      
      const method = editingPost.id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPost)
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: `Blog post ${editingPost.id ? 'updated' : 'created'} successfully`
        })
        setEditingPost(null)
        setIsCreating(false)
        fetchPosts()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
      
      if (res.ok) {
        toast({
          title: "Success",
          description: "Blog post deleted successfully"
        })
        fetchPosts()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-12">Loading...</div>
  }

  if (isCreating || editingPost) {
    const post = editingPost || emptyPost as BlogPost

    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              {post.id ? 'Edit' : 'Create'} Blog Post
            </h1>
            <Button variant="outline" onClick={() => {
              setEditingPost(null)
              setIsCreating(false)
            }}>
              Cancel
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={post.title}
                  onChange={(e) => setEditingPost({ ...post, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={post.slug}
                  onChange={(e) => setEditingPost({ ...post, slug: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={post.excerpt}
                  onChange={(e) => setEditingPost({ ...post, excerpt: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content (HTML)</Label>
                <Textarea
                  id="content"
                  value={post.content}
                  onChange={(e) => setEditingPost({ ...post, content: e.target.value })}
                  rows={10}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={post.author || ''}
                    onChange={(e) => setEditingPost({ ...post, author: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={post.category || ''}
                    onChange={(e) => setEditingPost({ ...post, category: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={post.published}
                  onCheckedChange={(checked) => setEditingPost({ ...post, published: checked })}
                />
                <Label htmlFor="published">Published</Label>
              </div>

              <Button onClick={handleSave} className="w-full">
                Save Blog Post
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Blog Posts</h1>
            <p className="text-muted-foreground">Manage your blog content</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
            <Button onClick={() => {
              setEditingPost(emptyPost as BlogPost)
              setIsCreating(true)
            }}>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                    <div className="flex gap-2 mt-2">
                      {post.published ? (
                        <span className="text-xs bg-green-500/10 text-green-700 dark:text-green-400 px-2 py-1 rounded">Published</span>
                      ) : (
                        <span className="text-xs bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded">Draft</span>
                      )}
                      {post.category && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{post.category}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPost(post)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
