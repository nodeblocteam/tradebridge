import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import Logo from "../assets/images/trade_bridge.png";
import { FaPlus, FaBoxOpen, FaGavel, FaTicketAlt } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import { WalletOptions } from '../components/WalletOptions'; // Import the WalletOptions component

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className='bg-gray-900 pt-5'>
      <header className="flex justify-between items-center py-4 px-10 border rounded-full mx-5 bg-gray-800">
        <Link to="/hero">
          <div className="text-2xl font-bold flex gap-2 items-center">
            <img
              src={Logo}
              alt="Trade Bridge Logo"
              className="w-10 md:w-[32px]"
            />
            <span className="mr-4 text-white">Trade<span className='text-primary-500'>Bridge</span></span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
        {isConnected ? (
            <button 
              className="bg-primary-500 text-white rounded-full px-4 py-2"
              onClick={() => disconnect()}
            >
              {`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
            </button>
          ) : (
            <WalletOptions />
          )}
          <Link to="/seller-dashboard/create-commodity" className="px-4 text-white py-2 bg-gray-700 border border-primary-500 rounded-full flex items-center">
            Add Product <FaPlus className="ml-2 bg-primary-500 w-6 h-6 p-2 rounded-full" /> 
          </Link>
        </div>
      </header>

      <div className="flex justify-between space-x-4 py-4 px-10 border rounded-full mx-5 mt-4 bg-gray-800">
        <div className='flex gap-4'>
          <Link to="seller-dashboard/my-commodity" className="px-4 py-2 bg-gray-700 border text-white border-primary-500 hover:bg-primary-500 rounded-full flex items-center">
            My Products <FaBoxOpen className="ml-2" /> 
          </Link>
          <Link to="/disputes" className="px-4 py-2 bg-gray-700 border text-white border-primary-500 hover:bg-primary-500 rounded-full flex items-center">
            Disputes <FaGavel className="ml-2 text-white" /> 
          </Link>
        </div>
        <div>
          <Link to="/create-ticket" className="px-4 py-2 bg-gray-700 border border-primary-500 text-white rounded-full flex items-center">
            Create a ticket <FaTicketAlt className="ml-2 bg-primary-500 w-7 h-7 p-2 rounded-full" /> 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
