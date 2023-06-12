//? REACT
import React, { useEffect, useState } from 'react';

//? REDUX
import { useSelector} from 'react-redux';

//? COMPONENTS
import GroceryListItem from './GroceryListItem';

//? OPENAI
import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(new Configuration({
  apiKey: import.meta.env.VITE_API_KEY
}));

const testItems = ['cheese', 'milk', 'bread', 'gatorade', 'toilet paper', 'ham', 'ice cream', 'ketchup', 'beer', 'gum', 'peanut butter', 'chips', 'crackers', 'baking soda', 'salt', 'cereal', 'dryer sheets', 'paper towels', 'garlic powder', 'baby powder', 'marinara sauce', 'floss', 'avocados', 'eggs'];

const prompt2 = `I am going to send you a list of items. I want you to categorize and group these items by specific aisle name of an American grocery store. Use ONLY items that exist in the list I give you. Categorize these items according to their relevance to a grocery store aisle name. If no good aisle name exists for an item, place it in your best guess of grocery categorization or miscellaneous. Paper products should be in their own category. Items pertaining to laundry should have their own category. Replace any aisle names, like 'pantry' with more descriptive names. Beverages and Alcohol should be separate categories. Return the list as a JSON object: cheese, milk, bread, gatorade, toilet paper, ham, ice cream, ketchup, beer, gum, peanut butter, chips, crackers, baking soda, salt, cereal, dryer sheets, paper towels`;

