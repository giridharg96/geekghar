import { Navbar } from "@/components/Navbar";
import { RoomCard } from "@/components/RoomCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);

  useEffect(() => {
    const fetchFeaturedRooms = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .limit(3);
      
      if (!error && data) {
        setFeaturedRooms(data);
      }
    };

    fetchFeaturedRooms();
  }, []);

  const testimonials = [
    {
      name: "John Smith",
      role: "Product Manager Intern",
      company: "PayPal",
      quote: "Found my perfect room in Austin within a week! The platform made it incredibly easy to connect with other interns.",
      image: "/placeholder.svg",
    },
    {
      name: "Sarah Chen",
      role: "Software Engineer Intern",
      company: "Google",
      quote: "The community aspect made my internship experience so much better. I found great roommates through the platform.",
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
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 border rounded-md p-3">
                <MapPin className="text-primary" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full outline-none"
                />
              </div>
              <div className="flex items-center gap-2 border rounded-md p-3">
                <Calendar className="text-primary" />
                <input
                  type="text"
                  placeholder="Duration"
                  className="w-full outline-none"
                />
              </div>
              <div className="flex items-center gap-2 border rounded-md p-3">
                <DollarSign className="text-primary" />
                <input
                  type="text"
                  placeholder="Budget"
                  className="w-full outline-none"
                />
              </div>
              <Button className="w-full">
                <Search className="mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((room: any) => (
              <RoomCard
                key={room.id}
                title={room.title}
                location={JSON.parse(room.location).city}
                price={`$${room.price_per_month}/month`}
                duration={room.stay_length}
                image="/placeholder.svg"
              />
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