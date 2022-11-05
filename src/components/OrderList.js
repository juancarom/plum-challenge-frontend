import React, { Component } from "react";
import axios from "axios";

import { ReactDOM } from "react";
import PizzaElement from "./PizzaElement";






class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      temp_order: [],
      inputValue: "",
      pizzas: [],
      pizzaG: [],
    };
  }
  toggleIsActive() {

    this.setState({temp_order: [!this.state.temp_order, '1']});
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
   

    //data.get(fieldName)
    //this.state.inputValue = "0";
    console.log("Pizza");
    console.log(data.get("chosen-pizza"));
    console.log("Cantidad");
    console.log(data.get("chosen-quantity"));
    
  }
  loadPizza(idPizza) {
    axios
      .get(`/api/pizzas/${idPizza}`)
      .then((res) => {
        this.setState ({ pizzaG: res.data });
      })
      .catch((error) => console.log(error));
  }
  
  loadOrders() {
    axios
      .get("/api/orders")
      .then((res) => {
        this.setState({ orders: res.data });
      })
      .catch((error) => console.log(error));
  }

  loadPizzas() {
    axios
      .get("/api/pizzas")
      .then((res) => {
        this.setState({ pizzas: res.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.loadOrders();
    this.loadPizzas();
  }
  addItemToOrder(){
    alert("a")
  }
  
  
  
  render() {
    
    return (
      <div>
        
        <div className="pizzaForm card">
          <h3>Add Pizza to your Pending Order</h3>
          <p><label>Pizza:</label></p>
          <form onSubmit={this.handleSubmit} className="orderListForm"> 
            <select className="chosen-pizza form-select" name="chosen-pizza">
              {this.state.pizzas.map((pizza) => {
                return (
                  <option value={pizza.id}>
                    {pizza.name} 
                  </option>
                );
              })}
            </select>
            <p><label>Quantity: </label></p>
            <input type="number" className="chosen-quantity form-control" id="chosen-quantity" name="chosen-quantity"></input>
            <br/>
            <button className="btn btn-primary" onClick={() => this.setState({ 
              
                temp_order: [this.state.temp_order, 
                  [ 
                    document.getElementsByClassName("chosen-quantity")[0].value , document.getElementsByClassName("chosen-pizza")[0].value
                  ]] 
              
              })}>
              Add to Order
              
            </button>
          </form> 
          <br/>
        </div>
        
        <div className="tempOrderForm card">
          <h3>Pending Order</h3>
          {this.state.temp_order.map( (temp_order_item) => {
              return (
              <div>  {this.loadPizza(temp_order_item[0])}   </div>
                )

          })}
          <button className="btn btn-primary">
            Close Order 
          </button>
          
          <br/>

        </div>
        <br/>
        <div className="ordersContainer card">
          <h3>Existing Orders</h3>
          
          <ul className="ordersList">
            {this.state.orders.map((order) => {
              return (
                <li className="orders" order={order} key={order.id}>
                  <label className="itemDisplay">Orden Nro: {order.number}</label>
                  {order.order_items.map((order_item) => {
                    return (
                      <div className="orderItem" order_item={order_item} key={order_item.id}>
                        <label className="pizzaOrderItem"><b>Tipo de pizza: </b>{order_item.pizza.name}</label> - 
                        <label className="quantityOrderItem"><b>Cantidad:</b> {order_item.quantity}</label>
                        
                      </div>
                    );
                  })}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default OrderList;