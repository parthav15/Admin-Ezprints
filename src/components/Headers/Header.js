import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import CountUp from "react-countup";

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
              {/* Total Revenue */}
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
                        <CountUp
                          className="h2 font-weight-bold mb-0"
                          start={0}
                          end={parseFloat(dashboardData?.total_revenue_all_time || 0)}
                          duration={2.0}
                          decimals={2}
                          prefix="INR "
                          separator=","
                        />
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">
                        <span className="text-nowrap">Current month: </span>
                        <CountUp
                          className="text-success"
                          start={0}
                          end={parseFloat(dashboardData?.data[0]?.total_revenue || 0)}
                          duration={2.0}
                          decimals={2}
                          prefix="INR "
                          separator=","
                        /> <br />
                        <span className="text-nowrap">Last month: </span>
                        <CountUp
                          className="text-success"
                          start={0}
                          end={parseFloat(dashboardData?.data[1]?.total_revenue || 0)}
                          duration={2.0}
                          decimals={2}
                          prefix="INR "
                          separator=","
                        />
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>

              {/* Total Customers */}
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
                        <CountUp
                          className="h2 font-weight-bold mb-0"
                          start={0}
                          end={parseFloat(dashboardData?.total_customers_all_time || 0)}
                          duration={2.0}
                          separator=","
                        />
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">
                        <span className="text-nowrap">Current month: </span>
                        <CountUp
                          className="text-success"
                          start={0}
                          end={parseFloat(dashboardData?.data[0]?.total_customers || 0)}
                          duration={2.0}
                          separator=","
                        /> <br />
                        <span className="text-nowrap">Last month: </span>
                        <CountUp
                          className="text-success"
                          start={0}
                          end={parseFloat(dashboardData?.data[1]?.total_customers || 0)}
                          duration={2.0}
                          separator=","
                        />
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>

              {/* Total Prints */}
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
                        <CountUp
                          className="h2 font-weight-bold mb-0"
                          start={0}
                          end={parseFloat(dashboardData?.total_bookings_all_time || 0)}
                          duration={2.0}
                          separator=","
                        />
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">
                        <span className="text-nowrap">Current month: </span>
                        <CountUp
                          className="text-success"
                          start={0}
                          end={parseFloat(dashboardData?.data[0]?.total_bookings || 0)}
                          duration={2.0}
                          separator=","
                        /> <br />
                        <span className="text-nowrap">Last month: </span>
                        <CountUp
                          className="text-success"
                          start={0}
                          end={parseFloat(dashboardData?.data[1]?.total_bookings || 0)}
                          duration={2.0}
                          separator=","
                        />
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>

              {/* Overall Performance */}
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
                        <CountUp
                          className="h2 font-weight-bold"
                          start={0}
                          end={parseFloat(dashboardData?.all_time_performance?.percentage || 0)}
                          duration={2.0}
                          decimals={2}
                          suffix="%"
                          style={{ marginTop: "0.25rem", marginBottom: "0" }}
                        />
                      </div>
                    </Row>
                    <p className="mt-1 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" />
                        <CountUp
                          className="text-success"
                          start={0}
                          end={parseFloat(dashboardData?.data[1]?.performance.percentage || 0)}
                          duration={2.0}
                          decimals={2}
                          suffix="%"
                        />
                      </span>
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
