import { RippleGridBackground } from "@/components/reactbits-background"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Quote } from 'lucide-react'

export const metadata = {
  title: "Testimonials - Zi's Portfolio",
  description: "What clients and colleagues say about working with me.",
}

const testimonials = [
  {
    quote: "Working with Zi was an absolute pleasure. Their attention to detail and ability to bring creative visions to life is unmatched. Our project was delivered ahead of schedule with exceptional quality.",
    name: "Sarah Chen",
    title: "CEO at TechStart",
    company: "TechStart",
  },
  {
    quote: "Zi delivered our project ahead of schedule with exceptional quality. Their technical expertise and communication skills are outstanding. I highly recommend them for any web development project.",
    name: "Michael Rodriguez",
    title: "Product Manager at InnovateCo",
    company: "InnovateCo",
  },
  {
    quote: "The level of professionalism and creativity Zi brings to every project is remarkable. They not only met our requirements but exceeded our expectations in every way.",
    name: "Emily Johnson",
    title: "Creative Director at DesignHub",
    company: "DesignHub",
  },
  {
    quote: "Zi's ability to understand complex requirements and translate them into beautiful, functional designs is impressive. They're a true professional and a joy to work with.",
    name: "David Park",
    title: "CTO at StartupXYZ",
    company: "StartupXYZ",
  },
  {
    quote: "I've worked with many developers, but Zi stands out for their innovative approach and dedication to excellence. They consistently deliver high-quality work that exceeds expectations.",
    name: "Lisa Thompson",
    title: "Founder at WebWorks",
    company: "WebWorks",
  },
  {
    quote: "Zi is not just a developer, but a problem solver who brings valuable insights to every project. Their work has significantly improved our product and user experience.",
    name: "James Wilson",
    title: "Head of Product at AppCo",
    company: "AppCo",
  },
]

export default function TestimonialsPage() {
  return (
    <div className="relative">
      <RippleGridBackground />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 max-w-7xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Badge>Testimonials</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Client Feedback
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Hear what clients and colleagues have to say about working with me.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="transition-all hover:shadow-lg hover:border-primary/20">
                <CardHeader>
                  <Quote className="h-8 w-8 text-primary/20" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
