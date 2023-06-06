//? REACT
import React, { useEffect, useState } from 'react';

//? REDUX
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromList } from '../Store/GroceryListSlice';

//? MATERIAL UI
import { Dialog, DialogContentText, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

//? STYLES
import 'bootstrap/dist/css/bootstrap.css';

const GroceryListItem = (item) => {
    const [checked, setIsChecked] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [makeTextInvisibleWhenModalCloses, setMakeTextInvisibleWhenModalCloses] = useState(false);
    const itemString = Object.values(item)[0] || 'Enter item';

    const dispatch = useDispatch();

    const handleCheckboxChange = () => {
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
        dispatch(removeItemFromList(itemString));
        setConfirmDelete(false);
        setDeleteDialog(false);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmDelete]);    
    
  return (
    <>
        <div className='' style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minWidth: '54vw'}}>
            <input className={`form-control form-control-lg groceryListItemInput ${checked ? 'checked' : ''}`} type="text" placeholder={itemString} value={itemString} readOnly={checked ? true : false} style={{backgroundColor: 'yellow'}} />
            <button onClick={handleDelete}>Delete</button>
            <Dialog open={deleteDialog} >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Delete {itemString}?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button onClick={handleClose}>❌</button>
                <button onClick={handleConfirmDelete}>✅</button>
              </DialogActions>
            </Dialog>
            <input className='itemCheckbox' type='checkbox' checked={checked} onChange={handleCheckboxChange} />
        </div>
    </>
  );
};

export default GroceryListItem;