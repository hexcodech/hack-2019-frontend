import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Flex, Box } from "reflexbox";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import ScrollToTop from "./ScrollToTop";
import Container from "./Container";

const Wrapper = React.memo(({ children }) => {
  return (
    <ThemeProvider
      theme={{
        breakpoints: ["36rem", "48rem", "62rem", "75rem"]
      }}
    >
      <ScrollToTop>
        <main>
          <Container>{children}</Container>
        </main>
      </ScrollToTop>
    </ThemeProvider>
  );
});

export default withRouter(Wrapper);
