import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  hint: string;
}

export default function TeamMemberCard({ name, role, image, hint }: TeamMemberCardProps) {
  return (
    <Card className="text-center overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="aspect-square relative">
          <Image
            src={image}
            alt={`Portrait of ${name}`}
            fill
            className="object-cover object-top"  // Ensures face is near the top part
            data-ai-hint={hint}
            priority
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col p-4">
        <h3 className="font-bold text-lg font-headline">{name}</h3>
        <p className="text-sm text-primary">{role}</p>
      </CardFooter>
    </Card>
  );
}
