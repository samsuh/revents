import React, { Component } from "react";
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
// import { format, parseISO } from "date-fns";
import { format } from "date-fns";

export default class EventListItem extends Component {
  render() {
    // const { event, selectEvent, deleteEvent } = this.props;
    // const { event, deleteEvent } = this.props;
    const { event } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                {/* <Item.Header as="a">{event.title}</Item.Header> */}
                <Item.Header>{event.title}</Item.Header>
                <Item.Description>
                  {/* Hosted by <a>{event.hostedBy}</a> */}
                  Hosted by {event.hostedBy}
                </Item.Description>
                {event.cancelled && (
                  <Label
                    style={{ top: "-40px" }}
                    ribbon="right"
                    color="red"
                    content="This event has been cancelled"
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            {/* <Icon name="clock" /> {format(parseISO(event.date), "EEE LLL do")}{" "}
            at {format(parseISO(event.date), "h:mm a")} |
            <Icon name="marker" /> {event.venue} */}
            <Icon name="clock" />
            {format(event.date.toDate(), "EEE LLL do")} at
            {format(event.date.toDate(), "h:mm a")} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              // event.attendees.map((attendee) => (
              //   <EventListAttendee key={attendee.id} attendee={attendee} />
              // ))
              Object.values(event.attendees).map((attendee, index) => (
                <EventListAttendee key={index} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          {/* <Button
            as="a"
            color="red"
            floated="right"
            content="Delete"
            onClick={() => deleteEvent(event.id)}
          /> */}
          <Button
            as={Link}
            to={`events/${event.id}`}
            color="teal"
            floated="right"
            content="View"
            // as="a"
            // onClick={() => selectEvent(event)}
          />
        </Segment>
      </Segment.Group>
    );
  }
}
