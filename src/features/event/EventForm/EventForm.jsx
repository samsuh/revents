import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Form, Button } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: "",
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => event.id === eventId)[0];
  }

  return { event };
};

const actions = {
  createEvent,
  updateEvent,
};

class EventForm extends Component {
  //still keep local state for controlled input fields
  state = {
    ...this.props.event,
  };

  componentDidMount() {
    if (this.props.selectedEvent !== null) {
      // console.log(this.props.selectedEvent);
      this.setState({
        ...this.props.selectedEvent,
      });
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.id) {
      this.props.updateEvent(this.state);
      this.props.history.push(`/events/${this.state.id}`);
    } else {
      //create a new event
      const newEvent = {
        ...this.state,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
      };
      // this.props.createEvent(this.state);
      this.props.createEvent(newEvent);
      // this.props.history.push(`/events/${newEvent.id}`);
      this.props.history.push(`/events`);
    }
    // console.log("form submitted. state: ", this.state);
  };

  render() {
    // const { cancelFormOpen } = this.props;
    const { title, date, city, venue, hostedBy } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit} autoComplete="off">
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              placeholder="First Name"
              value={title}
              onChange={(event) => this.setState({ title: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              type="date"
              value={date}
              placeholder="Event Date"
              onChange={(event) => this.setState({ date: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              value={city}
              placeholder="City event is taking place"
              onChange={(event) => this.setState({ city: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              value={venue}
              placeholder="Enter the Venue of the event"
              onChange={(event) => this.setState({ venue: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              value={hostedBy}
              placeholder="Enter the name of person hosting"
              onChange={(event) =>
                this.setState({ hostedBy: event.target.value })
              }
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          {/* <Button type="button" onClick={cancelFormOpen}> */}
          <Button type="button" onClick={this.props.history.goBack}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapStateToProps, actions)(EventForm);
