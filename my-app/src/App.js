import React from "react";
import axios from "axios";
import DenseTable from "./table";

import "./App.css";


class App extends React.Component {

  state = {
    itemName: '',
    description: '',
    items: []
  };

  componentDidMount = () => {
    this.getInventoryItems();
  };

  getInventoryItems = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ items: data });
        console.log('');
      })
      .catch(() => {
        alert('Error retrieving data');
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      itemName: this.state.itemName,
      description: this.state.description
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent');
        this.resetUserInputs();
        this.getInventoryItems();
      })
      .catch(() => {
        console.log('Data could not send');
      });

  };

  resetUserInputs = () => {
    this.setState({
      itemName: '',
      description: ''
    });
  };

  displayItems = (items) => {
    if (!items.length) return null;

    return items.map((item, index) => (
      <div key={index}>
        <h3>{item.itemName}</h3>
        <p>{item.description}</p>
      </div>
    ));
  };

  render() {
    console.log('State: ', this.state);
    //JSX
    return (
      <div>
        <h1>Welcome to my App</h1>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={this.state.itemName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              name="description"
              cols="30"
              rows="10"
              placeholder="Item Description"
              value={this.state.description}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <button>Submit</button>
        </form>
        <div className='items' >
          {this.displayItems(this.state.items)}
        </div>
      </div>
    )
  }
}

export default App;