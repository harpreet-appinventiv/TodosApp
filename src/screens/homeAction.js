export const addTask = (data) => ({type: 'ADD_TASK', payload: data})
export const completeTask = (data) => ({type: 'COMPLETE_TASK', payload: data})
export const editTask = (data) => ({type: 'EDIT_TASK', payload: data})
export const deleteTask = (data) => ({type: 'DELETE_TASK', payload: data})