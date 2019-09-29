import * as React from "react";
import Header1 from "./Header1";
import styled from "styled-components";
import { Flex, Box } from "reflexbox";
import { IconType } from "react-icons/lib/cjs";
import ReactHeader from "./ReactHeader";

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
  background-image: url("https://source.unsplash.com/1600x900/?bar,restaurant,cinema");
  background-position: center;
  background-size: 100%;

  width: 100%;
  height: 5rem;

  margin: 2rem 0;
`;

export default React.memo(() => {
  const results = [
    { id: 1, label: "Stifelchnächt", description: "kkjasdfkasjda" },
    { id: 2, label: "Hiltl Club", description: "kkjasdfkasjda" },
    { id: 3, label: "Plaza Club", description: "kkjasdfkasjda" },
    { id: 4, label: "Icon Club", description: "kkjasdfkasjda" }
  ];

  return (
    <FrontpageContainer>
      <BackgroundImg />
      <FrontpageContainer>
        <NewFlex flexWrap="wrap">
          {results.map(result => {
            return (
              <Box width={[1, 1 / 2, 1 / 3, 1 / 4]} px={2} key={result.id}>
                <Results>{result.label}</Results>
              </Box>
            );
          })}
        </NewFlex>
      </FrontpageContainer>
    </FrontpageContainer>
  );
});
