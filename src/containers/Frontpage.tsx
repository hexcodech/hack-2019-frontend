import * as React from "react";
import styled from "styled-components";

const H1 = styled.h1`
  color: #fff;
`;

export default React.memo(() => {
  return <H1>Frontpage</H1>;
});
