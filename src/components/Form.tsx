import * as React from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { Mutation } from "@apollo/react-components";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { push } from "connected-react-router";
import Button from "./Button";
import { marginLeft, width } from "styled-system";
import { FaSubway, FaCar } from "react-icons/fa";

const CREATE_MEETUP = gql`
  mutation CreateMeetup(
    $title: String
    $description: String
    $categoryIds: [ID!]!
    $travelTime: Int!
    $meansOfTransport: String!
    $datetime: Int!
    $username: String!
    $location: String!
  ) {
    createMeetup(
      title: $title
      description: $description
      categoryIds: $categoryIds
      travelTime: $travelTime
      meansOfTransport: $meansOfTransport
      datetime: $datetime
      username: $username
      location: $location
    ) {
      id
      token
    }
  }
`;

const Input = styled.input`
  display: block;
  outline: 0;
  border-width: 0 0 2px;
  border-color: #3f3f3f;
  text-indent: 10px;
  font-size: 1.5em;
  width: 100%;
  height: 2em;
`;

const Label = styled.label`
  display: block;
  font-size: 1.5rem;
  margin-bottom: 1em;
`;

interface IState {
  currLoc?: string;
  currDate?: string;
  travelTime?: string;
  arrivalTime?: string;
}
interface IProps {
  selectedCategories: number[];
  dispatch: ThunkDispatch<void, void, AnyAction>;
}
class Form extends React.Component<IProps, IState> {
  state = {
    currLoc: "",
    currDate: "",
    travelTime: "",
    arrivalTime: "",
    username: ""
  };

  handleInputChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Mutation mutation={CREATE_MEETUP}>
        {(createMeetup: any, result: any) => {
          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();

                createMeetup({
                  variables: {
                    categoryIds: this.props.selectedCategories,
                    travelTime: parseInt(this.state.travelTime) * 60,
                    meansOfTransport: "public_transport",
                    datetime:
                      new Date(
                        this.state.currDate +
                          "T" +
                          this.state.arrivalTime +
                          "+02:00"
                      ).getTime() / 1000,
                    username: this.state.username,
                    location: this.state.currLoc
                  }
                }).then((result: any) => {
                  const meetup = result.data.createMeetup;

                  this.props.dispatch(
                    push(`/meetup/${meetup.id}/${meetup.token}`)
                  );
                });
              }}
            >
              <div style={{ marginTop: "2rem" }}>
                <div
                  style={{
                    width: "50%",
                    float: "left"
                  }}
                >
                  <div>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                    />
                    <Label htmlFor="username">Username</Label>
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="currLoc"
                      id="currLoc"
                      value={this.state.currLoc}
                      onChange={this.handleInputChange}
                    />
                    <Label htmlFor="currLoc">Current Location</Label>
                  </div>
                  <div>
                    <Input
                      type="date"
                      value={this.state.currDate}
                      name="currDate"
                      id="currDate"
                      onChange={this.handleInputChange}
                    />
                    <Label htmlFor="currDate">Arrival Date</Label>
                  </div>
                  <div>
                    <Input
                      type="time"
                      value={this.state.arrivalTime}
                      name="arrivalTime"
                      id="arrivalTime"
                      onChange={this.handleInputChange}
                    />
                    <Label htmlFor="arrivalTime">Arrival Time</Label>
                  </div>
                  <div>
                    <Input
                      type="text"
                      value={this.state.travelTime}
                      name="travelTime"
                      id="travelTime"
                      onChange={this.handleInputChange}
                    />
                    <Label htmlFor="travelTime">Max travel time (min)</Label>
                  </div>
                  <Button marginTop marginBottom type="submit">
                    Find Events
                  </Button>
                </div>
              </div>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default connect()(Form);
