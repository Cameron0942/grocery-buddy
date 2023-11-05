import fs from "fs";
import csv from "csv-parser";

const FILE = "./recipe_data_and_images.csv";
const IMAGES = "./food-images";

function getMatchedRecipes(callback, groceryList) {
  let errorCount = 0;
  let matchedRecipes = [];
  let imageFiles = [];

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

        console.log("cleanedString", cleanedString);

        const matchedIngredients = ingredientsArray.filter((item) =>
          groceryList.some((term) =>
            item.toLowerCase().includes(term.toLowerCase())
          )
        );

        if ((matchedIngredients.length / ingredientsArray.length) * 100 >= 40) {
          const imageFileName = row.Image_Name;

          // Construct the image file path
          const imagePath = `${IMAGES}/${imageFileName}.jpg`;

          // Read the image file as a binary buffer
          const imageBuffer = fs.readFileSync(imagePath);

          // Add the image path to the imageFiles array
          imageFiles.push(imageBuffer);

          matchedRecipes.push({
            ...row,
            image: imageBuffer, // Include the image path in the recipe data
          });
        }
      } catch (error) {
        errorCount++;
        console.log("Error cleaning string", error)
      }
    })
    .on("end", () => {
      console.log("All rows have been processed.");
      console.log("There were", errorCount, "errors");

      // Call the callback function with the matched recipes and image files
      callback(matchedRecipes);
    });
}

export default getMatchedRecipes;
