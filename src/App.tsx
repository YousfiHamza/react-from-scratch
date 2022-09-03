import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import HomePage from "./pages/Home.page";

const App = () => {
  return (
    <StrictMode>
      <HomePage />
    </StrictMode>
  );
};

// export default App; defaulte import for SSR use

// THIS SECTION FOR CLIENT SIDE RENDERING
// Create a root.
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);

// root.render new API - React 18
root.render(<App />);
