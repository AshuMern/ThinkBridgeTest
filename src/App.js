import React, { useState } from "react";
import "./App.css";

import { Container } from "react-bootstrap";
import ModalView from "./components/modal";
import TableView from "./components/table";

function App() {
  // Default State
  const [inventoryData, setInventoryData] = useState([]);
  const [modalState,setModalState]=useState();

  console.log("inventoryDataParent", inventoryData);
  return (
    <div className="App">
      <Container>
        <ModalView
          setInventoryData={setInventoryData} //send the state from parent to child
          inventoryData={inventoryData}
          setModalState={setModalState}
        />
        {/* //send the state from parent to child */}
        <TableView
          inventoryData={inventoryData}
          setInventoryData={setInventoryData}
          modalState={modalState}

        />
      </Container>
    </div>
  );
}

export default App;
