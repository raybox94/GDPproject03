import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import * as serviceWorker from './serviceWorker';
import history from './history'
import { green, lightGreen, grey } from '@material-ui/core/colors';

ReactDOM.render((
   <Router history={history}>
   <div  style={{minHeight: 1000,background: grey[200]}}>
     <App />
     </div>
    </Router>
  ), document.getElementById('root'))

  
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
