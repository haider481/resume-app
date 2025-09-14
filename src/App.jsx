import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

  // Experience & Education arrays
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [expInput, setExpInput] = useState("");
  const [eduInput, setEduInput] = useState("");

  // UI
  const [template, setTemplate] = useState("Classic");
  const [dark, setDark] = useState(false);

  const previewRef = useRef(null);

  // handlers
  function addSkill(skill) {
    if (skill && !skills.includes(skill)) setSkills([...skills, skill]);
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

  async function downloadPDF() {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "px", format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save((name ? name.replace(/\s+/g, "_") : "resume") + ".pdf");
  }

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
      {/* ===== Navbar ===== */}
      <nav className="navbar">
        <h1>ResumePro</h1>
        <div>
          <a href="#builder">Builder</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div>
          <label className="switch">
            <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} />
            <span className="slider" />
          </label>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section className="hero">
        <h2>Build Your Professional Resume in Minutes</h2>
        <p>Create, customize, and download beautiful resumes instantly. 100% free to start!</p>
        <a href="#builder">
          <button className="btn primary">Start Building</button>
        </a>
      </section>

      {/* ===== Resume Builder ===== */}
      <main id="builder" className="container">
        {/* Left form */}
        <section className="form-container">
          <h3>Enter Your Details</h3>

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
          </div>
          <div className="chips">
            {skills.map((s) => (
              <div key={s} className="chip">
                {s} <button onClick={() => removeSkill(s)} className="x">×</button>
              </div>
            ))}
          </div>

          {/* Experience */}
          <label>Experience</label>
          <div className="row">
            <input value={expInput} onChange={(e) => setExpInput(e.target.value)} placeholder="e.g. Developer at XYZ" />
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
          <label>Education</label>
          <div className="row">
            <input value={eduInput} onChange={(e) => setEduInput(e.target.value)} placeholder="e.g. Bachelors in CS" />
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
              setName(""); setEmail(""); setPhone(""); setSkills([]); setExperience([]); setEducation([]);
            }}>Clear</button>
          </div>
        </section>

        {/* Preview */}
        <aside className="preview-wrapper">
          <div ref={previewRef} className={`preview ${template.toLowerCase()}`}>
            <h2>{name || "Your Name"}</h2>
            <div className="muted">{email || "you@example.com"}</div>
            <div className="muted">{countryCode} {phone || "123456789"}</div>

            <section>
              <h3>Skills</h3>
              <div className="skill-list">
                {skills.length ? skills.map((s) => <span key={s} className="skill">{s}</span>) : <div className="muted">No skills added</div>}
              </div>
            </section>

            <section>
              <h3>Experience</h3>
              {experience.length ? (
                <ul className="bullet">
                  {experience.map((e) => <li key={e.id}>{e.text}</li>)}
                </ul>
              ) : <div className="muted">No experience added</div>}
            </section>

            <section>
              <h3>Education</h3>
              {education.length ? (
                <ul className="bullet">
                  {education.map((e) => <li key={e.id}>{e.text}</li>)}
                </ul>
              ) : <div className="muted">No education added</div>}
            </section>
          </div>
        </aside>
      </main>

      <footer className="footer">© 2025 ResumePro. All rights reserved.</footer>
    </div>
  );
}
