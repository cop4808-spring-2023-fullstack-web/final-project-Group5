import { Button, Form, Card, Container, Row, Col} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrefTagSearch from '../components/PrefTagSearch/PrefTagSearch';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Explore(props) {
  //get auth token from state
  const authToken = props.token
  //useState for checking authorization status
  const [authorized, setAuthorized] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  const [preferenceData, setPreferenceData] = useState({})
  const handleUpdate = (title, tags) => {
    setPreferenceData(prevData => ({ ...prevData, [title]: tags }));
  }

  useEffect(() => {
    if(authToken) {
      setAuthorized(true);
    }
  }, [authToken, setAuthorized])

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
    <>
    {authorized ? (
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
    ) : (
      <Container>

      <Col lg={6} className="mx-auto">

        <h1 className='text-center m-5 text-3xl'>Start Your Trip</h1>

        <div className='flex justify-center m-5'>
          <Card className='p-4 w-[600px]'>
            <Form>
              <Form.Group className="mb-3" id="formDest">
                <Form.Label>Destination</Form.Label>
                <Form.Control className='w-1/2 ' type="" placeholder="City or Zipcode" />
                From:
                <Form.Control id='dateFrom' type='date' />
                To:
                <Form.Control id='dateTo' type='date' />
              </Form.Group>

            </Form>
          </Card>

        </div>

        <div className='flex justify-center m-5'>
          <PrefTagSearch title='Hotel' onUpdate={handleUpdate} />
        </div>

        <div className='flex justify-center m-5'>
          <Button className="align-self-center" size='lg' variant="dark" type="submit">
            Embark
          </Button>
        </div>

      </Col>

    </Container>
    )}
    </>

  );
}
