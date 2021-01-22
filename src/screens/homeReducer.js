intialState = {
    listData : []
}

export default function HomeReducer(state=intialState, action ){
    switch(action.type){
        case 'ADD_TASK':
            const id = `todo_${new Date().getTime()}`
            return {
                ...state,
                listData: state.listData && [{task: action.payload, status: false, id }].concat(state.listData)
            }
        case 'COMPLETE_TASK':
            const newList = state.listData.map(item => {
                if (item.id === action.payload){
                    item.status = !item.status;
                }
                return item;
            });

            return {
                ...state,
                listData: newList
            }
            
        case 'EDIT_TASK':
            // const {newListData} = state
            // newListData.splice(action.payload, 1)
            // return {
            //     ...state,
            //     listData : listData
            // }
        case 'DELETE_TASK':
            const newListAfterDelete = state.listData.filter(item => item.id !== action.payload)
            return {
                ...state,
                listData : newListAfterDelete,
            }
        default :
            return state;
    }
}