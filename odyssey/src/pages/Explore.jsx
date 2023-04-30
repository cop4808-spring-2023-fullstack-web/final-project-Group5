import { useState } from 'react';
import { Button, Form, Card, Container, Row, Col } from
  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrefTagSearch from '../components/PrefTagSearch/PrefTagSearch';


export default function Explore() {

  const [preferenceData, setPreferenceData] = useState({})
  const handleUpdate = (title, tags) => {
    setPreferenceData(prevData => ({ ...prevData, [title]: tags }));
  }
  const handleSubmit = () => {
    //post request - submit preference data to db
  }

  return (

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
  )
}
