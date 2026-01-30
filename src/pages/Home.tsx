import { Hero } from "../components/sections/Hero";
import { FeaturedWorks } from "../components/sections/FeaturedWorks";
import { SkillMatrix } from "../components/sections/SkillMatrix";
import { ContactCTA } from "../components/sections/ContactCTA";

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <FeaturedWorks />
      <SkillMatrix />
      <ContactCTA />
    </div>
  );
}
