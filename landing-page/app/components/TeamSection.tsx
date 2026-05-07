import ImageGallery from "./ImageGallery";
import SectionWrapper from "./SectionWrapper";

const TEAM_PHOTOS = [
  { src: "/images/dev-team.png",   alt: "Development team 1" },
  { src: "/images/dev-team-2.png", alt: "Development team 2" },
];

const TEAM_MEMBERS = [
  {
    name: "Jacob Berger",
    roles: ["Project Manager", "AI Engineer", "Full Stack Engineer"],
    linkedin: "https://www.linkedin.com/in/jacob-berger-3b5b78258/",
  },
  {
    name: "Anthony Kung",
    roles: ["AI Engineer"],
    linkedin: "https://www.linkedin.com/in/anthonykung/",
  },
  {
    name: "Brian Phan",
    roles: ["Full Stack Engineer", "Cameraman", "Video Editor"],
    linkedin: "https://www.linkedin.com/in/brphan/",
    email: "xuanbach1307@gmail.com"
  },
  {
    name: "Marcus Tin",
    roles: ["Full Stack Engineer", "Pitch Deck"],
    linkedin: "https://www.linkedin.com/in/marcustin/",
  },
];

export default function TeamSection() {
  return (
    <SectionWrapper id="team" title="Development Team">

      <div className="w-full max-w-6xl mb-12">
        <ImageGallery images={TEAM_PHOTOS} />
      </div>

      <div className="grid grid--2col w-full max-w-6xl gap-6">
        {TEAM_MEMBERS.map((member, idx) => (
          <a
            key={idx}
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="panel__card fadeIn"
          >
            <h3 className="text-(--ink) text-[1.2rem] font-600">
              {member.name}
            </h3>
            {
              member.email ?
                <p>Email: {member.email}</p> :
                null
            }
            <p className="mb-3">LinkedIn</p>
            <div className="flex flex-wrap gap-2">
              {member.roles.map((role, roleIdx) => (
                <span key={roleIdx} className="status-pill status-pill--idle">
                  {role}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
