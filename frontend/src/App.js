import { BrowserRouter, Routes, Route } from "react-router-dom";
import Learn from "./pages/Learn.jsx";
import AllCourses from "./pages/AllCourses";


import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Preferences from "./pages/Preferences.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Saved from "./pages/Saved.jsx";
import Trending from "./pages/Trending.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/learn" element={<Learn />} />
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/preferences"
          element={<Preferences />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/saved"
          element={<Saved />}
        />

        <Route
          path="/trending"
          element={<Trending />}
        />
        <Route
          path="/courses"
          element={<AllCourses />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;