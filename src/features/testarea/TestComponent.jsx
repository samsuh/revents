import React, { Component } from "react";
import { connect } from "react-redux";
// import { incrementCounter, decrementCounter } from "./testActions";
import { incrementAsync, decrementAsync } from "./testActions";
import { Button } from "semantic-ui-react";
import TestPlaceInput from "./TestPlaceInput";
import { openModal } from "../modals/modalActions";

const mapStateToProps = (state) => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName,
});

const mapDispatchToProps = {
  // incrementCounter,
  // decrementCounter,
  incrementAsync,
  decrementAsync,
  openModal,
};

// const actions = {
//   openModal,
// };

class TestComponent extends Component {
  render() {
    // const { data, incrementCounter, decrementCounter, openModal } = this.props;
    const {
      data,
      incrementAsync,
      decrementAsync,
      openModal,
      loading,
      buttonName,
    } = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>The answer is: {data}</h3>
        <Button
          name="increment"
          loading={buttonName === "increment" && loading}
          onClick={(e) => incrementAsync(e.target.name)}
          positive
          content="Increment"
        />
        <Button
          name="decrement"
          loading={buttonName === "decrement" && loading}
          onClick={(e) => decrementAsync(e.target.name)}
          negative
          content="Decrement"
        />
        <Button
          onClick={() => openModal("TestModal", { data: 42 })}
          color="teal"
          content="Open Modal"
        />
        <br />
        <br />
        <h4>Testing Google Places Autocompletion </h4>
        <TestPlaceInput />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
