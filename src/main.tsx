import ReactDOM from "react-dom"
import App from "./App";
import { HashRouter } from "react-router-dom";
import PanContextualProvider from "./Contexts/PanContextualProvider";

ReactDOM.render(
    <PanContextualProvider>
        <HashRouter>
            <App />
        </HashRouter>
    </PanContextualProvider>
, document.getElementById("root"));
