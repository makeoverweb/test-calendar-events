import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { reducer } from "./rootReducer";

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

export const store = createStore(reducer, composeEnhancers(applyMiddleware()));
