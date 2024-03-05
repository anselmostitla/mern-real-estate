import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Header() {
  const { currentUser } = useSelector( state => state.user );
  console.log("currentUser: ", currentUser)
  useEffect(() => {}, [currentUser])
  console.log("currentUser header: ", currentUser)
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Elix</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-100 flex items-center p-3 rounded">
          <input
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <Link to="/"></Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          
          <Link to="/profile">
            { currentUser
               ? <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
               : <li className=" text-slate-700 hover:underline">Sign up</li>   
            }
          </Link>
        </ul>
      </div>
    </header>
  );
}
