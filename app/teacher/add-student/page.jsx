"use client";
import { useState, useEffect } from "react";

export default function AttendancePage() {
  const [className, setClassName] = useState("10th A");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const loadStudents = () => {
    const all = JSON.parse(localStorage.getItem("students") || "[]");
    const filtered = all.filter(s => s.class === className);
    setStudents(filtered);
    const def = {}; filtered.forEach(s => def[s.id] = "Present"); setAttendance(def);
  };

  useEffect(() => { loadStudents(); }, [className]);

  const toggle = (id) => setAttendance(p => ({ ...p, [id]: p[id] === "Present" ? "Absent" : "Present" }));

  const save = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(`attendance_${today}`, JSON.stringify({ date: today, class: className, students, attendance }));
    alert(`✅ Save ho gaya! Present: ${Object.values(attendance).filter(v => v === "Present").length}`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>C - Manual Attendance</h1>
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <input style={{ padding: "10px", border: "1px solid #ccc", flex: 1 }} value={className} onChange={e => setClassName(e.target.value)} />
        <button onClick={loadStudents} style={{ padding: "10px 20px", background: "#eee", borderRadius: "8px" }}>Load</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {students.map(s => (
          <div key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "12px", borderBottom: "1px solid #eee" }}>
            <span>{s.name} (Roll: {s.rollNo})</span>
            <button onClick={() => toggle(s.id)} style={{ padding: "5px 15px", borderRadius: "20px", background: attendance[s.id] === "Present" ? "#22c55e" : "#ef4444", color: "white" }}>{attendance[s.id]}</button>
          </div>
        ))}
      </div>
      {students.length > 0 && <button onClick={save} style={{ width: "100%", padding: "14px", marginTop: "20px", background: "black", color: "white", borderRadius: "8px" }}>Save Attendance ({students.length})</button>}
    </div>
  );
}
