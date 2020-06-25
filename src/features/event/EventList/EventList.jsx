import React, { Component } from "react";
import EventListItem from "./EventListItem";

export default class EventList extends Component {
  render() {
    return (
      <>
        <EventListItem />
        <EventListItem />
        <EventListItem />
      </>
    );
  }
}
