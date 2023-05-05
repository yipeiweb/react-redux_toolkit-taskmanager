import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

export const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      const foundTask = tasks.find((task) => task.id === params.id);
      if (!foundTask) {
        navigate("/");
      }

      setTask(foundTask);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 w-4/6 p-4">
      <div className="my-3">
        <label htmlFor="title" className="block text-md font-bold">
          Nombre de la tarea
        </label>
        <input
          name="title"
          type="text"
          placeholder="Nombre de la tarea"
          onChange={handleChange}
          value={task.title}
          className="w-full p-2 rounded-md bg-zinc-600"
          required
        />
      </div>
      <div className="my-3">
        <label htmlFor="description" className="block text-md font-bold">
          Descripcion
        </label>
        <textarea
          className="w-full p-2 rounded-md bg-zinc-600"
          name="description"
          placeholder="Descripcion"
          onChange={handleChange}
          value={task.description}
          required
        ></textarea>
      </div>
      <input
        type="submit"
        value="Guardar"
        className="bg-orange-500 px-2 py-2 rounded-sm text-sm cursor-pointer"
      />
    </form>
  );
};
