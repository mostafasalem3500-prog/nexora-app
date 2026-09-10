export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <section
      className="relative overflow-hidden pt-40 pb-16"
      style={{
        background:
          "radial-gradient(ellipse 500px 300px at 90% 0%, rgba(42,92,255,.16), transparent 60%), var(--bg-deep)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(231,236,245,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(231,236,245,.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1240px] px-6">
        {eyebrow && <div className="text-brand-teal font-semibold mb-3">{eyebrow}</div>}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl">{title}</h1>
        {lead && <p className="text-ink-muted text-lg max-w-2xl">{lead}</p>}
      </div>
    </section>
  );
}
