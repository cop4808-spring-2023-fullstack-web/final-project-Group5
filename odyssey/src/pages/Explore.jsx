import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Explore(props) {
  //get auth token from state
  const authToken = props.token
  //useState for checking authorization status
  const [authorized, setAuthorized] = useState(props.token)

  // set form states
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // navigation hook to navigate to itinerary page
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // query string with data from form
    const query = `destination=${destination}&startDate=${startDate}&endDate=${endDate}`;
    // navigate to itinerary page passing query string
    navigate(`/itinerary?${query}`);
  };

  return (
    <div>
      {/* Page Header */}
      <h1 className="text-center m-5 text-3xl">Start Your Trip</h1>
      <div className="flex justify-center m-5">
        <Card className="p-4 w-[600px]">
          {/* Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="formDest">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                className="w-1/2 mb-2"
                type=""
                placeholder="City or Zipcode"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <Row>
                <Col>
                  <Form.Label>Start</Form.Label>
                  <Form.Control
                    className="w-1/2 mb-2"
                    id="dateFrom"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Label>End</Form.Label>
                  <Form.Control
                    className="w-1/2 mb-2"
                    id="dateTo"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="text-center">
              <Button className="" size="lg" variant="dark" type="submit">
                Embark
              </Button>
            </Form.Group>
          </Form>
        </Card>
      </div>
    </div>
  );
}
