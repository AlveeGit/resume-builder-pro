// TemplateInternational.tsx
import { ResumeData } from "@/types/resume";

export function TemplateInternational({ data }: { data: ResumeData }) {
  const p = data.personal;

  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        background: "#fff",
        fontFamily: "Inter, sans-serif",
        color: "#111",
        padding: 30,
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 26, fontWeight: 700 }}>{p?.name}</h1>

        <div style={{ fontSize: 11, textAlign: "right" }}>
          <p>{p?.email}</p>
          <p>{p?.phone}</p>
          <p>{p?.location}</p>
        </div>
      </div>

      {/* SUMMARY */}
      {data.summary && (
        <Section title="Summary">
          <p style={text}>{data.summary}</p>
        </Section>
      )}

      {/* EXPERIENCE */}
      <Section title="Experience">
        {data.experience?.map((e) => (
          <div key={e.id} style={{ marginBottom: 10 }}>
            <b>
              {e.jobTitle} — {e.company}
            </b>
            <p style={meta}>
              {e.startDate} - {e.current ? "Present" : e.endDate}
            </p>
            {e.bullets?.map((b, i) => (
              <p key={i}>• {b}</p>
            ))}
          </div>
        ))}
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        {data.education?.map((e) => (
          <p key={e.id}>
            {e.degree} — {e.institution}
          </p>
        ))}
      </Section>

      {/* SKILLS */}
      <Section title="Skills">
        <p>{data.skills?.map((s) => s.name).join(" • ")}</p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginTop: 14 }}>
      <h2
        style={{
          fontSize: 12,
          fontWeight: 700,
          borderBottom: "1px solid #ccc",
        }}
      >
        {title}
      </h2>
      <div style={{ marginTop: 6 }}>{children}</div>
    </div>
  );
}

const text = { fontSize: 12, lineHeight: 1.4 };
const meta = { fontSize: 11, color: "#555" };
