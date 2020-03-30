import React from "react";
import axios from "axios";
import DenseTable from "./table";

import "./App.css";
import InventoryList from "./InventoryList";


class App extends React.Component {

  state = {
    itemName: '',
    location: '',
    section: '',
    shelf: '',
    bin: '',
    description: '',
    items: [],
    search: ''
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
      location: this.state.location,
      section: this.state.section,
      shelf: this.state.shelf,
      bin: this.state.bin,
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
      location: '',
      section: '',
      shelf: '',
      bin: '',
      description: ''
    });
  };

  displayItems = (items) => {
    if (!items.length) return null;

    let filteredItems = items.filter((item) => {
      if (item.itemName.toLowerCase().indexOf(this.state.search) !== -1 || item.description.toLowerCase().indexOf(this.state.search) !== -1) {
        return item;
      }

    });

    return filteredItems.map((item, index) => (
      <div key={index}>
        <h3>{item.itemName}</h3>
        <ul>
          <li>Location: {item.location}</li>
          <li>Section: {item.section}</li>
          <li>Shelf: {item.shelf}</li>
          <li>Bin: {item.bin}</li>
          <li>Keywords: {item.description}</li>
        </ul>
      </div>
    ));
  };

  render() {
    console.log('State: ', this.state);
    //JSX
    return (
      <div>
        <InventoryList items={this.state.items} />
        <h1>Inventory App</h1>
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
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={this.state.location}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="section"
              placeholder="Section"
              value={this.state.section}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="shelf"
              placeholder="Shelf"
              value={this.state.shelf}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="bin"
              placeholder="Bin"
              value={this.state.bin}
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
        <div>
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </div>
        <div className='items' >
          {this.displayItems(this.state.items)}
        </div>
      </div>
    )
  }
}

export default App;