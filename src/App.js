import React, { Component } from "react";
import "./App.css";
import OrderList from "./components/OrderList";

class App extends Component {
  
  render() {
    
    return (
      <div className="mainContainer">
        <div className="topHeading">
          <h1>Pizzas Orders</h1>
        </div>
        <OrderList />
      </div>
    );
  }
}

export default App;