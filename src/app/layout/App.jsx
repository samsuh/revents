import React, { Component } from "react";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import EventDetailsPage from "../../features/event/EventDetailsPage/EventDetailsPage";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import UserDetailsPage from "../../features/user/UserDetailsPage/UserDetailsPage";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import EventForm from "../../features/event/EventForm/EventForm";

class App extends Component {
  render() {
    return (
      <>
        <Route path="/" exact component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <>
              <NavBar />
              <Container className="main">
                <Route path="/events" component={EventDashboard} />
                <Route path="/events/:id" component={EventDetailsPage} />
                <Route path="/people" component={PeopleDashboard} />
                <Route path="/profile/:id" component={UserDetailsPage} />
                <Route path="/settings" component={SettingsDashboard} />
                <Route path="/createEvent" component={EventForm} />
              </Container>
            </>
          )}
        />
      </>
    );
  }
}

export default App;
