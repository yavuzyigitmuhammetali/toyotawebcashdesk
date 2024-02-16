import React from 'react';
import MainContainer from "./shared/components/MainContainer/MainContainer";
import {Outlet} from "react-router-dom";
function App() {
  return (
      <>
          <MainContainer>
              <Outlet/>
          </MainContainer>
      </>
  );
}

export default App;
