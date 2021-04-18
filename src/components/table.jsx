import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import ModalView from "./modal";
import { useRequest } from "./request";
import logger from "./services/logger";
import LoadingSpinner from "./LoadingSpinner";
const TableView = ({ inventoryData, setInventoryData, modalState }) => {
  const [isLoading, setLoading] = useState(false);
  const { sendRequestForFetch, sendRequestForDelete } = useRequest();
  const [id, setId] = useState();

  const [isDataEditClick, setIsDataEditClick] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleDelete = (e, idx, item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await sendRequestForDelete(
            `http://localhost:3000/inventory/${item.id}`
          );

          const ro = await sendRequestForFetch(
            "http://localhost:3000/inventory"
          );

          setInventoryData(ro.data);
          setInventoryData(ro.data);
          setLoading(false);
          Swal.fire("Deleted!", "Your data has been deleted.", "success");
        } catch (err) {
          logger.error(err);
          setLoading(false);
          Swal.fire("Not Deleted!", "Something went wrong.", "failure");
        }
      }
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequestForFetch(
          `http://localhost:3000/inventory/`
        );

        setInventoryData(response.data);
      } catch (err) {
        logger.error(err);
      }
    };
    fetchData();
  }, [sendRequestForFetch, setInventoryData]);

  const handleEdit = (e, idx, item) => {
    setIsDataEditClick(true);
    setSelectedData({
      idx: idx,
      id: item.id,
      name: item.item,
      description: item.description,
      price: item.price,
    });

    setId(item.id);
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.item}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>
                <Button
                  variant="outline-success"
                  onClick={(e) => handleEdit(e, idx, item)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={(e) => handleDelete(e, idx, item)}
                >
                  Delete
                </Button>
                {isLoading && <LoadingSpinner />}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isDataEditClick && (
        <ModalView
          isDataEditClick={isDataEditClick}
          selectedData={selectedData}
          setIsDataEditClick={setIsDataEditClick}
          setSelectedData={setSelectedData}
          inventoryData={inventoryData}
          setInventoryData={setInventoryData}
          id={id}
        />
      )}
    </React.Fragment>
  );
};

export default TableView;
