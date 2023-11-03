//? REACT
import { useEffect } from "react";

//? REDUX
import { useDispatch } from "react-redux";
import { addItemToList } from "../Store/GroceryListSlice";

//? COMPONENTS
import ItemInput from "./ItemInput";

const InputArea = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
        // dispatch(addItemToList({ item: 'test item' }));
        console.log(JSON.parse(localStorage.getItem("list")))
        let LocalStorageState = JSON.parse(localStorage.getItem("list"));
        LocalStorageState.forEach(element => {
            console.log(element)
            dispatch(addItemToList({ item: element }));
        });

    }
    catch(e) {
        console.log(e)
    }
  }, []);

  return (
    <>
      <ItemInput />
    </>
  );
};

export default InputArea;
