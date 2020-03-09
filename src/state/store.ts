import { createStore } from "redux";
import rootReducer from "./root-reducer";

const appStore = createStore(rootReducer);

export default appStore;
