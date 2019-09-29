import * as React from "react";
import styled from "styled-components";

const BackgroundImg = styled.div`
  background-image: url("https://source.unsplash.com/1600x900/?bar,restaurant,cinema");
  background-position: center;
  background-size: 100%;
  border-radius: 5px;

  width: 100%;
  height: 20rem;

  margin: 2rem 0;
`;

function ReactHeader() {
  return <BackgroundImg />;
}

export default ReactHeader;
