import React, { useState } from 'react';
import Logo from "../assets/images/trade_bridge.png";
import { Link } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';


const Navbar = () => {
 
  // Wagmi hooks for wallet connection
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  // Function to connect the wallet
  const connectWallet = async () => {
    try {
      await connect();  // Connects using InjectedConnector (e.g. MetaMask)
    } catch (error) {
      console.error("Error connecting wallet: ", error);
    }
  };

  return (
    <div className='bg-gray-900 pt-5'>
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center py-4 px-10 border rounded-full mx-5 bg-gray-800">
       <Link to="/hero">
        <div className="text-2xl font-bold flex gap-2 items-center">
          <img
            src={Logo}
            alt="Trade Bridge Logo"
            className="w-10 md:w-[32px]"
          />
          <span className="mr-4 text-white">Trade<span className='text-orange-500'>Bridge</span></span>
        </div>
        </Link>
        <div className="flex items-center space-x-4">
            {/* Wallet Connect Button */}
            {isConnected && address ? (
            <button className="bg-primary-500 text-white rounded-full px-4 py-2" onClick={disconnect}>
              {`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
            </button>
          ) : (
            <button 
              onClick={connectWallet} 
              className="bg-primary-500 text-white rounded-full px-4 py-2"
            >
              Connect Wallet
            </button>
          )}
         
        </div>
      </header>
           {/* Search Filter Section */}
      <div className="flex justify-between border border-white rounded-full py-4 px-10 items-center mx-5 mt-7">
        <div className="flex space-x-4">
          <button className="text-sm text-white px-4 py-2 bg-gray-700 rounded-full">Categories</button>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full"
          />
          <button className="px-8 py-2 bg-primary-500 text-white rounded-full">Search</button>
        </div>
        <button className="px-8 py-2 bg-gray-800 text-white rounded-full border border-primary-500">Filters</button>
      </div>
   
    </div>
  );
}

export default Navbar;
