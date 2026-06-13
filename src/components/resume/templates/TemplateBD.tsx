// TemplateBD.tsx

import { ResumeData } from "@/types/resume";

export function TemplateBD({ data }: { data: ResumeData }) {
  const p = data.personal;

  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        background: "#fff",
        fontFamily: "Inter, sans-serif",
        color: "#111",
        padding: 32,
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", position: "relative" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>{p?.name}</h1>

        <p style={{ fontSize: 12 }}>
          {p?.email} • {p?.phone} • {p?.location}
        </p>

        {/* PHOTO TOP RIGHT */}
        {p?.photo && (
          <img
            src={p.photo}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 90,
              height: 90,
              objectFit: "cover",
              border: "1px solid #ddd",
            }}
          />
        )}
      </div>

      {/* PERSONAL DETAILS */}
      <Section title="Personal Information">
        <p>Father's Name: {data.fathersName}</p>
        <p>Mother's Name: {data.mothersName}</p>
        <p>Date of Birth: {data.dob}</p>
        <p>Religion: {data.religion}</p>
        <p>Nationality: {data.nationality}</p>
        <p>NID: {data.nid}</p>
        <p>Marital Status: {data.maritalStatus}</p>
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience">
        {data.experience?.map((e) => (
          <div key={e.id}>
            <b>
              {e.jobTitle} — {e.company}
            </b>
            <p>{e.location}</p>
            <p>
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

      {/* REFERENCES */}
      <Section title="References">
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          {data.references?.map((r) => (
            <div key={r.id}>
              <b>{r.name}</b>
              <p>{r.title}</p>
              <p>{r.organization}</p>
              <p>{r.email}</p>
              <p>{r.phone}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DECLARATION */}
      <Section title="Declaration">
        <p>{data.declaration}</p>
        <p style={{ marginTop: 30 }}>_____________________</p>
        <p>Signature</p>
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
    <div style={{ marginTop: 20 }}>
      <h2 style={{ borderBottom: "1px solid #000", fontSize: 13 }}>{title}</h2>
      <div style={{ marginTop: 8 }}>{children}</div>
    </div>
  );
}