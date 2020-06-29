import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementCounter, decrementCounter } from "./testActions";
import { Button } from "semantic-ui-react";
import TestPlaceInput from "./TestPlaceInput";

const mapStateToProps = (state) => ({
  data: state.test.data,
});

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter,
};

class TestComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter } = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} positive content="Increment" />
        <Button onClick={decrementCounter} negative content="Decrement" />
        <br />
        <br />
        <h4>Testing Google Places Autocompletion </h4>
        <TestPlaceInput />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
