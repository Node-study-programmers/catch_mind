import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import InGame from "./pages/InGame";
import MyPage from "./pages/MyPage";
import Rank from "./pages/Rank";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import { getToken } from "./store/userStore";
import { useEffect } from "react";

function App() {
  const token = getToken();

  useEffect(() => {
    if (!token && location.pathname !== "/auth") {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      window.location.href = "/auth";
    }
  }, [token]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
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
      element: (
        <Layout>
          <MyPage />
        </Layout>
      ),
    },
    {
      path: "/rank",
      element: (
        <Layout>
          <Rank />
        </Layout>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
