import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Explore() {
  // set form states
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = `destination=${destination}&startDate=${startDate}&endDate=${endDate}`;
    navigate(`/itinerary?${query}`);
  };

  return (
    <div>
      <h1 className="text-center m-5 text-3xl">Start Your Trip</h1>
      <div className="flex justify-center m-5">
        <Card className="p-4 w-[600px]">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="formDest">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                className="w-1/2 "
                type=""
                placeholder="City or Zipcode"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              From:
              <Form.Control
                id="dateFrom"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              To:
              <Form.Control
                id="dateTo"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
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
