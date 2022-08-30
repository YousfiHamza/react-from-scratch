import ReactDOM from "react-dom/client";

// import Pet from "./Pet";
import SearchParams from "./SearchParams";

const App = () => {
  return (
    <div>
      <h1>Adopt me Heading !</h1>
      <SearchParams />
    </div>
  );
};

// Create a root.
const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render new API - React 18
root.render(<App />);
