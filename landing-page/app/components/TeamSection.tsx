import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

const TEAM_MEMBERS = [
  {
    name: "Jacob Berger",
    roles: ["Project Manager", "AI Engineer", "Full Stack Engineer"],
  },
  {
    name: "Anthony Kung",
    roles: ["AI Engineer"],
  },
  {
    name: "Brian Phan",
    roles: ["Full Stack Engineer", "Cameraman", "Video Editor"],
  },
  {
    name: "Marcus Tin",
    roles: ["Full Stack Engineer", "Pitch Deck"],
  },
];

export default function TeamSection() {
  return (
    <SectionWrapper id="team" title="Development Team">

      <div className="w-full max-w-6xl mb-12">
        <div className="relative w-full aspect-video">
          <Image
            src="/images/dev-team.png"
            alt="Development team"
            fill
            className="object-cover rounded-[28px]"
          />
        </div>
      </div>

      <div className="grid grid--2col w-full max-w-6xl gap-6">
        {TEAM_MEMBERS.map((member, idx) => (
          <div key={idx} className="panel__card fadeIn">
            <h3 className="text-(--ink) mb-3 text-[1.2rem] font-600">
              {member.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {member.roles.map((role, roleIdx) => (
                <span key={roleIdx} className="status-pill status-pill--idle">
                  {role}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
