import * as React from "react";
import styled from "styled-components";
import { Flex, Box } from "reflexbox";
import { IconType } from "react-icons/lib/cjs";
import Form from "../components/Form";
import Container from "../components/Container";
import { Query, Mutation } from "@apollo/react-components";
import gql from "graphql-tag";
import ReactHeader from "../components/ReactHeader";
import Button from "../components/Button";

const GOOGLE_MAPS_API_KEY: string = process.env.GOOGLE_MAPS_API_KEY || "";

const GET_MEETUP = gql`
  query meetup($id: ID!) {
    meetup(id: $id) {
      title
      description
      maxTravelTime
      users {
        name
        meetupRelation(meetupId: $id) {
          longitude
          latitude
          meansOfTransport
        }
      }
      events {
        title
        description
        rating
        priceLevel
        longitude
        latitude
        placeId
      }
    }
  }
`;

const JOIN_MEETUP = gql`
  mutation JoinMeetup(
    $meansOfTransport: String!
    $username: String!
    $location: String!
    $meetupId: ID!
  ) {
    joinMeetup(
      meansOfTransport: $meansOfTransport
      username: $username
      location: $location
      meetupId: $meetupId
    ) {
      id
      token
    }
  }
`;

const OuterDiv = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  padding: 1rem;
  margin-bottom: 2rem;
`;

const InnerDiv1 = styled.div``;

const InnerDiv2 = styled.div`
  padding-top: 0.5rem;
`;

const Events = styled.div`
  font-size: 2em;
  padding-bottom: 0.5rem;
`;

const Event = styled(Flex)`
  margin-bottom: 1rem !important;
`;

const MeetupContainer = styled.div`
  height: 100%;
`;

const IFrame = styled.div`
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;

  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;

    border: 0;
    border-radius: 5px;
  }
`;

const Join = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`;

const User = styled.div`
  strong {
    font-size: 1.5rem;
  }
`;

const BackgroundImg = styled.div`
  background-image: url("https://source.unsplash.com/1600x900/?bar,restaurant,cinema");
  background-position: center;
  background-size: 100%;
  border-radius: 5px;

  width: 100%;
  height: 20rem;

  margin: 2rem 0;
`;

const MAP_MEANS_OF_TRANSPORT_TO_GOOGLE_MAPS_MODE: any = {
  public_transport: "transit",
  driving: "driving"
};

const MAP_MEANS_OF_TRANSPORT_TO_LABEL: any = {
  public_transport: "Public Transport",
  driving: "Driving"
};

interface Props {
  match: any;
}

const Location: React.SFC<{ children: React.ReactNode }> = React.memo(
  ({ children }) => {
    const [show, setShow] = React.useState(false);

    return <div>{children}</div>;
  }
);

const Meetup: React.SFC<Props> = React.memo(
  ({
    match: {
      params: { id, token }
    }
  }) => {
    return (
      <MeetupContainer>
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
            const currentUser = meetup.users[0]; //hardcoded

            const mode =
              MAP_MEANS_OF_TRANSPORT_TO_GOOGLE_MAPS_MODE[
                currentUser.meetupRelation.meansOfTransport
              ];
            const lat = currentUser.meetupRelation.latitude,
              lng = currentUser.meetupRelation.longitude;
            return (
              <div>
                <div style={{ position: "relative" }}>
                  <BackgroundImg />
                  <Mutation mutation={JOIN_MEETUP}>
                    {(joinMeetup: any, result: any) => (
                      <Join>
                        <Button
                          onClick={() => {
                            const location = prompt("Whats your Location?");
                            const meansOfTransport = prompt(
                              "How do you arrive?",
                              "public_transport"
                            );
                            const username = prompt("Whats your name?");

                            if (location && meansOfTransport && username) {
                              joinMeetup({
                                variables: {
                                  location,
                                  meansOfTransport,
                                  username,
                                  meetupId: id
                                }
                              }).then(() => {
                                refetch();
                              });
                            }
                          }}
                        >
                          Join Meetup
                        </Button>
                      </Join>
                    )}
                  </Mutation>
                </div>
                <OuterDiv>
                  {false && <h1>{meetup.title}</h1>}
                  <div>
                    {meetup.users.map((user: any, index: number) => (
                      <div key={index}>
                        <User>
                          <strong>{user.name}</strong>{" "}
                          <span>
                            arrives using{" "}
                            {
                              MAP_MEANS_OF_TRANSPORT_TO_LABEL[
                                user.meetupRelation.meansOfTransport
                              ]
                            }
                          </span>{" "}
                          <span>
                            from {user.meetupRelation.latitude},{" "}
                            {user.meetupRelation.latitude}
                          </span>
                        </User>
                      </div>
                    ))}
                  </div>
                </OuterDiv>
                <Events>Event recommendations:</Events>
                <OuterDiv>
                  {meetup.events.map((event: any, index: number) => (
                    <Event key={index}>
                      <Box width={[1, 1, 1 / 2, 1 / 2]} pr={2}>
                        <h2>{event.title}</h2>
                        {event.rating && (
                          <InnerDiv1>Rating: {event.rating}</InnerDiv1>
                        )}
                        {event.priceLevel && (
                          <InnerDiv2>PriceLevel: {event.priceLevel}</InnerDiv2>
                        )}
                      </Box>
                      <Box width={[1, 1, 1 / 2, 1 / 2]}>
                        <Location>
                          <IFrame>
                            <iframe
                              width="450"
                              height="450"
                              src={`https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${lat},${lng}&destination=place_id:${event.placeId}&mode=${mode}`}
                            />
                          </IFrame>
                        </Location>
                      </Box>
                    </Event>
                  ))}
                </OuterDiv>
              </div>
            );
          }}
        </Query>
      </MeetupContainer>
    );
  }
);

export default Meetup;
