//? EXPRESS
import { Router, json } from "express";
const getRouter = Router();

//? CONTROLLERS
import getRecipeSuggestions from "../controllers/getRecipeSuggestions.js";

getRouter.use(json());

getRouter.post("/recipe", getRecipeSuggestions);

export default getRouter;
