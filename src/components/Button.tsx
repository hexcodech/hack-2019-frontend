import styled from "styled-components";

const Button = styled.button<{ marginTop?: boolean; marginBottom?: boolean }>`
  margin-top: ${({ marginTop }) => (marginTop ? "0.5rem" : "")};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? "2rem" : "")};
  font-size: 1rem;
  background-color: #34ace0;
  color: #ffff;
  border: none;
  padding: 1.2rem;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
    background-color: #277fa8;
  }
  &:active {
    background-color: #227093;
  }
`;

export default Button;
