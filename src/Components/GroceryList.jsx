//? REACT
import { useEffect } from 'react';

//? REDUX
import { useDispatch, useSelector } from 'react-redux';

//? COMPONENTS
import GroceryListItem from './GroceryListItem';

//? STYLES
import 'bootstrap/dist/css/bootstrap.css';

const GroceryList = () => {
    const reduxGroceryList = useSelector((state) => state.groceryList.items);

    const LS = localStorage.getItem('list');

    useEffect(() => {
        // console.log("reduxGroceryList", reduxGroceryList);
    }, [LS, reduxGroceryList])

  return (
    <>
        <h1 className='groceryList'>Your Grocery List</h1>
        <div className='entryContainer' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {reduxGroceryList.length === 0 ? <p>There&apos;s nothing here yet 🤔</p> :
            reduxGroceryList.map((item, index) => (
                <GroceryListItem key={item.id} index={index} item={item} />
            ))}
        </div>
    </>
  );
};

export default GroceryList;