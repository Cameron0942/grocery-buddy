//? REACT
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//? PAGES
import Recipe from "./Pages/Recipe";
import MainPage from "./Pages/MainPage";

const App = () => {
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
