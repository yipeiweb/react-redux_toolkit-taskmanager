import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";

export const TaskList = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks);
  const handleDelete = (id) => {
    if (confirm("Estás seguro de eliminar esta tarea?")) {
      dispatch(deleteTask(id));
    }
  }

  return (
    <div className="w-4/6">
      <header className="flex gap-2 justify-between items-center py-4 md:flex-row flex-col">
        <h3>Nº de tareas: <span className="text-green-500">{tasks.length}</span></h3>
        <Link
          to="/create-task"
          className="bg-green-500 px-2 py-2 rounded-sm text-md cursor-pointer"
        >
          Crear tarea
        </Link>
      </header>
      <div className="grid md:grid-cols-3 gap-3">
        {tasks.length 
        ? (
            tasks.map((task) => (
                <div key={task.id} className="bg-neutral-800 p-4 rounded-md">
                  <h3 className="text-2xl">{task.title}</h3>
                  <p className="text-gray-500">{task.description}</p>
                  <header className="flex justify-between mt-2">
                    <div className="flex gap-x-2">
                      <Link
                        to={`/edit-task/${task.id}`}
                        className="bg-orange-500 px-2 py-2 text-md rounded-md"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-500 px-2 py-2 text-md rounded-md cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </header>
                </div>
        ))) : (
            <span className="text-xl">No hay tareas creadas aún</span>
        )}
      </div>
    </div>
  );
};
