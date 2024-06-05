import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import InGame from "./pages/InGame";
import MyPage from "./pages/MyPage";
import Rank from "./pages/Rank";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/auth",
      element: <AuthPage />,
    },
    // 인게임 라우팅에서 방 입장해서 대기하는 페이지랑 게임 진행시 페이지 같게 해야 하는지??
    {
      path: "/ingame/:roomId",
      element: <InGame />,
    },
    {
      path: "/mypage",
      element: <MyPage />,
    },
    {
      path: "/rank",
      element: <Rank />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
