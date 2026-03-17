import TaskList from "../components/TasksList";
import { cacheLife } from "next/cache";

let requestCount = 0;

//функция кэша
async function getTasks() {
  'use cache'
  cacheLife('minutes'); 
  
requestCount++;
console.log(`Запрос к API № ${requestCount}`)
  
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
  const tasks = await res.json();
  return tasks;
}

export default async function TaskPage() {
  const tasks = await getTasks(); 

 return (
    <div>
      <h1>Список задач</h1>
      <div style={{
        padding: "10px",
        backgroundColor: "#ffedd5",
        borderLeft: "4px solid #f97316",
        marginBottom: "20px"
      }}>
        <p style={{ margin: 0 }}>
           <strong>Запросов к API:</strong> {requestCount}
        </p>
        <p style={{ margin: "5px 0 0 0", fontSize: "0.9rem" }}>
          {requestCount === 1 ? " Первый запрос (данные в кэш)" : " Кэш обновлен"}
        </p>
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
}