import { Button, Form, Card } from 
'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Explore() {
  return(
    <div>
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
      <div className='flex justify-center'>
        <Button className='' size='lg' variant="dark" type="submit">
          Embark
        </Button>  
      </div>
      
    </div>
  )
}