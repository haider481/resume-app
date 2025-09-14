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
    </div>
  );
}
