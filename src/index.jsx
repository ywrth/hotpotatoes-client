import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";

import "./index.scss";

const App = () => {
  return <MainView />;
};

const container = document.querySelector("#root"); // Add this line
const root = createRoot(container);
root.render(<App />);
