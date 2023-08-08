import appReducer from "./reducers";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";


const rootReducer = (state, action) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const composeEnhancers = composeWithDevTools({});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export {store };
