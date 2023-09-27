import getMatchedRecipes from "./findRecipeSuggestions.js";
// import v8 from "v8";
const printRecipeSuggestions = (req, res) => {
  const groceryList = ["chicken"];

  getMatchedRecipes((matchedRecipes) => {
    for (let i = 0; i < matchedRecipes.length; i++) {
      console.log("this is a match", matchedRecipes[i]);
    }

    res.json(matchedRecipes);
  }, groceryList);
};

export default printRecipeSuggestions;
