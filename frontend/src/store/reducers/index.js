// Root Reducer
import { combineReducers } from "redux";
import dataReducer from "./dataReducer";

export let rootReducer = combineReducers({
  data: dataReducer,
  
});

export default rootReducer;
