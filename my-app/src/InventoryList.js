import React from "react";


class InventoryList extends React.Component {

    render() {
        console.log(this.props);
        return (
            <ul>
                <li>Pen  Basement cellar A 5 utensils, office</li>
            </ul>
        )
    }
}

export default InventoryList;