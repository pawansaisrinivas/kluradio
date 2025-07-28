import TeamMemberCard from "@/components/team/TeamMemberCard";
import { Users, Star, GraduationCap } from "lucide-react";

const heads = [
  { name: "Pawan Sai Srinivas", role: "Station Head", image: "/images/pawan_sai_srinivas.png", hint: "person portrait" },
  { name: "M P Sri Ramya", role: "RJ Head", image: "/images/mp_sri_ramya.png", hint: "person smiling" },
  { name: "Shaik Mohammad Junaid", role: "Technical Head", image: "/images/shaik_mohammad_junaid.png", hint: "man glasses" },
  { name: "Manikanta", role: "Creative Head", image: "/images/manikanta.png", hint: "woman leader" },
  { name: "BhanuPrakash", role: "Broadcasting Head", image: "/images/bhanuprakash.png", hint: "man engineer" },
  { name: "Navya Sukrutha", role: "Designing Head", image: "/images/navya_sukrutha.png", hint: "woman planner" },
  { name: "B Phanindra", role: "PR Head", image: "/images/b_phanindra.png", hint: "writer thinking" },
  { name: "Hari", role: "Marketing Head", image: "/images/hari.png", hint: "writer thinking" },
  { name: "Anurag Kaushal", role: "Video Editing Head", image: "/images/anurag_kaushal.png", hint: "writer thinking" },

];

// const advisors = [
//   { name: "Dr. Evelyn Reed", role: "Media Advisor", image: "https://placehold.co/400x400", hint: "professional woman" },
//   { name: "Mr. Samuel Carter", role: "Technical Advisor", image: "https://placehold.co/400x400", hint: "professional man" },
// ];

const faculty = [
  { name: "Dr. M Shiva Kumar", role: "Faculty Professor In-Charge", image: "/images/m_shiva_kumar.png", hint: "professor woman" },
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

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
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
        </section> */}

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
