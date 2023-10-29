//? REACT
import { useEffect } from "react";

//? REDUX
import { useSelector, useDispatch } from "react-redux";
import { clearList } from "../Store/GroceryListSlice";

//? COMPONENTS
import GroceryListItem from "./GroceryListItem";

//? STYLES
import "bootstrap/dist/css/bootstrap.css";

const GroceryList = () => {
  const dispatch = useDispatch();
  const reduxGroceryList = useSelector((state) => state.groceryList.items);

  const LSGroceryList = JSON.parse(localStorage.getItem("list"));

  useEffect(() => {
    console.log(reduxGroceryList)
    console.log(LSGroceryList)
  }, [])

  function handleClearList () {
    localStorage.clear();
    dispatch(clearList());
  }

  return (
    <>
      <h1 className="groceryListTitle">Your Grocery List</h1>
      <button onClick={handleClearList}>Clear List</button>
      <div
        className="entryContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {reduxGroceryList?.length === 0 || LSGroceryList?.length === 0 ? (
          <p
            style={{
              fontSize: "24px",
              color: "#ffffff",
              textShadow: "1px 1px black",
            }}
          >
            There&apos;s nothing here yet 🤔
          </p>
        ) : (
          (reduxGroceryList?.length === 0 && LSGroceryList?.length > 0) ? (
            LSGroceryList.map((item, index) => (
              <GroceryListItem key={item.id} index={index} item={item} />
            ))
          ) : (
            reduxGroceryList.map((item, index) => (
              <GroceryListItem key={item.id} index={index} item={item} />
            ))
          )
        )}
      </div>
    </>
  );
  
};

export default GroceryList;
