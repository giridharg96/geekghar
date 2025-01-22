import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          StayIntern
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost">Find Rooms</Button>
          <Button variant="ghost">List Property</Button>
          <Button>Sign In</Button>
        </div>
      </div>
    </nav>
  );
};