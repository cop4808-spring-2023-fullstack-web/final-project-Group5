import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-0 rounded-4 mx-2 text-blue-500 bg-gray">
        <a className="btn rounded-4 btn-ghost normal-case text-xl">Odyssey</a>
      </div>
      <div className='navbar-center rounded-4 text-blue-500 bg-gray'>
        <Link className="btn btn-ghost rounded-4 normal-case text-lg" to='/'>Home</Link>
        <Link className="btn btn-ghost rounded-4 normal-case text-lg" to='/search'>Search</Link>
        <Link className="btn btn-ghost rounded-4 normal-case text-lg" to='/details'>Details</Link>
        <Link className="btn btn-ghost rounded-4 normal-case text-lg" to='/auto'>Auto</Link>
        <Link className="btn btn-ghost rounded-4 normal-case text-lg" to='/reviews'>Reviews</Link>
      </div>
      <div className="flex-none rounded-4">
        <button className="btn btn-square btn-ghost rounded-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </div>
  );
}

export default Navigation;