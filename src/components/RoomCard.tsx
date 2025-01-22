import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoomCardProps {
  title: string;
  location: string;
  price: string;
  duration: string;
  image: string;
}

export const RoomCard = ({ title, location, price, duration, image }: RoomCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground mb-2">{location}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{price}</span>
          <Badge variant="secondary">{duration}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};