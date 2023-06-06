//? REACT
import React, { useEffect, useState } from 'react';

//? COMPONENTS

//? STYLES
import 'bootstrap/dist/css/bootstrap.css';

const GroceryListItem = (item) => {
    const itemString = Object.values(item)[0] || 'Enter item';
    
  return (
    <>
        <div className='' style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <input className="form-control form-control-lg groceryListItemInput" type="text" placeholder={itemString} value={itemString}  readOnly/>
            <button>Delete</button>
            <button>Edit</button>
            <button>Checkmark</button>
        </div>
    </>
  );
};

export default GroceryListItem;