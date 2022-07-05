/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

// start the Stimulus application
// import './bootstrap';


import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';


import './utils/i18n';

import Default from './components/Default';
import AllGames from './components/AllGames';


// Default
if(document.getElementById('default') !== null) {
    var root = createRoot(document.getElementById('default'));
    var elt = <Default />;
    root.render(elt);
}

if(document.getElementById('allgames') !== null) {
    var root = createRoot(document.getElementById('allgames'));
    if(typeof document.getElementById('allgames').dataset.user !== 'undefined') {
        var datas = [];
        var user = JSON.parse(document.getElementById('allgames').dataset.user);
        
        var elt = <AllGames datas={datas} user={user} />;
    } else {
        var elt = <AllGames />; 
    }
    
    root.render(elt);
}