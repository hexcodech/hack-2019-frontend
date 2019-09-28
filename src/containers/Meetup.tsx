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
                  <h1>{meetup.title}</h1>
                  Users:
                  <ul>
                    {meetup.users.map(user => (
                      <li>{user.name}</li>
                    ))}
                  </ul>
                  Event recommendations:
                  <div>
                    {meetup.events.map(event => (
                      <div>
                        <h2>{event.title}</h2>
                        <div>Rating: {event.rating}</div>
                        <div>PriceLevel: {event.priceLevel}</div>
                      </div>
                    ))}
                  </div>
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
