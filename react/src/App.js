// import react from "react";
import Nav from "./components/nav/nav"


import Route from "./components/nav/route"
import { GlobalStateProvider } from './context/globalContext'

function App() {
  return (
    <div >
      <GlobalStateProvider>
        <Route />
      </GlobalStateProvider>
    </div>
  );
}

export default App;
