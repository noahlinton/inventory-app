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
    search: '',
    selectedFilter: "everywhere",
    keywords: ''
  };

  componentDidMount = () => {
    this.getInventoryItems();
  };

  getInventoryItems = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ items: data });
        console.log('Data:', data);
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
      description: this.state.description,
      keywords: this.state.keywords
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
      description: '',
      keywords: ''
    });
  };

  displayItems = (items) => {
    if (!items.length) return null;
    //|| item.location.toLowerCase().indexOf(this.state.selectedFilter) !== -1
    console.log("Items from server", items);
    let locationFilterItems = items.filter((item) => {
      if (this.state.selectedFilter.toLowerCase() == "truck") {
        if (item.location != null && item.location.toLowerCase() == "truck") {
          return item;
        }
      } else {
        return item;
      }
    });

    let filteredItems = locationFilterItems.filter((item) => {
      if (item.itemName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || item.keywords.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) {
        return item;
      }

    });

    return filteredItems.map((item, index) => (
      <div key={index}>
        <h3>{item.itemName}</h3>
        <p>{item.description}</p>
        <ul>
          <li>Location: {item.location}</li>
          <li>Section: {item.section}</li>
          <li>Shelf: {item.shelf}</li>
          <li>Bin: {item.bin}</li>
          <li>Keywords: {item.keywords}</li>
        </ul>
        <button>Add to Used List</button>
      </div>
    ));
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedFilter: changeEvent.target.value
    });
  };

  render() {
    console.log('State: ', this.state);
    //JSX
    return (
      <div className="app">
        <h1 id="main-header">Inventory App</h1>
        <div className="form-display">
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
                name="description"
                placeholder="Description"
                value={this.state.description}
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
                name="keywords"
                cols="30"
                rows="2"
                placeholder="Item Keywords"
                value={this.state.keywords}
                onChange={this.handleChange}
              ></textarea>
            </div>
            <button>Submit</button>
          </form>
        </div>
        <div className="search-bar">
          <input
            className="search-bar"
            type="text"
            name="search"
            placeholder="Search"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <label>
            <input
              type="radio"
              name="react-tips"
              value="Truck"
              checked={this.state.selectedFilter === "Truck"}
              onChange={this.handleOptionChange}
              className="form-check-input"
            />
            Truck Only
          </label>
          <label>
            <input
              type="radio"
              name="react-tips"
              value="everywhere"
              checked={this.state.selectedFilter === "everywhere"}
              onChange={this.handleOptionChange}
              className="form-check-input"
            />
            Everywhere
          </label>
        </div>
        <div className='items' >
          {this.displayItems(this.state.items)}
        </div>
      </div>
    )
  }
}

export default App;