import React from "react";
import styled from "styled-components";
import ResumeBuilder from "./components/ResumeBuilder";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background.default};
  padding: 2rem 0;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <ResumeBuilder />
    </AppContainer>
  );
};

export default App;
