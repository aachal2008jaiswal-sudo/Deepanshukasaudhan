export default function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>School Attendance System Ready</h1>
      <a href="/teacher/add-student" style={{display:"block", padding:"15px", background:"black", color:"white", margin:"20px", borderRadius:"8px", textDecoration:"none"}}>Add Student</a>
      <a href="/teacher/attendance" style={{display:"block", padding:"15px", background:"black", color:"white", margin:"20px", borderRadius:"8px", textDecoration:"none"}}>Take Attendance</a>
      <a href="/dashboard" style={{display:"block", padding:"15px", background:"green", color:"white", margin:"20px", borderRadius:"8px", textDecoration:"none"}}>Dashboard</a>
    </div>
  )
}
