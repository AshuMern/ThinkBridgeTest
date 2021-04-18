import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import FormView from "./FormView";
const ModalView = ({
  setInventoryData,
  inventoryData,
  selectedData,
  isDataEditClick,
  setIsDataEditClick,
  setSelectedData,
  setModalState,
  id
}) => {
  const [modalView, setModalView] = useState(false);
  const modalHandler = (e) => {
    setModalView(true);
  };
  const modalHandler1 = (e) => {
    setModalView(false);
    if (isDataEditClick) {
      setIsDataEditClick(false);
      setSelectedData(null);
    }
  };
  
  return (
    <>
    <h3 className='inventory-header'>Inventory</h3>
      <Button variant="outline-primary" className='add-inventory' onClick={(e) => modalHandler(e)}>
        Add Inventory Data
      </Button>
      <Modal isOpen={modalView || isDataEditClick} ariaHideApp={false}>
        <FormView
          setIsDataEditClick={setIsDataEditClick}
          isDataEditClick={isDataEditClick}
          selectedData={selectedData}
          setInventoryData={setInventoryData}
          inventoryData={inventoryData}
          setModalView={setModalView}
          setModalState={setModalState}
          setSelectedData={setSelectedData}
          id={id}
        />
       
       
      </Modal>
    </>
  );
};
export default ModalView;
