/* eslint-disable react/prop-types */
//? REACT
import { useEffect, useState } from 'react';

//? REDUX
import { useDispatch } from 'react-redux';
import { removeItemFromList, toggleComplete } from '../Store/GroceryListSlice';

//? MATERIAL UI
import { Dialog, DialogContentText, DialogActions, DialogContent } from '@material-ui/core';

//? STYLES
import 'bootstrap/dist/css/bootstrap.css';

// eslint-disable-next-line react/prop-types
const GroceryListItem = ({item, index}) => {
    const [checked, setIsChecked] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const dispatch = useDispatch();

    const handleCheckboxChange = () => {
      dispatch(toggleComplete({id: index, completed: !checked}));
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
      if(confirmDelete){
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
              Delete {item.item}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>❌</button>
            <button onClick={handleConfirmDelete}>✅</button>
          </DialogActions>
        </Dialog>
        <div className='' style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minWidth: '54vw'}}>
            <input className={`form-control form-control-lg groceryListItemInput ${item.completed ? 'checked' : ''}`} type="text" placeholder={item.item} value={item.item} readOnly style={{backgroundColor: 'yellow'}} />
            <button onClick={handleDelete}>Delete</button>
            <input className='itemCheckbox' type='checkbox' checked={item.completed} onChange={handleCheckboxChange} />
        </div>
    </>
  );
};

export default GroceryListItem;