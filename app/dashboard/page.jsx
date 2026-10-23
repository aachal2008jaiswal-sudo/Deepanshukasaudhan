"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [todayData, setTodayData] = useState(null);
  const [allClasses, setAllClasses] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students") || "[]");
    setTotalStudents(students.length);
    const classCount = {};
    students.forEach(s => { classCount[s.class] = (classCount[s.class] || 0) + 1; });
    setAllClasses(classCount);
    const hist = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("attendance_")) {
        hist.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    hist.sort((a,b) => b.date.localeCompare(a.date));
    setHistory(hist);
    const today = new Date().toISOString().split("T")[0];
    const rec = localStorage.getItem(`attendance_${today}`);
    if (rec) setTodayData(JSON.parse(rec));
  }, []);

  const getPresent = (rec) => rec ? Object.values(rec.attendance).filter(v => v === "Present").length : 0;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ fontSize: "26px", fontWeight: "bold" }}>📊 Principal Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginTop: "20px" }}>
        <div style={{ padding: "15px", background: "#f3f4f6", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>{totalStudents}</div><div>Total Students</div>
        </div>
        <div style={{ padding: "15px", background: "#dcfce7", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>{getPresent(todayData)}</div><div>Aaj Present</div>
        </div>
        <div style={{ padding: "15px", background: "#fee2e2", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>{todayData ? totalStudents - getPresent(todayData) : 0}</div><div>Aaj Absent</div>
        </div>
      </div>
      <div style={{ marginTop: "25px", padding: "15px", border: "1px solid #eee", borderRadius: "12px" }}>
        <h3 style={{ fontWeight: "bold" }}>Class Wise Students</h3>
        {Object.keys(allClasses).map(([cls, count]) => (
          <div key={cls} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
            <span>{cls}</span><b>{count}</b>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "25px" }}>
        <h3 style={{ fontWeight: "bold" }}>Last 7 Days History</h3>
        {history.slice(0,7).map((rec, idx) => (
          <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "12px", marginTop: "8px", background: "#f9fafb", borderRadius: "8px" }}>
            <span>{rec.date}</span><span style={{ color: "green" }}>P: {getPresent(rec)}</span><span style={{ color: "red" }}>A: {rec.students.length - getPresent(rec)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
