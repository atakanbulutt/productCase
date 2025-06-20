import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./shared/store/index.ts";
import { router } from "./app/router/index.tsx";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
