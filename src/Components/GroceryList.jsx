//? REACT
import { useEffect, useState } from "react";

//? REDUX
import { useSelector, useDispatch } from "react-redux";
import { clearList } from "../Store/GroceryListSlice";

//? COMPONENTS
import GroceryListItem from "./GroceryListItem";

//? MATERIAL UI
import {
  Button,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

//? STYLES
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

const GroceryList = () => {
  const dispatch = useDispatch();
  const reduxGroceryList = useSelector((state) => state.groceryList.items);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const LSGroceryList = JSON.parse(localStorage.getItem("list"));

  function handleClearList() {
    localStorage.clear();
    dispatch(clearList());
  }

  const handleDelete = () => {
    setDeleteDialog(true);
  };

  const handleClose = () => {
    setDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    handleClearList();
    setDeleteDialog(false);
  };

  return (
    <>
      <Link to="/recipe" style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ fontWeight: "600" }}
          >
            view suggested recipes
          </Button>
        </div>
      </Link>
      {(reduxGroceryList?.length > 0 || LSGroceryList?.length > 0) && (
        <div
          className="entryContainer"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 5,
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDelete}
            style={{ fontWeight: "700" }}
          >
            Clear List
          </Button>
        </div>
      )}
      <Dialog open={deleteDialog}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span style={{ fontSize: "28px", textAlign: "center" }}>
              Are you sure you want to clear the list?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleConfirmDelete}
            style={{ width: "100%", height: "100%" }}
          >
            ✅ Yes
          </button>
          <button onClick={handleClose} style={{ width: "100%" }}>
            ❌ No
          </button>
        </DialogActions>
      </Dialog>
      <h1 className="groceryListTitle">Your Grocery List</h1>
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
        ) : reduxGroceryList?.length === 0 && LSGroceryList?.length > 0 ? (
          LSGroceryList.map((item, index) => (
            <GroceryListItem key={item.id} index={index} item={item} />
          ))
        ) : (
          reduxGroceryList.map((item, index) => (
            <GroceryListItem key={item.id} index={index} item={item} />
          ))
        )}
      </div>
    </>
  );
};

export default GroceryList;
