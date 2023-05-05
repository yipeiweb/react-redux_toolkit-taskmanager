import { createSlice } from "@reduxjs/toolkit";

const localstorageTasks = localStorage.getItem('tasks')
const initialState =  localstorageTasks
    ? JSON.parse(localstorageTasks)
    :  []

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload)
      localStorage.setItem('tasks', JSON.stringify(state))
    },
    deleteTask: (state, action) => {
      const foundTask = state.find((task) => task.id === action.payload)
      if (foundTask) {
        state.splice(state.indexOf(foundTask), 1)
        localStorage.setItem('tasks', JSON.stringify(state))
      }
    },
    editTask: (state, action) => {
        const {id, title, description} = action.payload
        const foundTask = state.find((task) => task.id === id)
        
        if(foundTask) {
            foundTask.title = title
            foundTask.description = description
            localStorage.setItem('tasks', JSON.stringify(state))
        }
    },
  },
});

export const { addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
