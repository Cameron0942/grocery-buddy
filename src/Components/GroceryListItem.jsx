/* eslint-disable react/prop-types */
//? REACT
import { useEffect, useState } from "react";

//? REDUX
import { useDispatch } from "react-redux";
import { removeItemFromList, toggleComplete } from "../Store/GroceryListSlice";

//? MATERIAL UI
import {
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

//? STYLES
import "bootstrap/dist/css/bootstrap.css";

// eslint-disable-next-line react/prop-types
const GroceryListItem = ({ item, index }) => {
  const [checked, setIsChecked] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    dispatch(toggleComplete({ id: index, completed: !checked }));
    setIsChecked(!checked);
  };

  const handleDelete = () => {
    setDeleteDialog(true);
  };

  const handleClose = () => {
    setDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  };

  useEffect(() => {
    if (confirmDelete) {
      // Retrieve the existing data from LocalStorage
      const LSGroceryListArray = JSON.parse(localStorage.getItem("list"));
  
      if (LSGroceryListArray) {
        // Find the index of the item to delete
        const indexOfItemToBeDeleted = LSGroceryListArray.indexOf(item.item);
  
        if (indexOfItemToBeDeleted !== -1) {
          // Create a new array without the item to be deleted
          const newArray = [...LSGroceryListArray.slice(0, indexOfItemToBeDeleted), ...LSGroceryListArray.slice(indexOfItemToBeDeleted + 1)];
  
          // Update LocalStorage with the new array
          localStorage.setItem("list", JSON.stringify(newArray));
        }
      }
  
      dispatch(removeItemFromList(item));
      setConfirmDelete(false);
      setDeleteDialog(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmDelete]);
  

  return (
    <>
      <Dialog open={deleteDialog}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span style={{ fontSize: "36px" }}>Delete {item.item}?</span>
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
      <div className="groceryListItem">
        <input
          className={`form-control form-control-lg groceryListItemInput ${
            item.completed ? "checked" : ""
          }`}
          type="text"
          placeholder={item.item}
          value={item.item ?? item}
          readOnly
          style={{ backgroundColor: "#ebe2ce", border: "2px black solid" }}
        />
        <Button
          onClick={handleDelete}
          variant="contained"
          startIcon={<DeleteIcon />}
          className="groceryItemDelButton"
          sx={{
            marginRight: 0.5,
            marginLeft: 1,
            paddingTop: 1,
            paddingBottom: 1,
            "@media (max-width: 768px)": {
              marginLeft: 0,
              marginRight: 0,
              fontSize: 12,
              minWidth: 2,
              paddingTop: 1.5,
              paddingBottom: 1.5,
            },
          }}
        >
          Delete
        </Button>
        <input
          className="itemCheckbox"
          type="checkbox"
          checked={item.completed}
          onChange={handleCheckboxChange}
        />
      </div>
    </>
  );
};

export default GroceryListItem;
