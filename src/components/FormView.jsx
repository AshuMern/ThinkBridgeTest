import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import logger from "./services/logger";
import LoadingSpinner from "./LoadingSpinner";

import { useRequest } from "./request";

const FormView = ({
  setInventoryData,
  inventoryData,
  setModalView,
  selectedData,
  isDataEditClick,
  setIsDataEditClick,
  setSelectedData,
  id,
}) => {
  const [item, setItem] = useState(isDataEditClick ? selectedData.name : "");
  const [isLoading, setLoading] = useState(false);
  const [description, setDescription] = useState(
    isDataEditClick ? selectedData.description : ""
  );
  const [price, setPrice] = useState(isDataEditClick ? selectedData.price : 0);

  const {
    sendRequestForInsert,
    sendRequestForFetch,
    sendRequestForUpdate,
    res,
  } = useRequest();
  const changeHandlerItem = (event) => {
    setItem(event.target.value);
  };
  const changeHandlerDescription = (event) => {
    setDescription(event.target.value);
  };

  const changeHandlerPrice = (event) => {
    setPrice(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (price < 1) {
      Swal.fire("", "Please enter the price!", "info");
    } else if (description === "") {
      Swal.fire("", "Please enter Description!", "info");
    } else if (item === "") {
      Swal.fire("", "Please enter Item!", "info");
    } else if (isDataEditClick) {
      try {
        setLoading(true);
        await sendRequestForUpdate(`http://localhost:3000/inventory/${id}`, {
          item: item,
          description: description,
          price: price,
        });
        const ro = await sendRequestForFetch("http://localhost:3000/inventory");
        setInventoryData(ro.data);
        setLoading(false);
        setIsDataEditClick(false);
        Swal.fire("Saved", "Row is updated.", "Success");
      } catch (err) {
        setLoading(false);
        Swal.fire("Not saved", "Something went wrong", "Failure");
        logger.error(err);
      }

    
     
    } else {
      try {
        setLoading(true);
        await sendRequestForInsert("http://localhost:3000/inventory", {
          item: item,
          description: description,
          price: price,
        });

        setModalView(false);

        const r = await sendRequestForFetch("http://localhost:3000/inventory");
        setInventoryData(r.data);
        setLoading(false);
        Swal.fire("Saved", "Row is added.", "Success");
      } catch (err) {
        setLoading(false);
        
        logger.error(err);
        Swal.fire("Not saved", "Something went wrong", "Failure");
      }
    }
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
      <Form onSubmit={(e) => submitHandler(e)}>
        <Form.Group controlId="item">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            id="item"
            type="text"
            value={item}
            placeholder="Enter Item Name"
            onChange={(e) => changeHandlerItem(e)}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Item Description</Form.Label>
          <Form.Control
            id="description"
            type="text"
            value={description}
            placeholder="Item Description"
            onChange={(e) => changeHandlerDescription(e)}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            id="price"
            type="number"
            value={price}
            placeholder="Item Price"
            onChange={(e) => changeHandlerPrice(e)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="danger" onClick={(e) => modalHandler1(e)}>
          Close
        </Button>
        {isLoading && <LoadingSpinner />}
      </Form>
    </>
  );
};
export default FormView;
