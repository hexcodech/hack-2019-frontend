import * as React from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { Mutation } from "@apollo/react-components";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { push } from "connected-react-router";

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
  border: 1px solid grey;
  border-radius: 4px;
  width: 50%;
  height: 3em;
  &:focus {
    box-shadow: 0 0 10px grey;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 2rem;
`;

const Button = styled.button`
  margin-top: 0.5rem;
  background-color: #239bcf;
  border: 2px solid #145875;
  height: 2rem;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
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
                    username: "",
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
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="currLoc">Current Location</Label>
                  <Input
                    type="text"
                    name="currLoc"
                    id="currLoc"
                    value={this.state.currLoc}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="currDate">Arrival Date</Label>
                  <Input
                    type="date"
                    value={this.state.currDate}
                    name="currDate"
                    id="currDate"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="arrivalTime">Arrival Time</Label>
                  <Input
                    type="time"
                    value={this.state.arrivalTime}
                    name="arrivalTime"
                    id="arrivalTime"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="travelTime">Max travel time (min)</Label>
                  <Input
                    type="text"
                    value={this.state.travelTime}
                    name="travelTime"
                    id="travelTime"
                    onChange={this.handleInputChange}
                  />
                </div>
                <Button type="submit">View Single</Button>
              </div>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default connect()(Form);
