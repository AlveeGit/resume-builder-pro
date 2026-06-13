import { ResumeData } from "@/types/resume";

export function TemplateUK({ data }: { data: ResumeData }) {
  const p = data.personal;

  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        background: "white",
        color: "#111",
        padding: "40px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* TOP BORDER ACCENT */}
      <div
        style={{
          height: "4px",
          background: "#2563eb",
          marginBottom: "16px",
        }}
      />

      {/* NAME */}
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 700,
          marginBottom: "6px",
        }}
      >
        {p?.name || "Your Name"}
      </h1>

      {/* CONTACT LINE */}
      <p
        style={{
          fontSize: "12px",
          color: "#444",
          marginBottom: "20px",
        }}
      >
        {[p?.email, p?.phone, p?.location, p?.linkedin]
          .filter(Boolean)
          .join(" • ")}
      </p>

      {/* SUMMARY */}
      {data.summary && (
        <Section title="Profile Summary">
          <p style={textStyle}>{data.summary}</p>
        </Section>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <Section title="Experience">
          {data.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 600 }}>
                {exp.jobTitle} — {exp.company}
              </div>

              <div style={metaStyle}>
                {exp.location} • {exp.startDate} -{" "}
                {exp.current ? "Present" : exp.endDate}
              </div>

              <ul style={ulStyle}>
                {exp.bullets?.map((b, i) => (
                  <li key={i} style={liStyle}>
                    • {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <Section title="Education">
          {data.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600 }}>
                {edu.degree} — {edu.institution}
              </div>
              <div style={metaStyle}>
                {edu.field} • {edu.startYear} - {edu.endYear}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <Section title="Skills">
          <p style={textStyle}>{data.skills.map((s) => s.name).join(" • ")}</p>
        </Section>
      )}

      {/* LANGUAGES */}
      {data.languages?.length > 0 && (
        <Section title="Languages">
          <p style={textStyle}>
            {data.languages
              .map((l) => `${l.language} (${l.proficiency})`)
              .join(" • ")}
          </p>
        </Section>
      )}
    </div>
  );
}

/* ----------------------------
   SECTION WRAPPER
-----------------------------*/
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h2
        style={{
          fontSize: 12,
          fontWeight: 700,
          textTransform: "uppercase",
          borderBottom: "1px solid #ddd",
          paddingBottom: 4,
          marginBottom: 8,
          letterSpacing: 1,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ----------------------------
   STYLES
-----------------------------*/
const textStyle = {
  fontSize: 12,
  lineHeight: 1.5,
  color: "#222",
};

const metaStyle = {
  fontSize: 11,
  color: "#555",
  marginTop: 2,
};

const ulStyle = {
  marginTop: 6,
  paddingLeft: 14,
};

const liStyle = {
  fontSize: 12,
  marginBottom: 2,
};
