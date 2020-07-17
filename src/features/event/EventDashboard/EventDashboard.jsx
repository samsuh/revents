import React, { Component } from "react";
// import { Grid, Button } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
// import cuid from "cuid";
import { connect } from "react-redux";
import EventList from "../EventList/EventList";
// import EventForm from "../EventForm/EventForm";
// import { createEvent, updateEvent, deleteEvent } from "../eventActions";
import { createEvent, updateEvent } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";

const mapStateToProps = (state) => ({
  // events: state.events,
  events: state.firestore.ordered.events,
  loading: state.async.loading,
});

const actions = {
  createEvent,
  updateEvent,
  // deleteEvent,
};

class EventDashboard extends Component {
  // state = {
  //   // events: events,
  //   isOpen: false,
  //   selectedEvent: null,
  // };

  // handleIsOpenToggle = () => {
  //   this.setState(({ isOpen }) => ({
  //     isOpen: !isOpen,
  //   }));
  // };

  // handleCreateFormOpen = () => {
  //   this.setState({
  //     isOpen: true,
  //     selectedEvent: null,
  //   });
  // };

  // handleFormCancel = () => {
  //   this.setState({
  //     isOpen: false,
  //   });
  // };

  //takes in values from EventForm to create a new Event
  //uses fake id for now until we implement database to generate unique id. using 'cuid'
  // handleCreateEvent = (newEvent) => {
  //   newEvent.id = cuid();
  //   newEvent.hostPhotoURL = "/assets/user.png";
  //   this.props.createEvent(newEvent);
  //   // this.setState(({ events }) => ({
  //   //   // events: [...events, newEvent],
  //   //   isOpen: false,
  //   // }));
  // };

  // handleSelectEvent = (event) => {
  //   this.setState({
  //     selectedEvent: event,
  //     isOpen: true,
  //   });
  // };

  // handleUpdateEvent = (updatedEvent) => {
  //   this.props.updateEvent(updatedEvent);
  //   // this.setState(({ events }) => ({
  //   //   // events: events.map((event) => {
  //   //   //   if (event.id === updatedEvent.id) {
  //   //   //     return { ...updatedEvent };
  //   //   //   } else {
  //   //   //     return event;
  //   //   //   }
  //   //   // }),
  //   //   isOpen: false,
  //   //   selectedEvent: null,
  //   // }));
  // };

  handleDeleteEvent = (id) => {
    this.props.deleteEvent(id);
    // this.setState(({ events }) => ({
    //   //returns new array that exclused the event with the id we pass in
    //   events: events.filter((e) => e.id !== id),
    // }));
  };

  render() {
    // const { isOpen, selectedEvent } = this.state;
    const { events, loading } = this.props;
    // const { events, isOpen, selectedEvent } = this.state; //no longer getting props from state after mapping state to props
    // console.log("selectedEvent from Dashboard", selectedEvent);
    if (loading) return <LoadingComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            // selectEvent={this.handleSelectEvent}
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          {/* <h2>Activity Feed Goes Here</h2> */}
          <EventActivity />
          {/* <Button
            positive
            content="Create Event"
            onClick={this.handleCreateFormOpen}
          />
          {isOpen && (
            <EventForm
              key={selectedEvent ? selectedEvent.id : 0}
              createEvent={this.handleCreateEvent}
              cancelFormOpen={this.handleFormCancel}
              selectedEvent={selectedEvent}
              updateEvent={this.handleUpdateEvent}
            />
          )} */}
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
