import React, { Component } from "react";
import axios from "axios";

import { ReactDOM } from "react";






class PizzaElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pizza: [],
      idPizza: "",
    };
  }
    
 
  loadPizza() {
    axios
      .get(`/api/pizzas/2`)
      .then((res) => {
        this.setState({ pizza: res.data });
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.loadPizza();
  }
  addItemToOrder(){
    alert("a")
  }
  
  
  
  render() {
    
    return (
      <div>
        
        <div className="pizzaElement card">
          <h3>Item</h3>
          <p><label>Pizza:</label></p>
            { this.state.pizza.name }
          <br/>
        </div>
        
      </div>
    );
  }
}

export default PizzaElement;