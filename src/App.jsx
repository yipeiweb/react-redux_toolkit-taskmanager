import { useEffect } from "react";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    if(!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', JSON.stringify([]))
    }
  }, [])
  
  return (
    <div className="bg-zinc-900 h-screen text-white">
      <div className="flex items-center justify-center h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TaskList />}></Route>
            <Route path="/create-task" element={<TaskForm />}></Route>
            <Route path="/edit-task/:id" element={<TaskForm />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
