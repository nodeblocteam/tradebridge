import React from 'react';
import Logo from "../assets/images/trade_bridge.png";
import { FaPlus, FaBoxOpen, FaGavel, FaTicketAlt } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import { 
  useAccount, 
  useConnect, 
  useDisconnect 
} from 'wagmi';

const Navbar = () => {
// Wagmi hooks for wallet connection
const { address, isConnected, connector } = useAccount();
const { 
  connect, 
  connectors, 
  error, 
  isLoading, 
  pendingConnector 
} = useConnect({
  connectors: [`Injected`],
  // Automatically connect to the injected wallet
  autoConnect: true,
});
const { disconnect } = useDisconnect();

// Function to connect the wallet
const connectWallet = async () => {
  try {
    // Connect to the wallet using the first connector
    await connect(connectors[0]);
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
            <span className="mr-4 text-white">Trade<span className='text-primary-500'>Bridge</span></span>
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
              disabled={isLoading || pendingConnector}
            >
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
          <Link to="/market-place" className="px-4 text-white py-2 bg-gray-700 border border-primary-500 rounded-full flex items-center">
            Make Purchase <FaPlus className="ml-2 bg-primary-500 w-6 h-6 p-2 rounded-full" /> 
          </Link>
        </div>
      </header>

      <div className="flex justify-between space-x-4 py-4 px-10 border rounded-full mx-5 mt-4 bg-gray-800">
        <div className='flex gap-4'>
          <Link to="buyer-dashboard/view-purchase" className="px-4 py-2 bg-gray-700 border text-white border-primary-500 hover:bg-primary-500 rounded-full flex items-center">
            View Purchase <FaBoxOpen className="ml-2" /> 
          </Link>
          <Link to="/buyer-dashboard/dispute-sale" className="px-4 py-2 bg-gray-700 border text-white border-primary-500 hover:bg-primary-500 rounded-full flex items-center">
            Disputes <FaGavel className="ml-2" /> 
          </Link>
        </div>
        <div>
          <Link to="/create-ticket" className="px-4 py-2 bg-gray-700 border border-primary-500 text-white rounded-full flex items-center">
            Create a ticket <FaTicketAlt className="ml-2 bg-primary-500 w-7 h-7 p-2 rounded-full" /> 
          </Link>
        </div>
      </div>
      {error && (
        <div className="text-red-500">
          Error: {error.message}
        </div>
      )}
    </div>
  );
}

export default Navbar;
