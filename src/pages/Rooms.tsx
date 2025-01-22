import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { RoomCard } from "@/components/RoomCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Calendar, DollarSign, Search } from "lucide-react";

const Rooms = () => {
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const rooms = [
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
    {
      title: "Downtown Loft near Meta",
      location: "Seattle, WA",
      price: "$1,800/month",
      duration: "4 months",
      image: "/placeholder.svg",
    },
    {
      title: "Student Housing near Microsoft",
      location: "Redmond, WA",
      price: "$1,300/month",
      duration: "6 months",
      image: "/placeholder.svg",
    },
    {
      title: "Tech Hub Apartment",
      location: "San Jose, CA",
      price: "$1,700/month",
      duration: "3 months",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">Find Your Perfect Room</h1>
          
          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 border rounded-md p-3">
              <MapPin className="text-primary h-5 w-5" />
              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-0 focus-visible:ring-0"
              />
            </div>
            
            <div className="flex items-center gap-2 border rounded-md p-3">
              <Calendar className="text-primary h-5 w-5" />
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="border-0">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 months</SelectItem>
                  <SelectItem value="4">4 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 border rounded-md p-3">
              <DollarSign className="text-primary h-5 w-5" />
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="border-0">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000-1500">$1000 - $1500</SelectItem>
                  <SelectItem value="1500-2000">$1500 - $2000</SelectItem>
                  <SelectItem value="2000+">$2000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {rooms.map((room, index) => (
            <RoomCard key={index} {...room} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Rooms;