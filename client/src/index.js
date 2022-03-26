import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/home';

function Application() {
    return (<div>
        <Home />
    </div>)
}

ReactDOM.render(
    <Application />,
    document.getElementById('app-main')
);