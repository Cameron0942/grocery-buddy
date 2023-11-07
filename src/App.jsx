//? REACT
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//? AXIOS
import axios from "axios";

//? PAGES
import Recipe from "./Pages/Recipe";
import MainPage from "./Pages/MainPage";
import { useLayoutEffect } from "react";

const App = () => {
  useLayoutEffect(() => {
    axios.post(import.meta.env.VITE_RENDER_TRIGGER_DEPLOY_URL);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/recipe" element={<Recipe />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
