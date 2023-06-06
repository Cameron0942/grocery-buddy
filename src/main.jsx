//? REACT
import React from 'react';
import ReactDOM from 'react-dom/client';

//? STYLES
import './index.css';

//? COMPONENTS
import Title from './Components/Title.jsx';
import InputArea from './Components/InputArea';
import GroceryList from './Components/GroceryList';

//? REDUX
import { store } from './Store/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <Title />
      <InputArea />
      <GroceryList />
    </Provider>
  </>
)
