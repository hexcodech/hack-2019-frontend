import * as React from "react";
import { FaBeer, FaVolleyballBall, FaFilm, FaMusic } from "react-icons/fa";

import Header1 from "../components/Header1";
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

const Category = styled.div<{ active: boolean }>`
  position: relative;
  color: #ffff;
  background-color: ${({ active }) => (active ? "#f00" : "#1f5373")};
  text-align: center;
  border-radius: 70px;
  padding-top: 100%;
  cursor: pointer;

  & > div {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;

    transform: translateY(-50%);
  }
`;

const CATEGORY_ID_TO_ICON: { [key: number]: IconType } = {
  1: FaBeer,
  2: FaFilm,
  3: FaMusic,
  4: FaVolleyballBall
};

export default React.memo(() => {
  const categories = [
    { id: 1, label: "Pub" },
    { id: 2, label: "Cinema" },
    { id: 3, label: "Concert" },
    { id: 4, label: "Sport" }
  ];
  const [categoryId, setCategoryId] = React.useState(null);

  return (
    <div>
      <header></header>
      <main>
        <Flex flexWrap="wrap">
          {categories.map(category => {
            const Icon = CATEGORY_ID_TO_ICON[category.id] || FaBeer;

            return (
              <Box
                width={[1, 1 / 2, 1 / 3, 1 / 4]}
                pr={2}
                key={category.id}
                onClick={() => setCategoryId(category.id)}
              >
                <Category active={categoryId === category.id}>
                  <Icon size={120} />
                </Category>
              </Box>
            );
          })}
        </Flex>
        {categoryId && (
          <div>You selected the category with id {categoryId}</div>
        )}
      </main>
    </div>
  );
});
