import TaskCard from "./TaskCard"

type Task = {
    id: number;
    title : string;
    complected: string;
};

export default function TaskList({ tasks = []}: { tasks: Task[] }) {
   return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "20px",
      marginTop: "30px"
    }}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}