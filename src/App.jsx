import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/*
  Professional Resume Builder - single-file app
  Features:
  - Name, Email, Phone with Country code select
  - Multi-select Skills (add/remove)
  - Add/Edit/Delete multiple Experience & Education entries
  - Template switch (Classic / Modern / Minimal)
  - Dark mode toggle
  - Download PDF (captures preview)
  - Export JSON (save user data)
*/

const countryCodes = [
  { code: "+92", name: "Pakistan" },
  { code: "+91", name: "India" },
  { code: "+1", name: "USA" },
  { code: "+44", name: "UK" },
  { code: "+971", name: "UAE" },
];

const skillsList = [
  "React","Node.js","JavaScript","HTML","CSS","Python","Java","C++","SQL",
  "AWS","Docker","Kubernetes","ML","UI/UX Design","Photoshop","Illustrator",
  "Figma","SEO","Digital Marketing","Project Management","Data Analysis"
];

export default function App() {
  // Basic fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+92");
  const [phone, setPhone] = useState("");

  // Skills
  const [skills, setSkills] = useState([]);

  // Experience & Education arrays (objects for future expand)
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  // inputs for adding
  const [expInput, setExpInput] = useState("");
  const [eduInput, setEduInput] = useState("");

  // UI
  const [template, setTemplate] = useState("Classic");
  const [dark, setDark] = useState(false);

  // preview ref for pdf capture
  const previewRef = useRef(null);

  // handlers
  function addSkill(skill) {
    if (!skill) return;
    if (!skills.includes(skill)) setSkills([...skills, skill]);
  }
  function removeSkill(s) {
    setSkills(skills.filter((x) => x !== s));
  }

  function addExperience() {
    if (!expInput.trim()) return;
    setExperience([...experience, { id: Date.now(), text: expInput }]);
    setExpInput("");
  }
  function removeExperience(id) {
    setExperience(experience.filter((e) => e.id !== id));
  }

  function addEducation() {
    if (!eduInput.trim()) return;
    setEducation([...education, { id: Date.now(), text: eduInput }]);
    setEduInput("");
  }
  function removeEducation(id) {
    setEducation(education.filter((e) => e.id !== id));
  }

  // Download resume preview as PDF
  async function downloadPDF() {
    if (!previewRef.current) return;
    // render at higher scale for quality
    const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "px", format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save((name ? name.replace(/\s+/g, "_") : "resume") + ".pdf");
  }

  // Download JSON of data
  function downloadJSON() {
    const payload = { name, email, countryCode, phone, skills, experience, education, template };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (name ? name.replace(/\s+/g, "_") : "resume") + ".json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={dark ? "app dark" : "app"}>
      <header className="topbar">
        <h1>Resume Builder</h1>
        <div className="top-actions">
          <label className="switch">
            <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} />
            <span className="slider" />
          </label>
          <span className="small">{dark ? "Dark" : "Light"}</span>
        </div>
      </header>

      <main className="container">
        {/* Left form */}
        <section className="form">
          <h2>Enter Details</h2>

          <label>Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

          <label>Phone</label>
          <div className="row">
            <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
              {countryCodes.map((c) => <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}
            </select>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="123456789" />
          </div>

          {/* Skills */}
          <label>Skills</label>
          <div className="row">
            <select defaultValue="" onChange={(e) => addSkill(e.target.value)}>
              <option value="">Choose & Add skill</option>
              {skillsList.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="btn" onClick={() => { /* no-op, picks by select change */ }}>Add</button>
          </div>
          <div className="chips">
            {skills.map((s) => (
              <div key={s} className="chip">
                {s} <button onClick={() => removeSkill(s)} className="x">×</button>
              </div>
            ))}
          </div>

          {/* Experience */}
          <label>Experience (Add multiple)</label>
          <div className="row">
            <input value={expInput} onChange={(e) => setExpInput(e.target.value)} placeholder="e.g. Designer at ABC (2022 - Present) — Achievements..." />
            <button className="btn" onClick={addExperience}>Add</button>
          </div>
          <ul className="list">
            {experience.map((e) => (
              <li key={e.id}>
                {e.text}
                <button className="small-x" onClick={() => removeExperience(e.id)}>Remove</button>
              </li>
            ))}
          </ul>

          {/* Education */}
          <label>Education (Add multiple)</label>
          <div className="row">
            <input value={eduInput} onChange={(e) => setEduInput(e.target.value)} placeholder="e.g. Bachelor in Arts — University XYZ (2021)" />
            <button className="btn" onClick={addEducation}>Add</button>
          </div>
          <ul className="list">
            {education.map((e) => (
              <li key={e.id}>
                {e.text}
                <button className="small-x" onClick={() => removeEducation(e.id)}>Remove</button>
              </li>
            ))}
          </ul>

          {/* Template selector */}
          <label>Template</label>
          <select value={template} onChange={(e) => setTemplate(e.target.value)}>
            <option>Classic</option>
            <option>Modern</option>
            <option>Minimal</option>
          </select>

          <div className="form-actions">
            <button className="btn primary" onClick={downloadPDF}>Download PDF</button>
            <button className="btn" onClick={downloadJSON}>Export JSON</button>
            <button className="btn outline" onClick={() => {
              // reset
              setName(""); setEmail(""); setPhone(""); setSkills([]); setExperience([]); setEducation([]);
            }}>Clear</button>
          </div>
        </section>

        {/* Right Preview */}
        <aside className="preview-wrapper">
          <div ref={previewRef} className={`preview ${template.toLowerCase()}`}>
            {/* Header */}
            <div className="preview-header">
              <div>
                <h2 className="p-name">{name || "Your Name"}</h2>
                <div className="muted">{email || "you@example.com"}</div>
                <div className="muted">{countryCode} {phone || "123456789"}</div>
              </div>
              <div className="badge">{template}</div>
            </div>

            {/* Summary placeholder */}
            <section>
              <h3>Summary</h3>
              <p className="muted">A short professional summary goes here. Highlight 2–3 strengths.</p>
            </section>

            {/* Skills */}
            <section>
              <h3>Skills</h3>
              <div className="skill-list">
                {skills.length ? skills.map((s) => <span key={s} className="skill">{s}</span>) : <div className="muted">No skills added</div>}
              </div>
            </section>

            {/* Experience */}
            <section>
              <h3>Experience</h3>
              {experience.length ? (
                <ul className="bullet">
                  {experience.map((e) => <li key={e.id}>{e.text}</li>)}
                </ul>
              ) : <div className="muted">No experience added</div>}
            </section>

            {/* Education */}
            <section>
              <h3>Education</h3>
              {education.length ? (
                <ul className="bullet">
                  {education.map((e) => <li key={e.id}>{e.text}</li>)}
                </ul>
              ) : <div className="muted">No education added</div>}
            </section>

            <footer className="preview-footer muted">Generated with Resume Builder</footer>
          </div>
        </aside>
      </main>

      <style>{`
        /* small local styles to keep component self-contained */
        .app { font-family: Inter, system-ui, sans-serif; color: #111; min-height:100vh; background:#f7fafc; }
        .app.dark { background:#0f1724; color:#e6eef8; }
        .topbar { display:flex; justify-content:space-between; align-items:center; padding:16px 24px; border-bottom:1px solid rgba(0,0,0,0.06); }
        .app.dark .topbar { border-color: rgba(255,255,255,0.06); }
        .topbar h1 { margin:0; font-size:20px; }
        .container { display:flex; gap:24px; padding:24px; }
        .form { width:360px; background: var(--form-bg, #fff); padding:18px; border-radius:8px; box-shadow:0 6px 18px rgba(15,23,42,0.06); }
        .app.dark .form { background:#071126; box-shadow:none; }
        label { display:block; margin-top:12px; margin-bottom:6px; font-weight:600; }
        input, select { width:100%; padding:8px 10px; border:1px solid #e2e8f0; border-radius:6px; background:transparent; color:inherit; }
        .row { display:flex; gap:8px; align-items:center; }
        .btn { padding:8px 10px; border-radius:6px; background:#edf2f7; border:none; cursor:pointer; }
        .btn.primary { background:#0f1724; color:white; }
        .btn.outline { background:transparent; border:1px solid #cbd5e1; }
        .chips { display:flex; gap:8px; flex-wrap:wrap; margin-top:8px; }
        .chip { background:#e6f2ff; padding:6px 8px; border-radius:999px; display:flex; gap:8px; align-items:center; }
        .chip .x { background:transparent; border:none; cursor:pointer; font-size:14px; }
        .list { margin:8px 0 0 16px; padding:0; }
        .small-x { margin-left:8px; color:#ef4444; border:none; background:transparent; cursor:pointer; }
        .form-actions { margin-top:14px; display:flex; gap:8px; }

        .preview-wrapper { flex:1; }
        .preview { background:white; padding:22px; border-radius:8px; border:1px solid #e6eef8; min-height:500px; }
        .app.dark .preview { background:#062036; border-color: rgba(255,255,255,0.06); }
        .preview-header { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
        .p-name { margin:0; font-size:22px; }
        .muted { color:#6b7280; }
        .app.dark .muted { color:#94a3b8; }
        h3 { margin-top:12px; margin-bottom:6px; }

        .skill-list { display:flex; gap:8px; flex-wrap:wrap; }
        .skill { background:#eef2ff; padding:6px 8px; border-radius:6px; }

        .bullet { margin-left:16px; }

        .preview.footer, .preview-footer { margin-top:18px; font-size:12px; color:#9ca3af; }

        /* TEMPLATES */
        .preview.classic { font-family: 'Times New Roman', serif; color:#111; }
        .preview.minimal { font-family: Arial, sans-serif; color:#111; background:#fff; }
        .preview.modern { font-family: 'Inter', sans-serif; color:#0b2545; background:linear-gradient(180deg,#f5fbff, #ffffff); border-left:6px solid #2563eb; padding-left:18px; }

        /* dark tweaks */
        .app.dark .chip { background:#0b2b42; }
        .app.dark .skill { background:#08304b; color:#dbeafe; }

        /* simple toggle */
        .switch { display:inline-block; position:relative; width:44px; height:24px; }
        .switch input { display:none; }
        .slider { position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background:#ccc; border-radius:24px; }
        .slider:before { content:''; position:absolute; height:18px; width:18px; left:3px; top:3px; background:white; border-radius:50%; transition:0.2s; }
        input:checked + .slider { background:#2563eb; }
        input:checked + .slider:before { transform:translateX(20px); }
      `}</style>
    </div>
  );
}
