import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          StayIntern
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/channels">
              <MessageSquare className="mr-2 h-4 w-4" />
              Channels
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/rooms">Find Rooms</Link>
          </Button>
          <Button variant="ghost">List Property</Button>
          <Button>Sign In</Button>
        </div>
      </div>
    </nav>
  );
};