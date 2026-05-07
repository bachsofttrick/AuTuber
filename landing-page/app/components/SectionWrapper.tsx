export default function SectionWrapper({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="px-[clamp(24px,6vw,72px)] py-4 flex flex-col items-center border-t border-(--divider)"
    >
      <span className="eyebrow">{title}</span>
      {children}
    </section>
  );
}
