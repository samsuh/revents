import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import EventDetailsHeader from "./EventDetailsHeader";
import EventDetailsInfo from "./EventDetailsInfo";
import EventDetailsChat from "./EventDetailsChat";
import EventDetailsSidebar from "./EventDetailsSidebar";
import { withFirestore } from "react-redux-firebase";
// import { toastr } from "react-redux-toastr";
import { objectToArray } from "../../../app/common/util/helpers";
import { goingToEvent, cancelGoingToEvent } from "../../user/userActions";

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (
    state.firestore.ordered.events &&
    state.firestore.ordered.events.length > 0
  ) {
    event =
      state.firestore.ordered.events.filter(
        (event) => event.id === eventId
      )[0] || {};
  }

  return { event, auth: state.firebase.auth };
};
const actions = {
  goingToEvent,
  cancelGoingToEvent,
};

class EventDetailsPage extends Component {
  async componentDidMount() {
    // const { firestore, match, history } = this.props;
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
    // let event = await firestore.get(`events/${match.params.id}`);
    // console.log(event);
    // if (!event.exists) {
    //   history.push("/events");
    //   toastr.error("Event not Found", "Check url and try again");
    // }
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const { event, auth, goingToEvent, cancelGoingToEvent } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some((a) => a.id === auth.uid);
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailsHeader
            event={event}
            isGoing={isGoing}
            isHost={isHost}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
          />
          <EventDetailsInfo event={event} />
          <EventDetailsChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailsSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(mapStateToProps, actions)(EventDetailsPage)
);
