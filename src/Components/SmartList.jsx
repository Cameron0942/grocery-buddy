//? REACT
import { useState } from 'react';

//? REDUX
import { useSelector} from 'react-redux';

//? MATERIAL UI
import CircularProgress from '@mui/material/CircularProgress';
import { Snackbar } from '@mui/material';
import Button from '@mui/material/Button';

//! delete me

//? OPENAI
import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(new Configuration({
  apiKey: import.meta.env.VITE_API_KEY
}));

const testItems = ['cheese', 'milk', 'bread', 'gatorade', 'toilet paper', 'ham', 'ice cream', 'ketchup', 'beer', 'gum', 'peanut butter', 'chips', 'crackers', 'baking soda', 'salt', 'cereal', 'dryer sheets', 'paper towels', 'garlic powder', 'baby powder', 'marinara sauce', 'floss', 'avocados', 'eggs'];

const SmartList = () => {
    const items = useSelector((state) => state.groceryList.items);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
    const getChatGPTRes = async () => {
        setLoading(true);
        const itemNames = items.map((item) => item.item);
        console.log(itemNames);
        
        const prompt = `Forget any previous knowledge.
        You are to act as an AI-powered grocery store assistant.
        Your task is to create an algorithm that can automatically sort a shopping list of grocery store items into their respective aisle names.
        This output should be in JSON format.
        Use only this list of items [${itemNames}].
        Categorize and group them based on their relevance to common grocery store aisle names.
        Return only the items given to you in the list.
        Only categorize the item into one category.
        Look through the list given to you as a reference for examples of aisle names, and common items that are found in those aisles.
        If you find an item that is already in the example list I have given, sort your output to be the same as the example list.
        If you do not find the item in the list then use the directions that I tell you next.
        When you see an item ask yourself what is this item? How is it used or consumed in average human-use context?
        The description you create for this item should be utilitarian in nature for the purpose of this program.
        If you come across an item name that does not seem like an average grocery store item, then I want you to consider if it is a brand name of a product.
        If it is a brand name, consider what extra context is added to the item for its placement on the list. Use that context when deciding what category each item matches with.
        If it is not a brand name, and it does not fit into any existing category, categorize it as Miscellaneous.
        Only add 1 item at a time.
        Do not output any aisle names with an empty array.
        Do a check at the end of sorting the last item, that makes sure that each item that was in the original list, is in the sorted list output.
        Do a check to make sure that only items inside this list (${itemNames}) are included in the output. Remove any items that are not in this list (${itemNames}).
        The list should be returned in alphabetical order by each category.
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
        - Dairy (milk, butter, cheese, yogurt, eggs)
        - Deli (cold cuts, sliced cheeses, prepared foods)
        - Frozen (frozen dinners, frozen meat, Frozen bakery products, ice cream, frozen vegetables, frozen fruits, frozen pizza, frozen breakfast items)
        - Snacks (chips, crackers, nuts, popcorn, cookies, processed fruit snacks)
        - Spices & Seasonings (salt, pepper, black pepper, seasoning powders (i.e. garlic powder, onion powder, etc))
        - Canned and Jarred Goods (canned fruits and vegetables, sauces, condiments, canned meat, canned meals, canned soup)
        - Beverages (water, soda, tea, coffee, smoothies)
        - Alcohol (beer, wine, spirits)
        - Paper Products (toilet paper, paper towels, paper plates, paper cups)
        - Laundry (dryer sheets, detergent, fabric softener)
        - Cleaning Supplies (household cleaning supplies, garbage bags, bleach, all purpose cleaner, mops, brooms, gloves, cleaning wipes, sponges, dishwasher detergent)
        - Personal Care (shampoo, hair color, baby products, skin moisturizers, perfumes, nail paint, deodorant, toothpaste, floss, soap, wet wipes)
        ]`;
        
        const prompt2 = `I want you to categorize and group these grocery store items by specific aisle name of an American grocery store.
        Use ONLY items that exist in the list I give you. Categorize these items according to their relevance to a grocery store aisle name.
        If no good aisle name exists for an item, place it in your best guess of grocery categorization or miscellaneous. Paper products should be in their own category.
        Items pertaining to laundry should have their own category. Replace any aisle names, like 'pantry' with more descriptive names. Beverages and Alcohol should be separate categories.
        Return the list as a JSON object: ${itemNames}`;

        const prompt3 = `Organize the following list of items by aisle name in a grocery store (capitalize the first letter), do not add aisle to the end of the name, put category names in alphabetical order, and return the output as JSON: ${itemNames}`;

        try {
            //configures the chat model
            //messages is an array of input 'content' is the message being sent
            const res = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: itemNames.length < 5 ? prompt : prompt3 }]
            });
            const chatGPTRes = JSON.parse(res.data.choices[0].message.content);
            console.log("chatGPTRes", chatGPTRes);
            setLoading(false);
            setSnackbarOpen(false);

            const organizedList = Object.entries(chatGPTRes).map(([category, items]) => {
                return {
                  category: category,
                  items: items
                };
              });
              setList(organizedList);
        }
        catch(e){
            console.log("Problem connecting to GPT4", e);
            setLoading(false);
            setSnackbarOpen(true);
        }

    };

    const determineCategoryColor = (category) => {
        switch(category){
            case 'Alcohol':
                return '#7f3cde';
            case 'Produce':
                return '#296e39';
            case 'Dairy':
                return '#DE2413';
            case 'Bakery':
                return '#db9542'
            case 'Baking':
                return '#db9542'
            case 'Beverages':
                return '#86b6f0'
            case 'Household':
                return '#43781f';
            case 'Household Supplies':
                return '#43781f';
            case 'Cleaning Supplies':
                return '#43781f';
            case 'Meat':
                return '#4d250c';
            case 'Meat and Seafood':
                return '#4d250c';
            case 'Seafood':
                return '#4066a3';
            case 'Meat/Seafood':
                return '#4066a3';
            case 'Pantry':
                return '#7d5031';
            case 'Frozen Foods':
                return '#2a97ad';
            case 'Frozen':
                return '#2a97ad';
            case 'Paper Products':
                return '#debd3c';
            case 'Snacks':
                return '#f05a0a';
            case 'Condiments':
                return '#7a0a00';
            case 'Personal Care':
                return '#5f03a6';
            case 'Spices & Seasonings':
                return '#733927';
            case 'Spices and Seasonings':
                return '#733927';
            case 'Breakfast Aisle':
                return '#ffaa00';
            case 'Candy':
                return '#ff00d4';
            case 'Laundry':
                return '#6f18ad';
            case 'Canned and Jarred Goods':
                return '#c03d00';
            case 'Toiletries':
                return '#09918d';
            default:
                return '#2f3642'
        }
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarOpen(false);
    }

    return (
        <>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="❌ There was a problem connecting to ChatGPT. Please try again in a moment. ❌"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                onClick={handleSnackbarClose}
            />
        
          {items.length !== 0 && (
            
            <>
              {loading ? <CircularProgress sx={{margin: '0 auto', display: 'block', marginTop: '1em', color: '#bcc9c9'}} /> : <Button onClick={getChatGPTRes} variant='contained' color='secondary' sx={{margin: '0 auto', display: 'block', marginTop: '1em'}}>Get AI assisted list</Button>}
              <div style={{ textAlign: 'center' }}>
                {list.map((category, index) => (
                  <div key={index}>
                    {category.items.length > 0 && (
                      <>
                        <div className='smartListCategory' style={{ backgroundColor: determineCategoryColor(category.category) }}>{category.category}</div>
                        {category.items.map((item, itemIndex) => (
                          <div className='smartListItem' key={itemIndex} style={{
                            // apply borderBottomLeft and Right radius to the last element of the category
                            borderBottomLeftRadius: itemIndex === category.items.length - 1 ? '10px' : '0',
                            borderBottomRightRadius: itemIndex === category.items.length - 1 ? '10px' : '0'
                          }}>{item}</div>
                        ))}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      );
      
      
}

export default SmartList;