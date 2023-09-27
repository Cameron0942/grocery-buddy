//? EXPRESS
import { Router, json } from "express";
const getRouter = Router();

//? CONTROLLERS
import printSuggestedRecipes from "../controllers/printSuggestedRecipes.js";

getRouter.use(json());

getRouter.get("/", printSuggestedRecipes);

export default getRouter;
