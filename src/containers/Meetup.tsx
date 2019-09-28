import * as React from "react";
import styled from "styled-components";
import { Flex, Box } from "reflexbox";
import { IconType } from "react-icons/lib/cjs";
import Form from "../components/Form";
import Container from "../components/Container";
import { Query } from "@apollo/react-components";
import gql from "graphql-tag";
import ReactHeader from "../components/ReactHeader";

const GET_MEETUP = gql`
  query meetup($id: ID!) {
    meetup(id: $id) {
      title
      description
      maxTravelTime
      users {
        name
      }
      events {
        title
        description
        rating
        priceLevel
      }
    }
  }
`;

const Input = styled.input `
  display: block;
  outline: 0;
  border-width: 0 0 2px;
  border-color: #3F3F3F;
  text-indent: 10px; 
  font-size: 1.5em;
  width: 50%;
  height: 2em;
`;

const Label = styled.label `
  display: block;
  font-size: 1.5rem;
  margin-bottom: 1em;
`;

const Button = styled.button `
  margin-top: 0.5rem;
  font-size: 1rem;
  background-color: #34ace0;
  color: #ffff;
  border: none;
  padding: 1.2rem;
  border-radius: 4px;
  &:hover{
    cursor: pointer;
    background-color: #277FA8;
  }
  &:active{
    background-color: #227093;
  }
`;

const OuterDiv = styled.div`
  border-top: 1px solid black;
  padding: 1rem;
`;

const InnerDiv1 = styled.div`
  
`;

const InnerDiv2 = styled.div`
  padding-top: 0.5rem;
`;

const Events = styled.div`
  font-size: 2em;
  padding-bottom: 0.5rem;
`;

const MeetupContainer = styled.div`
  height: 100%;
`;

const BackgroundImg = styled.div`
  background-image: url("https://source.unsplash.com/collection/1849603/1600x900");
  background-position: center;
  background-size: 100%;
  border-radius: 5px;

  width: 100%;
  height: 20rem;

  margin: 2rem 0;
`;

interface Props {
  match: any;
}

const Meetup: React.SFC<Props> = React.memo(
  ({
    match: {
      params: { id, token }
    }
  }) => {
    return (
      <MeetupContainer>
        <ReactHeader />
        <Container>
          <Query
            query={GET_MEETUP}
            variables={{ id }}
            notifyOnNetworkStatusChange
          >
            {(result: any) => {
              const { loading, error, data, refetch } = result;

              if (loading) {
                return <div>Loading</div>;
              }

              const { meetup } = data;

              return (
                <div>
                  <OuterDiv>
                    <h1>{meetup.title}</h1>
                    Users:
                    <ul>
                      {meetup.users.map((user: any, index: number) => (
                        <li key={index}>{user.name}</li>
                      ))}
                    </ul>
                  </OuterDiv>
                  <Events>
                    Event recommendations:
                  </Events>
                  <OuterDiv>
                    {meetup.events.map((event: any, index: number) => (
                      <div key={index}>
                        <h2>{event.title}</h2>
                        <InnerDiv1>Rating: {event.rating}</InnerDiv1>
                        <InnerDiv2>PriceLevel: {event.priceLevel}</InnerDiv2>
                      </div>
                    ))}
                  </OuterDiv>
                </div>
              );
            }}
          </Query>
        </Container>
      </MeetupContainer>
    );
  }
);

export default Meetup;
