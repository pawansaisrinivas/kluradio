import TeamMemberCard from "@/components/team/TeamMemberCard";
import { Users, Star, GraduationCap } from "lucide-react";

const heads = [
  { name: "Alex Johnson", role: "Station Head", image: "https://placehold.co/400x400", hint: "person portrait" },
  { name: "Brenda Smith", role: "Programming Head", image: "https://placehold.co/400x400", hint: "person smiling" },
  { name: "Charles Brown", role: "Music Head", image: "https://placehold.co/400x400", hint: "man glasses" },
  { name: "Diana Prince", role: "Marketing Head", image: "https://placehold.co/400x400", hint: "woman leader" },
  { name: "Ethan Hunt", role: "Technical Head", image: "https://placehold.co/400x400", hint: "man engineer" },
  { name: "Fiona Glenanne", role: "Events Head", image: "https://placehold.co/400x400", hint: "woman planner" },
  { name: "George King", role: "Content Head", image: "https://placehold.co/400x400", hint: "writer thinking" },
];

const advisors = [
  { name: "Dr. Evelyn Reed", role: "Media Advisor", image: "https://placehold.co/400x400", hint: "professional woman" },
  { name: "Mr. Samuel Carter", role: "Technical Advisor", image: "https://placehold.co/400x400", hint: "professional man" },
];

const faculty = [
  { name: "Prof. Harriet Winslow", role: "Faculty Professor In-Charge", image: "https://placehold.co/400x400", hint: "professor woman" },
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
            Our 7 Heads
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {heads.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <section>
          <h2 className="text-3xl font-bold font-headline text-center mb-8 flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-primary"/>
              Our Advisors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {advisors.map((member) => (
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
    </div>
  );
}
