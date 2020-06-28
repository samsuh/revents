import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from "revalidate";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    //now done through redux-form
    // title: "",
    // date: "",
    // city: "",
    // venue: "",
    // hostedBy: "",
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => event.id === eventId)[0];
  }

  // return { event };
  return { initialValues: event };
};

const actions = {
  createEvent,
  updateEvent,
};

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired({ message: "The category is required" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description must be at least 5 characters",
    })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date"),
});

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

class EventForm extends Component {
  //still keep local state for controlled input fields until reduxForm implemented
  // state = {
  //   ...this.props.event,
  // };

  // componentDidMount() {
  //   if (this.props.selectedEvent !== null) {
  //     // console.log(this.props.selectedEvent);
  //     this.setState({
  //       ...this.props.selectedEvent,
  //     });
  //   }
  // }

  onFormSubmit = (values) => {
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      //create a new event
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "TestHostHardCoded",
      };
      // this.props.createEvent(this.state);
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
    // console.log(values);
    // handleFormSubmit = (event) => {
    //   event.preventDefault();
    //   if (this.state.id) {
    //     this.props.updateEvent(this.state);
    //     this.props.history.push(`/events/${this.state.id}`);
    //   } else {
    //     //create a new event
    //     const newEvent = {
    //       ...this.state,
    //       id: cuid(),
    //       hostPhotoURL: "/assets/user.png",
    //     };
    //     // this.props.createEvent(this.state);
    //     this.props.createEvent(newEvent);
    //     // this.props.history.push(`/events/${newEvent.id}`);
    //     this.props.history.push(`/events`);
    //   }
    //   // console.log("form submitted. state: ", this.state);
  };

  render() {
    // const { cancelFormOpen } = this.props;
    // const { title, date, city, venue, hostedBy } = this.state;

    //fix goBack history
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete="off"
            >
              {/* <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              placeholder="First Name"
              value={title}
              onChange={(event) => this.setState({ title: event.target.value })}
            />
          </Form.Field> */}
              {/* Title Field using Redux Form  */}
              <Field
                name="title"
                component={TextInput}
                placeholder="Event Title"
              />
              <Field
                name="category"
                component={SelectInput}
                placeholder="Which category best describes your event?"
                options={category}
                // multiple={true}
              />
              <Field
                name="description"
                component={TextArea}
                placeholder="Tell us about your event"
                rows={3}
              />

              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                component={TextInput}
                placeholder="Event City"
              />
              <Field
                name="venue"
                component={TextInput}
                placeholder="Event Venue"
              />
              <Field
                name="date"
                component={DateInput}
                placeholder="Event Date"
                // dateFormat="EEE, LLL dd yyyy h :mm a"
                dateFormat="EEE, LLL dd yyyy h:mm a"
                showTimeSelect
                timeFormat="h:mm a"
              />
              {/* Before we implemented Redux-Form
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
          </Form.Field> */}
              <Button
                positive
                type="submit"
                disabled={invalid || submitting || pristine}
              >
                Submit
              </Button>
              {/* <Button type="button" onClick={cancelFormOpen}> */}
              {/* <Button type="button" onClick={this.props.history.goBack}> */}
              <Button
                type="button"
                onClick={
                  initialValues.id
                    ? () => history.push(`/events/${initialValues.id}`)
                    : () => history.push("/events")
                }
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(reduxForm({ form: "eventForm", validate })(EventForm));
