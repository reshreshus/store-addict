import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route} from 'react-router-dom';
import {Navbar, ProductList, Details, Cart, Default, PageNotFound, Model } from './components';


function App() {
  return (
   
    <React.Fragment>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={ProductList}/>
        <Route path="/details" exact component={Details}/>
        <Route path="/cart" exact component={Cart}/>
        <Route  component={PageNotFound}/>
      </Switch>
      <Model />
    </React.Fragment>
  );
}

export default App;
