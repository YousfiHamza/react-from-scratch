import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import HomePage from "./pages/Home.page";
import store from "./redux/store";

const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </StrictMode>
  );
};

// export default App; defaulte import for SSR use

// THIS SECTION FOR CLIENT SIDE RENDERING
// Create a root.
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);

// root.render new API - React 18
root.render(<App />);
