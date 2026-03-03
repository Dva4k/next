import TaskList from "../components/TasksList";

export default async function TaskPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
  const tasks = await res.json();

 return (
    <div style={{ 
      maxWidth: "1200px", 
      margin: "0 auto", 
      padding: "20px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h1 style={{ 
        fontSize: "2rem", 
        color: "#333",
        borderBottom: "3px solid #4f46e5",
        paddingBottom: "10px"
      }}>
         Список задач
      </h1>
      <TaskList tasks={tasks} />
    </div>
  );
}