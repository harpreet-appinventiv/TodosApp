import { createStore }  from "redux";
import HomeReducer from '../screens/homeReducer.js'
 
let store = createStore(HomeReducer);
export default store;