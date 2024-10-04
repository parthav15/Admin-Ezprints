import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  // Progress,
  Table,
  Container,
  Row,
  Col, 
  Pagination, 
  PaginationItem, 
  PaginationLink 
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const MY_BASE_URL = process.env.REACT_APP_BASE_URL;

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [dashboardData, setDashboardData] = useState(null);

  {/* PENDING PRINT JOBS PAGINATION LOGIC */}
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = dashboardData?.pending_print_jobs?.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(dashboardData?.pending_print_jobs?.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    } else {
      axios
        .post(`${MY_BASE_URL}admin_panel/admin_dashboard/`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setDashboardData(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    }
  }, [navigate]);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
      <Row className="mt-5 mb-4">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Pending Print Jobs</h3>
                  </div>
                  <div className="col text-right">
                    {/* <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button> */}
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Customer Name</th>
                    <th scope="col">No. of Pages</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Document</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows?.map((job, index) => (
                    <tr key={index}>
                      <th scope="row">{job.user_name}</th>
                      <td>{job.bw_pages + job.color_pages}</td>
                      <td>{new Date(job.created_at).toLocaleDateString()}</td>
                      <td>{job.amount ? `INR ${job.amount}` : "N/A"}</td>
                      <td>{job.status ? job.status.charAt(0).toUpperCase() + job.status.slice(1) : "N/A"}</td>
                      <td>
                        <a
                          href={`${MY_BASE_URL}${job.document}`}
                          target="_blank"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(`${MY_BASE_URL}${job.document}`, '_blank', 'toolbar=0,location=0,menubar=0');
                          }}
                        >
                          View Document
                        </a>
                      </td>
                      <td>
                        <Button color="success" size="sm" className="mr-2">
                          <i className="fa fa-check-circle" aria-hidden="true"></i>
                        </Button>
                        <Button color="danger" size="sm">
                          <i className="fa fa-times-circle" aria-hidden="true"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="pagination-controls ml-4">
                <Pagination aria-label="Page navigation example">
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink first onClick={() => handlePageChange(1)} />
                  </PaginationItem>

                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink previous onClick={handlePrevPage} />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem active={currentPage === index + 1} key={index}>
                      <PaginationLink onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink next onClick={handleNextPage} />
                  </PaginationItem>

                  <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink last onClick={() => handlePageChange(totalPages)} />
                  </PaginationItem>
                </Pagination>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
