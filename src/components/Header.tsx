import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <h1 className="text-xl font-bold">Revision Tracker</h1>

        {/* Navigation Links (Optional) */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              {/* <Link href="/"> */}
                <a href="/" className="hover:underline">Home</a>
              {/* </Link> */}
            </li>
            <li>
              <Link href="/revisions" className="hover:underline">
                Revisions
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;