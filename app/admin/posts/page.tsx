"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Pencil, Trash2, Plus, Upload, X, ImageIcon, Search } from 'lucide-react'
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image?: string
  section: string
  status: string
  meta?: Record<string, any>
  created_at?: string
  updated_at?: string
}

const SECTIONS = [
  { value: 'articles', label: 'Blog / Articles' },
  { value: 'product', label: 'Product Notes' },
  { value: 'portfolio', label: 'Case Studies' },
  { value: 'write', label: 'Writing' },
  { value: 'help', label: 'Guides & Tutorials' },
  { value: 'books', label: 'Books' },
  { value: 'podcasts', label: 'Podcasts' },
  { value: 'media', label: 'Media' },
  { value: 'cook', label: 'Recipes' },
  { value: 'dataprotection', label: 'Data Protection' },
]

const CATEGORIES = [
  'Technology', 'Design', 'Business', 'Health', 'Food', 'Travel',
  'Education', 'Entertainment', 'Science', 'Sports', 'Other'
]

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedSection, setSelectedSection] = useState('articles')
  const [searchTerm, setSearchTerm] = useState('')
  const [tagInput, setTagInput] = useState('')
  const { toast } = useToast()

  const emptyPost: Partial<Post> = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    section: selectedSection,
    status: 'draft',
    cover_image: '',
    meta: {
      category: '',
      tags: [],
      author: 'Ziyaad Ben Eydatoula',
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [selectedSection])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/posts?section=${selectedSection}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setPosts(Array.isArray(data) ? data : [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive"
      })
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const { url } = await res.json()
        if (editingPost) {
          setEditingPost({ ...editingPost, cover_image: url })
        }
        toast({
          title: "Success",
          description: "Image uploaded successfully"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  const handleAddTag = () => {
    if (!tagInput.trim() || !editingPost) return
    
    const tags = editingPost.meta?.tags || []
    if (!tags.includes(tagInput.trim())) {
      setEditingPost({
        ...editingPost,
        meta: {
          ...editingPost.meta,
          tags: [...tags, tagInput.trim()]
        }
      })
    }
    setTagInput('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    if (!editingPost) return
    const tags = editingPost.meta?.tags || []
    setEditingPost({
      ...editingPost,
      meta: {
        ...editingPost.meta,
        tags: tags.filter((tag: string) => tag !== tagToRemove)
      }
    })
  }

  const handleSave = async () => {
    if (!editingPost) return

    // Auto-generate slug from title if empty
    if (!editingPost.slug && editingPost.title) {
      editingPost.slug = editingPost.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    }

    try {
      const url = editingPost.id 
        ? `/api/admin/posts/${editingPost.id}` 
        : '/api/admin/posts'
      
      const res = await fetch(url, {
        method: editingPost.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPost)
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: `Post ${editingPost.id ? 'updated' : 'created'} successfully`
        })
        setEditingPost(null)
        setIsCreating(false)
        fetchPosts()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return

    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast({ title: "Success", description: "Post deleted" })
        fetchPosts()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete",
        variant: "destructive"
      })
    }
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (isCreating || editingPost) {
    const post = editingPost || { ...emptyPost, section: selectedSection } as Post

    return (
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              {post.id ? 'Edit' : 'Create'} {SECTIONS.find(s => s.value === post.section)?.label}
            </h1>
            <Button variant="outline" onClick={() => {
              setEditingPost(null)
              setIsCreating(false)
            }}>
              Cancel
            </Button>
          </div>

          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={post.title}
                      onChange={(e) => setEditingPost({ ...post, title: e.target.value })}
                      placeholder="Enter post title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={post.slug}
                      onChange={(e) => setEditingPost({ ...post, slug: e.target.value })}
                      placeholder="auto-generated-from-title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      value={post.excerpt}
                      onChange={(e) => setEditingPost({ ...post, excerpt: e.target.value })}
                      rows={3}
                      placeholder="Brief description..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content (HTML/Markdown) *</Label>
                    <Textarea
                      id="content"
                      value={post.content}
                      onChange={(e) => setEditingPost({ ...post, content: e.target.value })}
                      rows={15}
                      placeholder="Full post content..."
                      className="font-mono text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    {post.cover_image ? (
                      <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
                        <img
                          src={post.cover_image || "/placeholder.svg"}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setEditingPost({ ...post, cover_image: '' })}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <Label htmlFor="image-upload" className="cursor-pointer">
                          <div className="text-sm text-muted-foreground mb-2">
                            Click to upload or drag and drop
                          </div>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={uploading}
                          />
                          <Button variant="outline" disabled={uploading} asChild>
                            <span>
                              <Upload className="mr-2 h-4 w-4" />
                              {uploading ? 'Uploading...' : 'Upload Image'}
                            </span>
                          </Button>
                        </Label>
                      </div>
                    )}
                  </div>

                  {post.section === 'podcasts' && (
                    <div className="space-y-2">
                      <Label htmlFor="youtube_url">YouTube URL</Label>
                      <Input
                        id="youtube_url"
                        value={post.meta?.youtube_url || ''}
                        onChange={(e) => setEditingPost({
                          ...post,
                          meta: { ...post.meta, youtube_url: e.target.value }
                        })}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>
                  )}

                  {post.section === 'books' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="isbn">ISBN</Label>
                        <Input
                          id="isbn"
                          value={post.meta?.isbn || ''}
                          onChange={(e) => setEditingPost({
                            ...post,
                            meta: { ...post.meta, isbn: e.target.value }
                          })}
                          placeholder="978-0-xxx-xxxxx-x"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rating">Rating (1-5)</Label>
                        <Input
                          id="rating"
                          type="number"
                          min="1"
                          max="5"
                          step="0.1"
                          value={post.meta?.rating || ''}
                          onChange={(e) => setEditingPost({
                            ...post,
                            meta: { ...post.meta, rating: e.target.value }
                          })}
                        />
                      </div>
                    </>
                  )}

                  {post.section === 'cook' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="prep_time">Prep Time (minutes)</Label>
                        <Input
                          id="prep_time"
                          type="number"
                          value={post.meta?.prep_time || ''}
                          onChange={(e) => setEditingPost({
                            ...post,
                            meta: { ...post.meta, prep_time: e.target.value }
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cook_time">Cook Time (minutes)</Label>
                        <Input
                          id="cook_time"
                          type="number"
                          value={post.meta?.cook_time || ''}
                          onChange={(e) => setEditingPost({
                            ...post,
                            meta: { ...post.meta, cook_time: e.target.value }
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="servings">Servings</Label>
                        <Input
                          id="servings"
                          type="number"
                          value={post.meta?.servings || ''}
                          onChange={(e) => setEditingPost({
                            ...post,
                            meta: { ...post.meta, servings: e.target.value }
                          })}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metadata" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Select
                      value={post.section}
                      onValueChange={(value) => setEditingPost({ ...post, section: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SECTIONS.map(section => (
                          <SelectItem key={section.value} value={section.value}>
                            {section.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={post.meta?.category || ''}
                      onValueChange={(value) => setEditingPost({
                        ...post,
                        meta: { ...post.meta, category: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={post.meta?.author || ''}
                      onChange={(e) => setEditingPost({
                        ...post,
                        meta: { ...post.meta, author: e.target.value }
                      })}
                      placeholder="Ziyaad Ben Eydatoula"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        placeholder="Add tag and press Enter"
                      />
                      <Button type="button" onClick={handleAddTag} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(post.meta?.tags || []).map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-4">
                    <Switch
                      id="published"
                      checked={post.status === 'published'}
                      onCheckedChange={(checked) => setEditingPost({
                        ...post,
                        status: checked ? 'published' : 'draft'
                      })}
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              {post.id ? 'Update' : 'Create'} Post
            </Button>
            <Button variant="outline" onClick={() => {
              setEditingPost(null)
              setIsCreating(false)
            }}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Content Management</h1>
            <p className="text-muted-foreground">Manage all your content in one place</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Button onClick={() => {
              setEditingPost({ ...emptyPost, section: selectedSection } as Post)
              setIsCreating(true)
            }}>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedSection} onValueChange={setSelectedSection}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SECTIONS.map(section => (
                <SelectItem key={section.value} value={section.value}>
                  {section.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {searchTerm ? 'No posts found matching your search.' : 'No posts yet. Create your first one!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  {post.cover_image && (
                    <div className="w-full h-48 relative">
                      <img
                        src={post.cover_image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
                        <CardDescription className="line-clamp-2 mt-1">{post.excerpt}</CardDescription>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingPost(post)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                      {post.meta?.category && (
                        <Badge variant="outline">{post.meta.category}</Badge>
                      )}
                      {post.meta?.tags?.slice(0, 2).map((tag: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
