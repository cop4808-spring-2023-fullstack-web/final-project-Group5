import { Link } from "react-router-dom";

const Home = () => {
  return(
    <div className="flex flex-col flex-fill h-max">
      <h1 className="h1 m-5 text-center font-bold text-primary">Yelp Demo Server</h1>
      <ul className='flex sm:flex-col flex-row justify-center items-center'>
        <li className="m-3">
          <div className="card w-96 bg-primary text-gray rounded-5 rounded-md overflow-hidden">
            <div className="card-body bg-primary">
              <h2 className="card-title bg-primary">Search Businesses</h2>
              <p className="bg-primary">Search for businesses using search term and location</p>
              <div className="card-actions justify-end bg-primary">
                <Link className="btn rounded-4 normal-case text-lg" to='/search'>Search</Link>
              </div>
            </div>
          </div>
        </li>
        <li className="m-3">
          <div className="card w-96 bg-primary text-gray rounded-5 rounded-md overflow-hidden">
            <div className="card-body bg-primary">
              <h2 className="card-title bg-primary">Business Details</h2>
              <p className="bg-primary">Show more business details from the Yelp business ID</p>
              <div className="card-actions justify-end bg-primary">
                <Link className="btn rounded-4 normal-case text-lg" to='/details'>Details</Link>
              </div>
            </div>
          </div>
        </li>
        <li className="m-3">
          <div className="card w-96 bg-primary text-gray rounded-5 rounded-md overflow-hidden">
            <div className="card-body bg-primary">
              <h2 className="card-title bg-primary">Auto Search Terms</h2>
              <p className="bg-primary">Show common search terms based on provided text</p>
              <div className="card-actions justify-end bg-primary">
                <Link className="btn rounded-4 normal-case text-lg" to='/auto'>Auto</Link>
              </div>
            </div>
          </div>
        </li>
        <li className="m-3">
          <div className="card w-96 bg-primary text-gray rounded-5 rounded-md overflow-hidden">
            <div className="card-body bg-primary">
              <h2 className="card-title bg-primary">Business Reviews</h2>
              <p className="bg-primary">Show reviews for a business from its Yelp id</p>
              <div className="card-actions justify-end bg-primary">
                <Link className="btn rounded-4 normal-case text-lg" to='/reviews'>Reviews</Link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Home;