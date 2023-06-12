//? REACT

//? REDUX
import { useDispatch, useSelector } from 'react-redux';
import { addItemToList } from '../Store/GroceryListSlice';

//? COMPONENTS

//? STYLES
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';

const ItemInput = () => {
    const dispatch = useDispatch();
    const reduxGroceryList = useSelector((state) => state.groceryList.items);
    
    useEffect(() => {
        // console.log(reduxGroceryList);
    }, [reduxGroceryList]);

    //* Component functions
    //? HANDLE SUBMIT
    const handleSubmit = (event) => {
        event.preventDefault();
        const inputValue = event.target.elements[0].value;

        if (inputValue === '') return;
    
        dispatch(addItemToList({item: inputValue}));
        
        // create grocery list array on localstorage
        if(localStorage.getItem('list') === null){
            localStorage.setItem('list', JSON.stringify([inputValue]));
        }
        else{
            //copy current localstorage string, convert to array, push new item, convert back to string, push back to localstorage
            const LSString = localStorage.getItem('list');
            const LSArray = JSON.parse(LSString);
            const newData = inputValue;
            LSArray.push(newData);
            const updatedArrayString = JSON.stringify(LSArray);
            localStorage.setItem('list', updatedArrayString);
        }
        
        
    
    
        event.target.elements[0].value = ''; // Clear the input field after submission
      };

  return (
    <>
        <div className='entryContainer' >
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <input className="form-control form-control-lg" type="text" placeholder="Enter item" />
                <button type="submit">Add Item</button>
            </form>
        </div>
    </>
  );
};

export default ItemInput;
