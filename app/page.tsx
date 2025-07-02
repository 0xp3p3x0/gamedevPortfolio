"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, ExternalLink, Play, Code, Gamepad2, Zap, Palette, Cpu } from "lucide-react"

export default function GameDevPortfolio() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const skills = [
    { name: "HTML5 Canvas", level: 95, icon: Code },
    { name: "JavaScript/TypeScript", level: 90, icon: Zap },
    { name: "Unity/Phaser", level: 90, icon: Zap },
    { name: "React.js/Vue.js", level: 90, icon: Zap },
    { name: "WebGL/Three.js", level: 85, icon: Cpu },
    { name: "Game Design", level: 88, icon: Gamepad2 },
    { name: "UI/UX Design", level: 82, icon: Palette },
    { name: "Physics Engines", level: 78, icon: Cpu },
  ]

  const projects = [
    {
      title: "Space Explorer",
      description:
        "A 2D space exploration game built with HTML5 Canvas and JavaScript. Features procedural generation, physics simulation, and particle effects.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["HTML5 Canvas", "JavaScript", "Web Audio API"],
      demoUrl: "#",
      codeUrl: "#",
      featured: true,
    },
    {
      title: "Puzzle Master",
      description:
        "An engaging puzzle game with 50+ levels, smooth animations, and responsive design. Built using modern web technologies.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["TypeScript", "CSS3 Animations", "Local Storage"],
      demoUrl: "#",
      codeUrl: "#",
      featured: true,
    },
    {
      title: "Racing Championship",
      description:
        "A fast-paced racing game with realistic physics, multiple tracks, and multiplayer support using WebRTC.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["WebGL", "Three.js", "WebRTC", "Socket.io"],
      demoUrl: "#",
      codeUrl: "#",
      featured: false,
    },
    {
      title: "Tower Defense Pro5",
      description: "Strategic tower defense game with AI enemies, upgrade systems, and beautiful particle effects.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["HTML5 Canvas", "ES6+", "Web Workers"],
      demoUrl: "#",
      codeUrl: "#",
      featured: false,
    },
    {
      title: "Tower Defense Pro4",
      description: "Strategic tower defense game with AI enemies, upgrade systems, and beautiful particle effects.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["HTML5 Canvas", "ES6+", "Web Workers"],
      demoUrl: "#",
      codeUrl: "#",
      featured: false,
    },
    {
      title: "Tower Defense Pro3",
      description: "Strategic tower defense game with AI enemies, upgrade systems, and beautiful particle effects.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["HTML5 Canvas", "ES6+", "Web Workers"],
      demoUrl: "#",
      codeUrl: "#",
      featured: false,
    },
    {
      title: "Tower Defense Pro2",
      description: "Strategic tower defense game with AI enemies, upgrade systems, and beautiful particle effects.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["HTML5 Canvas", "ES6+", "Web Workers"],
      demoUrl: "#",
      codeUrl: "#",
      featured: false,
    },
    {
      title: "Tower Defense Pro1",
      description: "Strategic tower defense game with AI enemies, upgrade systems, and beautiful particle effects.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["HTML5 Canvas", "ES6+", "Web Workers"],
      demoUrl: "#",
      codeUrl: "#",
      featured: false,
    },

  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">{"Hiroshi Tanabe"}</div>
            <div className="hidden md:flex space-x-8">
              {["hero", "about", "skills", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section ? "text-purple-400" : "text-white hover:text-purple-300"
                  }`}
                >
                  {section === "hero" ? "Home" : section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              HTML5 Game
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {" "}
                Developer
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay">
              Creating immersive web-based gaming experiences with cutting-edge technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Play className="mr-2 h-5 w-5" />
                View My Games
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <p className="text-gray-300 text-lg mb-6">
                  I'm a passionate HTML5 game developer with over 5 years of experience creating engaging web-based
                  games. I specialize in browser games, interactive experiences, and educational gaming applications.
                </p>
                <p className="text-gray-300 text-lg mb-6">
                  My expertise spans from 2D canvas games to complex 3D WebGL experiences. I love pushing the boundaries
                  of what's possible in the browser and creating games that are both fun and technically impressive.
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="border-purple-400 text-purple-400 bg-transparent">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm" className="border-purple-400 text-purple-400 bg-transparent">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Gamepad2 className="w-32 h-32 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Skills & Technologies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon
                return (
                  <Card key={skill.name} className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-600/20 rounded-lg">
                          <IconComponent className="w-6 h-6 text-purple-400" />
                        </div>
                        <CardTitle className="text-white text-lg">{skill.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Proficiency</span>
                          <span className="text-purple-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Featured Games</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {projects
                .filter((project) => project.featured)
                .map((project, index) => (
                  <Card
                    key={project.title}
                    className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-4">
                          <Button size="sm" asChild className="bg-purple-600 hover:bg-purple-700">
                            <a href={`/play?id=${index}`}> 
                              <Play className="mr-2 h-4 w-4" />
                              Play
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                          >
                            <Code className="mr-2 h-4 w-4" />
                            Code
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-white text-xl">{project.title}</CardTitle>
                      <CardDescription className="text-gray-300">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-purple-600/20 text-purple-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <h3 className="text-2xl font-bold text-white text-center mb-8">Other Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects
                .filter((project) => !project.featured)
                .map((project, index) => (
                  <Card
                    key={project.title}
                    className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 flex-1">
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Demo
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-400 text-purple-400 bg-transparent"
                        >
                          <Github className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Let's Work Together</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                <p className="text-gray-300 text-lg mb-8">
                  I'm always interested in new opportunities and exciting projects. Whether you need a custom game,
                  interactive experience, or technical consultation, let's discuss how we can bring your vision to life.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">hello@gamedev.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">github.com/gamedev</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">linkedin.com/in/gamedev</span>
                  </div>
                </div>
              </div>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Send a Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={4}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black/40 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 HTML5 Game Developer. Built with passion for gaming and web technologies.
          </p>
        </div>
      </footer>
    </div>
  )
}
