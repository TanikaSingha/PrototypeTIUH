import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/LoginPage/LoginPage";
import Register from "./Pages/RegisterPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import AuthComponent from "./Components/AuthComponent/AuthComponent";
import OtpPage from "./Pages/OtpPage/OtpPage";
import StartPage from "./Pages/StartPage/StartPage";
import TutorialPage from "./Pages/TutorialPage/TutorialPage";
import GameComponent from "./Components/GameComponent/GameComponent";
import QuizGame from "./Games/QuizGame/QuizGame";
import ChoiceGame from "./Games/ChoiceGame/ChoiceGame";
import PuzzleGame from "./Games/PuzzleGame/PuzzleGame";

const App = () => {
  const { user, otpVerification } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OtpPage />} />
        <Route path="/tutorial" element={<TutorialPage></TutorialPage>}></Route>
        <Route
          path="/start"
          element={
            <AuthComponent>
              <StartPage></StartPage>
            </AuthComponent>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <AuthComponent>
              <ProfilePage></ProfilePage>
            </AuthComponent>
          }
        ></Route>
        <Route
          path="/level/:levelType"
          element={<GameComponent></GameComponent>}
        ></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        <Route path="/quiz" element={<QuizGame></QuizGame>}></Route>
        <Route path="/choice" element={<ChoiceGame></ChoiceGame>}></Route>
        <Route path="/puzzle" element={<PuzzleGame></PuzzleGame>}></Route>
      </Routes>
    </main>
  );
};

export default App;
