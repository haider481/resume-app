<<<<<<< HEAD
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  const [template, setTemplate] = useState("classic");
  const [fullName, setFullName] = useState("Your Name");
  const [email, setEmail] = useState("your@email.com");
  const [phone, setPhone] = useState("+123 456 789");
  const [skills, setSkills] = useState(["React", "Tailwind"]);
  const [education, setEducation] = useState(["B.Sc Computer Science"]);
  const [experience, setExperience] = useState(["Frontend Developer @ Company"]);

  const resumeRef = useRef();

  const downloadPDF = async () => {
    const input = resumeRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("resume.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        ⚡ Resume Builder
      </h1>

      {/* Template Selector */}
      <div className="max-w-6xl mx-auto mb-6 text-center">
        <label className="mr-3 font-semibold text-gray-600">Choose Template:</label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="p-2 rounded-lg border border-gray-300"
        >
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
          <option value="creative">Creative</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Form */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Enter Your Details</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <textarea
            placeholder="Skills (comma separated)"
            value={skills.join(", ")}
            onChange={(e) => setSkills(e.target.value.split(","))}
            className="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <textarea
            placeholder="Education (comma separated)"
            value={education.join(", ")}
            onChange={(e) => setEducation(e.target.value.split(","))}
            className="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <textarea
            placeholder="Experience (comma separated)"
            value={experience.join(", ")}
            onChange={(e) => setExperience(e.target.value.split(","))}
            className="w-full mb-3 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <button
            onClick={downloadPDF}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Download as PDF
          </button>
        </div>

        {/* Right Resume Preview */}
        <div ref={resumeRef} className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          {/* Classic Template */}
          {template === "classic" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{fullName}</h2>
              <p className="text-gray-500">{email}</p>
              <p className="text-gray-500 mb-6">{phone}</p>

              <h3 className="text-xl font-semibold text-blue-600 border-b pb-1 mb-2">Skills</h3>
              <ul className="list-disc ml-6 text-gray-700">
                {skills.map((s, i) => <li key={i}>{s.trim()}</li>)}
              </ul>

              <h3 className="text-xl font-semibold text-blue-600 border-b pb-1 mb-2 mt-4">Education</h3>
              <ul className="list-disc ml-6 text-gray-700">
                {education.map((e, i) => <li key={i}>{e.trim()}</li>)}
              </ul>

              <h3 className="text-xl font-semibold text-blue-600 border-b pb-1 mb-2 mt-4">Experience</h3>
              <ul className="list-disc ml-6 text-gray-700">
                {experience.map((ex, i) => <li key={i}>{ex.trim()}</li>)}
              </ul>
            </div>
          )}

          {/* Modern Template */}
          {template === "modern" && (
            <div className="p-6 border-l-4 border-blue-600">
              <h2 className="text-4xl font-bold text-blue-700">{fullName}</h2>
              <p className="text-gray-600">{email} | {phone}</p>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 uppercase">Skills</h3>
                <p className="text-gray-700">{skills.join(", ")}</p>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 uppercase">Education</h3>
                <p className="text-gray-700">{education.join(", ")}</p>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 uppercase">Experience</h3>
                <p className="text-gray-700">{experience.join(", ")}</p>
              </div>
            </div>
          )}

          {/* Creative Template */}
          {template === "creative" && (
            <div className="p-6 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-xl">
              <h2 className="text-4xl font-extrabold text-purple-700">{fullName}</h2>
              <p className="text-gray-700 italic">{email} | {phone}</p>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-pink-600">🌟 Skills</h3>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {skills.map((s, i) => (
                    <li key={i} className="bg-white shadow px-3 py-1 rounded-full text-sm text-gray-800">
                      {s.trim()}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-pink-600">🎓 Education</h3>
                <ul className="list-disc ml-6 text-gray-800">
                  {education.map((e, i) => <li key={i}>{e.trim()}</li>)}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-pink-600">💼 Experience</h3>
                <ul className="list-disc ml-6 text-gray-800">
                  {experience.map((ex, i) => <li key={i}>{ex.trim()}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
=======
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
>>>>>>> 681ed15894d91233a67a91631086cbc91ca9135f
    </div>
  );
}
