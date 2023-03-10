import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import SideBar from "../SideBar/SideBar";
import Loader from "../Loader/Loader";
import trash from "../../images/trash.svg";

const ManageAllOrder = () => {
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Admin Dashboard";
    fetchDataApi();
  }, []);

  const fetchDataApi = () => {
    fetch(`${process.env.REACT_APP_API_URL}/creative-agency/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAdminData(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const optionChange = (e) => {
    const id = e.target.getAttribute("data-id");
    const value = e.target.value;
    fetch(`${process.env.REACT_APP_API_URL}/creative-agency/${value}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: window.localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ value }),
    })
      .then((response) => response.json())
      .then((data) => {
        swal(data.message, "", "success");
        //console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        swal("", error.message, "error");
      });
  };

  const deleteData = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("data-id");
    // console.log(id);
    fetch(`${process.env.REACT_APP_API_URL}/creative-agency/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: window.localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchDataApi();
        swal("", data.message, "success");
        // console.log('Success:', data);
      })
      .catch((error) => {
        swal("", error.message, "error");
        // console.error('Error:', error);
      });
  };

  const deletefn = (e) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteData(e);
        }
      })
      .catch((error) => {
        swal(error.message);
      });
  };
  return (
    <>
      {/* <Navigation /> */}
      <Container fluid>
        <Row className="silde-menu">
          <SideBar admin={true} />
          <Col md={10} className="mt-3 bg-light p-4">
            <div
              style={{ backgroundColor: "#fff", borderRadius: "20px" }}
              className="p-2"
            >
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Service</th>
                    <th>Project Details</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Loader />
                  ) : (
                    adminData.map((data, index) => (
                      <tr key={data._id}>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.title}</td>
                        <td className="text-ellipsis">{data.description}</td>
                        <td>{data.date}</td>
                        <td>
                          <select
                            className="btn btn-light"
                            defaultValue={data.status}
                            onChange={optionChange}
                            data-id={data._id}
                          >
                            {data.status === "Done" ? (
                              <>
                                <option selected value="Done">
                                  Done
                                </option>
                                <option value="Pending">Pending</option>
                              </>
                            ) : (
                              <>
                                <option value="Done">Done</option>
                                <option selected value="Pending">
                                  Pending
                                </option>
                              </>
                            )}
                          </select>
                        </td>
                        <td>
                          <Link
                            to={`/admin/updateService/creative-agency/${data._id}/${data.title}/${data.description}`}
                            className="btn"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                          </Link>
                        </td>
                        <td>
                          <button
                            data-id={data._id}
                            onClick={deletefn}
                            className="btn"
                          >
                            <Image
                              src={trash}
                              data-id={data._id}
                              onClick={deletefn}
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ManageAllOrder;
