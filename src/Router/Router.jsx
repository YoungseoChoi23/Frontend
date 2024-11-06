import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "../pages/AuthPage/Signup";
import Layout from "./Layout";
import Login from "../pages/AuthPage/Login";
import QuizLab from "../pages/QuizLabPage/QuizLab";
import CreateQuizPage from "../pages/QuizLabPage/CreateQuizPage";
import QuizStoragePage from "../pages/QuizLabPage/QuizStoragePage";
import BookMarkQuizPage from "../pages/QuizLabPage/BookMarkQuizPage";
import SolveQuizPage from "../pages/SolveQuizPage/SolveQuizPage";
import QuizSetPage from "../pages/SolveQuizPage/QuizSetpage";
import StoreNotePage from "../pages/NoteStorePage/StoreNotePage";
import ProtectedRoute from "../components/AuthPage/ProtectedRoute";
import SolvingPage from "../pages/SolveQuizPage/SolvingPage";
import MarkedPage from "../pages/SolveQuizPage/MarkedPage";
import MyPage from "../pages/MyPage/MyPage";
import LearningAnalyticsPage from "../pages/LearningAnalyticsPage/LearningAnalyticsPage";
import Main from "../components/MainPage/Main";
import MonthlyAnalyticsComponent from "../components/LearningAnalyticsPage/MonthlyAnalyticsComponent";
import MonthlyAnalyticsPage from "../pages/LearningAnalyticsPage/MonthlyAnalyticsPage";

const Router = () => (
  <RouterProvider
    router={createBrowserRouter([
      {
        element: <Layout />,
        children: [
          { path: "/", element: <Signup /> },
          { path: "/signup", element: <Signup /> },
          { path: "/login", element: <Login /> },
          { path: "/main", element: <Main /> },

          {
            path: "/storenote",
            element: <ProtectedRoute element={<StoreNotePage />} />,
          },
          {
            path: "/quizlab",
            element: <ProtectedRoute element={<QuizLab />} />,
          },
          {
            path: "/quizlab/createQuiz",
            element: <ProtectedRoute element={<CreateQuizPage />} />,
          },
          {
            path: "/quizlab/quizStorage",
            element: <ProtectedRoute element={<QuizStoragePage />} />,
          },
          {
            path: "/quizlab/bookMark",
            element: <ProtectedRoute element={<BookMarkQuizPage />} />,
          },
          {
            path: "/solvequiz",
            element: <ProtectedRoute element={<SolveQuizPage />} />,
          },
          {
            path: "/solvequiz/quizset/:id",
            element: <ProtectedRoute element={<QuizSetPage />} />,
          },
          {
            path: "/solvequiz/quizset/:id/solving",
            element: <ProtectedRoute element={<SolvingPage />} />,
          },
          {
            path: "/solvequiz/quizset/:id/marked",
            element: <ProtectedRoute element={<MarkedPage />} />,
          },
          {
            path: "/mypage",
            element: <ProtectedRoute element={<MyPage />} />,
          },
          {
            path: "/learning-analytics",
            element: <LearningAnalyticsPage />,
          },
          {
            path: "/learning-analytics/monthly",
            element: <MonthlyAnalyticsPage />,
          },
          {
            path: "/learning-analytics/detail",
            element: <LearningAnalyticsPage />,
          },
        ],
      },
    ])}
  />
);

export default Router;
