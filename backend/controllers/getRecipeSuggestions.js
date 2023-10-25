import getMatchedRecipes from "./findRecipeSuggestions.js";
// import v8 from "v8";
const getRecipeSuggestions = (req, res) => {
  const groceryList = req.body;

  getMatchedRecipes((matchedRecipes) => {
    // Send the matched recipes with image buffers in the response
    res.json(matchedRecipes);
  }, groceryList);
};



export default getRecipeSuggestions;
