"use client"

import { useState } from "react"
import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email.",
        variant: "destructive",
      })
      return
    }
    if (step === 2 && !formData.subject) {
      toast({
        title: "Missing Subject",
        description: "Please provide a subject for your message.",
        variant: "destructive",
      })
      return
    }
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.message) {
      toast({
        title: "Missing Message",
        description: "Please provide a message.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setStep(4)
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    })
  }

  return (
    <div className="relative">
      <RippleGridBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <Badge>Contact</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6 lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Feel free to reach out through any of these channels.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <a
                        href="mailto:hello@zi.dev"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        hello@zi.dev
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Phone</div>
                      <a
                        href="tel:+1234567890"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Location</div>
                      <p className="text-sm text-muted-foreground">
                        San Francisco, CA
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="text-base">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I typically respond within 24-48 hours during business days.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {step === 4 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">Message Sent!</h3>
                        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                          Thank you for reaching out. I'll review your message and get back to you soon.
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setStep(1)
                          setFormData({ name: "", email: "", subject: "", message: "" })
                        }}
                        variant="outline"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Progress Indicator */}
                      <div className="flex items-center gap-2">
                        {[1, 2, 3].map((s) => (
                          <div
                            key={s}
                            className={`h-1.5 flex-1 rounded-full transition-all ${
                              s <= step ? "bg-primary" : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Step 1: Personal Info */}
                      {step === 1 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Your full name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 2: Subject */}
                      {step === 2 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject *</Label>
                            <Input
                              id="subject"
                              name="subject"
                              placeholder="What's this about?"
                              value={formData.subject}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 3: Message */}
                      {step === 3 && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="message">Message *</Label>
                            <Textarea
                              id="message"
                              name="message"
                              placeholder="Tell me more about your project or inquiry..."
                              value={formData.message}
                              onChange={handleInputChange}
                              rows={6}
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="flex gap-3">
                        {step > 1 && step < 4 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handlePrevStep}
                            className="flex-1"
                          >
                            Back
                          </Button>
                        )}
                        
                        {step < 3 ? (
                          <Button
                            type="button"
                            onClick={handleNextStep}
                            className="flex-1"
                          >
                            Next
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1"
                          >
                            {isSubmitting ? (
                              "Sending..."
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                              </>
                            )}
                          </Button>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground text-center">
                        Step {step} of 3
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
