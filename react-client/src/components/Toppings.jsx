import React from 'react';
import $ from 'jquery';

class Toppings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toppings: [],
      selectedToppings: {}
    };

    this.handleToppingChange = this.handleToppingChange.bind(this);
  }

  componentWillMount() {
    $.ajax({
      url: '/toppings',
      method: 'GET',
      success: (data) => {
        this.setState({
          toppings: data
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  handleToppingChange(event) {
    var idx = event.target.value;
    var prevToppingsState = this.state.selectedToppings;
    if (prevToppingsState.hasOwnProperty(idx)) {
      delete prevToppingsState[idx];
    } else {
      prevToppingsState[idx] = this.state.toppings[idx];
    }

    this.setState({
      selectedToppings: prevToppingsState
    }, function(){
      this.props.onToppingChange(this.state.selectedToppings);
    });
  }

  render() {
    return (
      <div id="toppings">
        {this.state.toppings.map((topping, idx) =>
          <label>
            <input type="checkbox" value={idx} checked={this.state.selectedToppings[idx]} onChange={this.handleToppingChange}/>
            {topping.name}
          </label>
        )}
      </div>
    );
  }
}

export default Toppings;
