import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

export const TestimonialCard = ({ name, role, company, quote, image }: TestimonialCardProps) => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg mb-4 italic">{quote}</p>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-muted-foreground">
                {role} at {company}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};