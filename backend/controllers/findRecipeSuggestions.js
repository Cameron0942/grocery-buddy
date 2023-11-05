import fs from "fs";
import csv from "csv-parser";

const FILE = "./recipe_data_and_images.csv";
const IMAGES = "./food-images";

function formatFractionToRatio(inputString) {
  // Define a map of common fractions and their decimal equivalents
  const formatFraction = {
    "¼": "1/4",
    "⅓": "1/3",
    "½": "1/2",
    "¾": "3/4",
    // Add more fractions as needed
  };

  // Replace fraction characters with decimal equivalents
  return inputString.replace(/¼|⅓|½|¾/g, (match) => formatFraction[match]);
}

function getMatchedRecipes(callback, groceryList) {
  let errorCount = 0;
  let matchedRecipes = [];
  let imageFiles = [];

  fs.createReadStream(FILE)
    .pipe(csv())
    .on("data", (row) => {
      const ingredientsString = row.Ingredients;

      try {
        let cleanedString = ingredientsString
          .replace(/\r?\n|\r/g, "") // Remove newlines and carriage returns
          .replace(/'/g, '"') // Replace single quotes with double quotes
          .replace(/""/g, '"') // Replace consecutive double quotes with a single double quote
          .replace(/([^"])'/g, '$1"') // Replace single quotes not preceded by double quotes with double quotes
          .replace(/'([^"])/g, '"$1'); // Replace single quotes not followed by double quotes with double quotes

        cleanedString = formatFractionToRatio(cleanedString);

        // console.log("cleanedString", cleanedString);
        try {

          const ingredientsArray = JSON.parse(cleanedString);
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
        }
        catch(e) {
          console.log("error parsing to JSON array")
        }

      } catch (error) {
        errorCount++;
        console.log("Error cleaning string", error);
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
