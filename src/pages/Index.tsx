import { Navbar } from "@/components/Navbar";
import { RoomCard } from "@/components/RoomCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const featuredRooms = [
    {
      title: "Modern Studio near PayPal Office",
      location: "Austin, TX",
      price: "$1,200/month",
      duration: "3 months",
      image: "/placeholder.svg",
    },
    {
      title: "Cozy Room in Tech District",
      location: "San Francisco, CA",
      price: "$2,000/month",
      duration: "6 months",
      image: "/placeholder.svg",
    },
    {
      title: "Shared Apartment near Google",
      location: "Mountain View, CA",
      price: "$1,500/month",
      duration: "3 months",
      image: "/placeholder.svg",
    },
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "Product Manager Intern",
      company: "PayPal",
      quote: "Found my perfect room in Austin within a week!",
      image: "/placeholder.svg",
    },
    {
      name: "Sarah Chen",
      role: "Software Engineer Intern",
      company: "Google",
      quote: "The community aspect made my internship experience so much better.",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Find Your Perfect Intern Housing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with other interns, find housing near your workplace, and make the most of your internship experience.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Browse Available Rooms
          </Button>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((room, index) => (
              <RoomCard key={index} {...room} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">What Interns Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Room?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of interns who found their perfect housing through StayIntern.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;