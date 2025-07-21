import { createBrowserRouter } from "react-router";
import App from "./App";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import StreamPage from "./pages/StreamPage/StreamPage";
import StreamHome from "./pages/streamhome/StreamHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <StreamHome /> },
      { path: "*", element: <StreamPage /> },
    ],
  },
]);
export default router;
