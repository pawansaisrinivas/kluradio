import TeamMemberCard from "@/components/team/TeamMemberCard";
import { Users, GraduationCap } from "lucide-react";

const heads = [
  { name: "Pawan Sai Srinivas", role: "Station Head", image: "/images/pawan.jpeg" },
  { name: "M P Sri Ramya", role: "RJ Head", image: "/images/ramya.jpg" },
  { name: "Shaik Mohammad Junaid", role: "Technical Head", image: "/images/junaid.jpg" },
  { name: "Manikanta", role: "Creative Head", image: "/images/manikanta.jpg" },
  { name: "BhanuPrakash", role: "Broadcasting Head", image: "/images/bhanu.jpeg" },
  { name: "Navya Sukrutha", role: "Designing Head", image: "/images/navya.jpg" },
  { name: "Baba Charan", role: "Designing Head", image: "/images/charan.png" },
  { name: "B Phanindra", role: "PR Head", image: "/images/phani.jpg" },
  { name: "Hari", role: "Marketing Head", image: "/images/hari.png" },
  { name: "Anurag Kaushal", role: "Video Editing Head", image: "/images/anurag.jpg" },
];

const faculty = [
  { name: "Dr. M Shiva Kumar", role: "Faculty Professor In-Charge", image: "/images/msk.jpg" },
];


export default function TeamPage() {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Meet the Team</h1>
        <p className="mt-4 text-lg text-muted-foreground">The voices and minds behind KL Radio.</p>
      </div>
      
      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-8 flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-primary"/>
            Our Heads
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {heads.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </section>

        <section>
          <h2 className="text-3xl font-bold font-headline text-center mb-8 flex items-center justify-center gap-3">
            <GraduationCap className="w-8 h-8 text-primary"/>
            Faculty In-Charge
          </h2>
          <div className="flex justify-center">
            {faculty.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </section>
      </div>
  );
}
