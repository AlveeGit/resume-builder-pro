//  TemplateEU.tsx

import { ResumeData } from "@/types/resume";

export function TemplateEU({ data }: { data: ResumeData }) {
  const p = data.personal;

  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        background: "#fff",
        fontFamily: "Inter, sans-serif",
        color: "#111",
        display: "flex",
      }}
    >
      {/* LEFT SIDEBAR */}
      <div
        style={{
          width: "32%",
          background: "#f3f4f6",
          padding: "24px",
        }}
      >
        {/* PHOTO */}
        {p?.photo && (
          <img
            src={p.photo}
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: 16,
            }}
          />
        )}

        <h3 style={title}>Contact</h3>
        <p style={text}>{p?.email}</p>
        <p style={text}>{p?.phone}</p>
        <p style={text}>{p?.location}</p>
        <p style={text}>{p?.linkedin}</p>

        {/* SKILLS */}
        <h3 style={title}>Skills</h3>
        {data.skills?.map((s) => (
          <p key={s.id} style={text}>
            • {s.name}
          </p>
        ))}

        {/* LANGUAGES */}
        <h3 style={title}>Languages</h3>
        {data.languages?.map((l) => (
          <p key={l.id} style={text}>
            {l.language} ({l.proficiency})
          </p>
        ))}
      </div>

      {/* RIGHT MAIN */}
      <div style={{ width: "68%", padding: "28px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>{p?.name}</h1>

        {/* SUMMARY */}
        {data.summary && (
          <Section title="Profile">
            <p style={para}>{data.summary}</p>
          </Section>
        )}

        {/* EXPERIENCE */}
        <Section title="Experience">
          {data.experience?.map((e) => (
            <div key={e.id} style={{ marginBottom: 12 }}>
              <b>
                {e.jobTitle} — {e.company}
              </b>
              <div style={meta}>
                {e.startDate} - {e.current ? "Present" : e.endDate}
              </div>
              {e.bullets?.map((b, i) => (
                <p key={i} style={bullet}>
                  • {b}
                </p>
              ))}
            </div>
          ))}
        </Section>

        {/* EDUCATION */}
        <Section title="Education">
          {data.education?.map((e) => (
            <div key={e.id}>
              <b>
                {e.degree} — {e.institution}
              </b>
              <p style={meta}>{e.field}</p>
            </div>
          ))}
        </Section>
      </div>
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
    <div style={{ marginTop: 18 }}>
      <h3 style={sectionTitle}>{title}</h3>
      {children}
    </div>
  );
}

const title = { fontSize: 13, fontWeight: 700, marginTop: 16 };
const text = { fontSize: 12, marginTop: 4 };
const para = { fontSize: 12, lineHeight: 1.5 };
const meta = { fontSize: 11, color: "#555" };
const bullet = { fontSize: 12 };
const sectionTitle = {
  fontSize: 12,
  fontWeight: 700,
  borderBottom: "1px solid #ddd",
  paddingBottom: 4,
};