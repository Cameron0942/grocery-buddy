//? REACT
import ReactDOM from 'react-dom/client';

//? STYLES
import './index.css';

//? COMPONENTS
import App from './App';

//? REDUX
import { store } from './Store/store';
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
)
