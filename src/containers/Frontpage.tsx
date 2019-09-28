import * as React from "react";
import { FaBeer, FaVolleyballBall, FaFilm, FaMusic } from "react-icons/fa";
import styled from "styled-components";
import { Flex, Box } from "reflexbox";
import { IconType } from "react-icons/lib/cjs";
import Form from "../components/Form";

const FrontpageContainer = styled.div`
  height: 100%;
`;

const Category = styled.div<{ active: boolean }>`
  position: relative;
  padding-top: 100%;
  color: #ffff;
  background-color: ${({ active }) => (active ? "#f00" : "#1f5373")};
  border-radius: 20px;
`;

const CategoryWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;

  transform: translateY(-50%);
`;

const NewFlex = styled(Flex)`
  flex-grow: 1;
  margin: 0 -0.5rem !important;
`;

const CATEGORY_ID_TO_ICON: { [key: number]: IconType } = {
  1: FaBeer,
  2: FaFilm,
  3: FaMusic,
  4: FaVolleyballBall
};

const BackgroundImg = styled.div`
  background-image: url("https://source.unsplash.com/collection/1849603/1600x900");
  background-position: center;
  background-size: 100%;
  border-radius: 5px;

  width: 100%;
  height: 20rem;

  margin: 2rem 0;
`;

export default React.memo(() => {
  const categories = [
    { id: 1, label: "Pub" },
    { id: 2, label: "Cinema" },
    { id: 3, label: "Concert" },
    { id: 4, label: "Sport" }
  ];
  const [categoryId, setCategoryId] = React.useState(null);

  return (
    <FrontpageContainer>
      <BackgroundImg />
      <FrontpageContainer>
        <NewFlex flexWrap="wrap">
          {categories.map(category => {
            const Icon = CATEGORY_ID_TO_ICON[category.id] || FaBeer;

            return (
              <Box width={[1, 1 / 2, 1 / 3, 1 / 4]} px={2} key={category.id}>
                <Category
                  active={categoryId === category.id}
                  onClick={() => setCategoryId(category.id)}
                >
                  <CategoryWrapper>
                    <Icon size={120} style={{ maxHeight: "80%" }} />
                  </CategoryWrapper>
                </Category>
              </Box>
            );
          })}
        </NewFlex>
        {categoryId && (
          <div style={{ display: "block" }}>
            You selected the category with id {categoryId}
          </div>
        )}
        <Form />
      </FrontpageContainer>
    </FrontpageContainer>
  );
});
