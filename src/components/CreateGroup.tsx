import * as React from "react";

import Header1 from "./Header1";
import styled from "styled-components";
import { Flex, Box } from "reflexbox";
import { IconType } from "react-icons/lib/cjs";

const COLORS: { [key: number]: String } = {
  1: "#F24405",
  2: "#F27405",
  3: "#F28705",
  4: "#8EBABF",
  5: "#0F6CA6"
};

const FrontpageContainer = styled.div`
  height: 100%;
`;

const Results = styled.div`
  position: relative;
  padding-top: 100%;
  color: #ffff;
  background-color: #1f5373;
`;

const NewFlex = styled(Flex)`
  flex-grow: 1;
  margin: 0 -0.5rem !important;
`;

const BackgroundImg = styled.div`
  background-image: url("https://source.unsplash.com/collection/1849603/1600x900");
  background-position: center;
  background-size: 100%;

  width: 100%;
  height: 5rem;

  margin: 2rem 0;
`;

export default React.memo(() => {
  return (
    <FrontpageContainer>
      <BackgroundImg />
      <FrontpageContainer>
        <NewFlex flexWrap="wrap"></NewFlex>
      </FrontpageContainer>
    </FrontpageContainer>
  );
});
