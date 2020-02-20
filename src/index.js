import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

// //Uncomment block for lbg branding
// import { BrandProvider, LLOYDS } from '@lbg/constellation';
// ReactDOM.render(<BrandProvider brand={LLOYDS}><App /></BrandProvider>, document.getElementById('root'));
// // end of lbg branding

//Uncomment block for non-lbg branding
ReactDOM.render(<App></App>, document.getElementById('root'));
// end of non-lbg branding

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls..
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


