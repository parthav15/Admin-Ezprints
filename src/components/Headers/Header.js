import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const MY_BASE_URL = process.env.REACT_APP_BASE_URL;

const Header = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.post(`${MY_BASE_URL}admin_panel/admin_dashboard/`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.data.success) {
        console.log("Dashboard data: ", response.data);
        setDashboardData(response.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching data", error);
    });
  }, []); 
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Revenue
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {dashboardData?.total_revenue_all_time}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">
                        <span className="text-nowrap">Current month: </span><span className="text-success">{dashboardData?.data[0]?.total_revenue}</span> <br />
                        <span className="text-nowrap">Last month: </span><span className="text-success">{dashboardData?.data[1]?.total_revenue}</span>
                      </span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Customers
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{dashboardData?.total_customers_all_time}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">
                        <span className="text-nowrap">Current month: </span><span className="text-success">{dashboardData?.data[0]?.total_customers}</span> <br />
                        <span className="text-nowrap">Last month: </span><span className="text-success">{dashboardData?.data[1]?.total_customers}</span>
                      </span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Prints
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{dashboardData?.total_bookings_all_time}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">
                        <span className="text-nowrap">Current month: </span><span className="text-success">{dashboardData?.data[0]?.total_bookings}</span> <br />
                        <span className="text-nowrap">Last month: </span><span className="text-success">{dashboardData?.data[1]?.total_bookings}</span>
                      </span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
              <Card className="card-stats mb-1 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted d-flex align-items-center justify-content-between"
                        style={{ margin: 0 }}
                      >
                        <span>Overall Performance</span>
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </CardTitle>
                      <span className="h2 font-weight-bold" style={{ marginTop: "0.25rem", marginBottom: "0" }}>
                        {parseFloat(dashboardData?.all_time_performance?.percentage).toFixed(2)}%
                      </span>
                    </div>
                  </Row>
                  <p className="mt-1 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">
                      <i className="fas fa-arrow-up" /> {dashboardData?.data[1]?.performance.percentage}%
                    </span>{" "}
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </CardBody>
              </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
