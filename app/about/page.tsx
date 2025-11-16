import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Heart } from 'lucide-react'

export const metadata = {
  title: "About Me - Zi's Portfolio",
  description: "Learn more about my background, experience, and what drives me as a developer.",
}

export default function AboutPage() {
  return (
    <div className="relative">
      <RippleGridBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="mx-auto max-w-4xl space-y-16">
          {/* Header */}
          <div className="space-y-4">
            <Badge>About Me</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Hi, I'm Zi
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A passionate web developer and designer dedicated to creating exceptional
              digital experiences that make a difference.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>My Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I've been building for the web for over 5 years, combining technical
                  expertise with creative problem-solving to deliver outstanding results.
                  My passion lies in creating user-centric designs that are not only
                  beautiful but also functional and accessible.
                </p>
                <p>
                  I believe that great design is about more than just aesthetics—it's about
                  creating experiences that solve real problems and delight users. Every
                  project is an opportunity to learn something new and push the boundaries
                  of what's possible.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing
                  to open source projects, or sharing my knowledge through blog posts and
                  tutorials.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    5+ years of professional experience building web applications
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MapPin className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Based in San Francisco, working with clients worldwide
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Passion</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Creating beautiful, accessible, and user-friendly experiences
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
