import fs from "fs";
import csv from "csv-parser";

const FILE = "./recipe_data_and_images.csv";

function getMatchedRecipes(callback, groceryList) {
  let errorCount = 0;
  
  let matchedRecipes = [];

  fs.createReadStream(FILE)
    .pipe(csv())
    .on("data", (row) => {
      const ingredientsString = row.Ingredients;

      try {
        const cleanedString = ingredientsString
          .replace(/\r?\n|\r/g, "")
          .replace(/'/g, '"')
          .replace(/""/g, '"');

        const ingredientsArray = JSON.parse(cleanedString);

        const matchedIngredients = ingredientsArray.filter((item) =>
        groceryList.some((term) =>
            item.toLowerCase().includes(term.toLowerCase())
          )
        );

        if ((matchedIngredients.length / ingredientsArray.length) * 100 >= 30) {
          matchedRecipes.push(row);
        }
      } catch (error) {
        errorCount++;
      }
    })
    .on("end", () => {
      console.log("All rows have been processed.");
      console.log("There were", errorCount, "errors");

      // Call the callback function with the matched recipes
      callback(matchedRecipes);
    });
}

export default getMatchedRecipes;