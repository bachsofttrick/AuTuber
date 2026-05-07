import SectionWrapper from "./SectionWrapper";

export default function DemoSection() {
  return (
    <SectionWrapper id="demo" title="Demo">
      <div className="w-full max-w-4xl">
        <div className="panel fadeIn">
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%",
            }}
          >
            <iframe
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              width="560"
              height="315"
              src="https://www.youtube.com/embed/twF145Klzwg?si=RvE6lGYx9qNl3M2y"
              title="AuTuber: AI stage hand for VTubers"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