const SmartList = () => {
    const items = useSelector((state) => state.groceryList.items);
    const [list, setList] = useState([]);

    const getChatGPTRes = async () => {
        const itemNames = items.map((item) => item.item);
        console.log(itemNames);

        const prompt = `You are to act as an AI-powered grocery store assistant.
        Your task is to create an algorithm that can automatically sort a shopping list of grocery store items into their respective aisle names.
        This output should be in JSON format.
        Using this list of items ${itemNames}, categorize and group them based on their relevance to common grocery store aisle names.
        Look through the list given to you as a reference for examples of aisle names, and common items that are found in those aisles.
        If you find an item that is already in the example list, sort your output the same as the example list I gave you.
        If you do not find the item in the list then use the directions that I tell you next.
        When you see an item ask yourself what is this item? How is it used or consumed in average human-use context?
        The description you create for this item should be utilitarian in nature for the purpose of this program.
        If you come across an item that does not seem like an average grocery store item, then I want you to consider if it is a brand name of a product.
        If it is a brand name, consider what extra context is added to the item for its placement on the list. Use that context when deciding what category each item matches with.
        Do not include empty aisle names in the output.
        It is imperative that you ensure each item that is given to you in this prompt is included in the output.
        Do a check at the end of sorting the last item, that makes sure that each item that was in the original list, is in the sorted list output.
        There should not be any items in the outputted list, that did not exist in the inputted list.
        The list should be returned in alphabetical order by each aisle name.
        Please only show the output and not the algorithim itself.
        Use these aisle categories:
        - Produce (fruits, vegetables, herbs)
        - Pasta (farfalle, egg noodles, gnocchi, lasagna, macaroni, penne, pesto sauce, pasta sauces)
        - Bakery (bread, pastries, cakes)
        - Baking (flour, sugar, baking soda, baking powder, cooking oils, cornstarch)
        - Breakfast Aisle (waffle mix, pop tarts, cold cereals, biscuits, syrup, sandwich rolls, breakfast bars, breakfast drinks, toaster pastries, pancake mix)
        - Candy (chewing gum, mints, lollipops, premium candy, chocolate bars, hard candy, christmas/holiday candy, cookies, chocolate/candy nuts, marshmallows)
        - Condiments (ketchup, mustard, butter sauces, fish sauces, meat sauces, gravy, food mixes, peanut butter)
        - Meat and Seafood (beef, pork, chicken, fish, seafood)
        - Dairy (milk, cheese, yogurt, eggs)
        - Deli (cold cuts, sliced cheeses, prepared foods)
        - Frozen (frozen dinners, frozen meat, Frozen bakery products, ice cream, frozen vegetables, frozen fruits, frozen pizza, frozen breakfast items)
        - Snacks (chips, crackers, nuts, popcorn, cookies, processed fruit snacks)
        - Spices & Seasonings (salt, pepper, seasoning powders (i.e. garlic powder, onion powder, etc))
        - Canned and Jarred Goods (canned fruits and vegetables, sauces, condiments, canned meat, canned meals, canned soup)
        - Beverages (water, soda, tea, coffee, smoothies)
        - Alcohol (beer, wine, spirits)
        - Paper Products (toilet paper, paper towels, paper plates, paper cups)
        - Laundry (dryer sheets, detergent, fabric softener)
        - Cleaning Supplies (household cleaning supplies, garbage bags, bleach, all purpose cleaner, mops, brooms, gloves, cleaning wipes, sponges, dishwasher detergent)
        - Personal Care (shampoo, hair color, baby products, skin moisturizers, perfumes, nail paint, deodorant, toothpaste, floss, soap, wet wipes)`;

        try {
            //configures the chat model
            //messages is an array of input 'content' is the message being sent
            const res = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }]
              });
            const chatGPTRes = JSON.parse(res.data.choices[0].message.content);
            console.log("chatGPTRes", chatGPTRes)

            const organizedList = Object.entries(chatGPTRes).map(([category, items]) => {
                return {
                  category: category,
                  items: items
                };
              });
              setList(organizedList);
        }
        catch(e){
            console.log("Problem connecting to GPT4", e)
        }

    }
    
    //* Runs when a change is made to the redux list
    // useEffect(() => {
    //     const itemNames = items.map((item) => item.item);
    //     // setList(itemNames);
    //     console.log(itemNames);
    //     const prompt = `You are to act as an AI-powered grocery store assistant.
    //     Your task is to create an algorithm that can automatically sort a shopping list of grocery store items into their respective aisle names.
    //     This output should be in JSON format.
    //     Using this list of items [${itemNames}], categorize and group them based on their relevance to common grocery store aisle names.
    //     Look through the list given to you as a reference for examples of aisle names, and common items that are found in those aisles.
    //     If you find an item that is already in the example list, sort your output the same as the example list I gave you.
    //     If you do not find the item in the list then use the directions that I tell you next.
    //     When you see an item ask yourself what is this item? How is it used or consumed in average human-use context?
    //     The description you create for this item should be utilitarian in nature for the purpose of this program.
    //     If you come across an item that does not seem like an average grocery store item, then I want you to consider if it is a brand name of a product.
    //     If it is a brand name, consider what extra context is added to the item for its placement on the list. Use that context when deciding what category each item matches with.
    //     Do not include empty aisle names in the output.
    //     It is imperative that you ensure each item that is given to you in this prompt is included in the output.
    //     Do a check at the end of sorting the last item, that makes sure that each item that was in the original list, is in the sorted list output.
    //     There should not be any items in the outputted list, that did not exist in the inputted list.
    //     The list should be returned in alphabetical order by each aisle name.
    //     Please only show the output and not the algorithim itself.
    //     Use these aisle categories:
    //     - Produce (fruits, vegetables, herbs)
    //     - Pasta (farfalle, egg noodles, gnocchi, lasagna, macaroni, penne, pesto sauce, pasta sauces)
    //     - Bakery (bread, pastries, cakes)
    //     - Baking (flour, sugar, baking soda, baking powder, cooking oils, cornstarch)
    //     - Breakfast Aisle (waffle mix, pop tarts, cold cereals, biscuits, syrup, sandwich rolls, breakfast bars, breakfast drinks, toaster pastries, pancake mix)
    //     - Candy (chewing gum, mints, lollipops, premium candy, chocolate bars, hard candy, christmas/holiday candy, cookies, chocolate/candy nuts, marshmallows)
    //     - Condiments (ketchup, mustard, butter sauces, fish sauces, meat sauces, gravy, food mixes, peanut butter)
    //     - Meat and Seafood (beef, pork, chicken, fish, seafood)
    //     - Dairy (milk, cheese, yogurt, eggs)
    //     - Deli (cold cuts, sliced cheeses, prepared foods)
    //     - Frozen (frozen dinners, frozen meat, Frozen bakery products, ice cream, frozen vegetables, frozen fruits, frozen pizza, frozen breakfast items)
    //     - Snacks (chips, crackers, nuts, popcorn, cookies, processed fruit snacks)
    //     - Spices & Seasonings (salt, pepper, seasoning powders (i.e. garlic powder, onion powder, etc))
    //     - Canned and Jarred Goods (canned fruits and vegetables, sauces, condiments, canned meat, canned meals, canned soup)
    //     - Beverages (water, soda, tea, coffee, smoothies)
    //     - Alcohol (beer, wine, spirits)
    //     - Paper Products (toilet paper, paper towels, paper plates, paper cups)
    //     - Laundry (dryer sheets, detergent, fabric softener)
    //     - Cleaning Supplies (household cleaning supplies, garbage bags, bleach, all purpose cleaner, mops, brooms, gloves, cleaning wipes, sponges, dishwasher detergent)
    //     - Personal Care (shampoo, hair color, baby products, skin moisturizers, perfumes, nail paint, deodorant, toothpaste, floss, soap, wet wipes)`;

    //     const getChatGPTRes = async () => {
    //         try {
    //             //configures the chat model
    //             //messages is an array of input 'content' is the message being sent
    //             const res = await openai.createChatCompletion({
    //                 model: 'gpt-3.5-turbo',
    //                 messages: [{ role: 'user', content: prompt }]
    //               });
    //             const chatGPTRes = JSON.parse(res.data.choices[0].message.content);

    //             const organizedList = Object.entries(chatGPTRes).map(([category, items]) => {
    //                 return {
    //                   category: category,
    //                   items: items
    //                 };
    //               });
    //               setList(organizedList);
    //         }
    //         catch(e){
    //             console.log("Problem connecting to GPT4", e)
    //         }
    //     };

    //     // getChatGPTRes();
    // }, [items]);

  return (
      <>
        <div style={{textAlign: 'center'}}>Hello from SmartList</div>
        <button onClick={getChatGPTRes}>Get SmartList</button>
        <div style={{textAlign: 'center'}}>
        {list.map((category, index) => (
            <div key={index}>
            <div>Category: {category.category}</div>
                {category.items.map((item, itemIndex) => (
                    <div key={itemIndex}>{item}</div>
                ))
                }
            </div>
            ))}
        </div>
      </>
  )
}

export default SmartList;