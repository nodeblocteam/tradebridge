import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import NavbarTwo from "./components/NavbarTwo";
import NavbarThree from "./components/NavbarThree";
import Hero from "./pages/Hero";
import BuyerDashboard from "./pages/buyerDashboard/BuyerDashboard";
import SellerDashboard from "./pages/sellerDashboard/SellerDashboard";
import Dispute from "./pages/sellerDashboard/Dispute";
import CreateCommodity from "./pages/sellerDashboard/createCommodity";
import Orders from "./pages/sellerDashboard/Orders";
import MarketPlace from "./pages/marketPlace/MarketPlace";
import AgroCom from "./pages/marketPlace/AgriCommodities";
import SolidCom from "./pages/marketPlace/solidCommodities";
import MyCommodity from "./pages/sellerDashboard/MyCommodity";
import PurchaseCommodity from "./pages/buyerDashboard/Purchase";
import ViewPurchase from "./pages/buyerDashboard/ViewPurchase";
import DisputeSale from "./pages/buyerDashboard/Dispute";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '../config';



// 2. Set up a React Query client.
const queryClient = new QueryClient()

function App() {
  const location = useLocation();
  
  const isHeroPage = ["/", "/hero"].includes(location.pathname);
  
  const showNavbar = [
    "/seller-dashboard",
    "/seller-dashboard/create-commodity",
    "/seller-dashboard/my-commodity",
    "/seller-dashboard/orders",
    "/seller-dashboard/dispute"
  ].includes(location.pathname);

  const showNavbarTwo = [
    "/buyer-dashboard",
    "/buyer-dashboard/purchase-commodity",
    "/buyer-dashboard/view-purchase",
    "/buyer-dashboard/dispute-sale"
  ].includes(location.pathname);

  const showNavbarThree = [
    "/market-place",
    "/market-place/agro-commodities",
    "/market-place/solid-commodities",
  ].includes(location.pathname);

  return (
    <div className="App flex flex-col min-h-screen">
      {isHeroPage && <Header />}
      
      {showNavbar && <Navbar />}
      {showNavbarTwo && <NavbarTwo />}
      {showNavbarThree && <NavbarThree />}

      <main className="flex-grow w-auto h-auto bg-gray-200">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/seller-dashboard/create-commodity" element={<CreateCommodity />} />
          <Route path="/seller-dashboard/orders" element={<Orders />} />
          <Route path="/seller-dashboard/my-commodity" element={<MyCommodity />} />
          <Route path="/seller-dashboard/dispute" element={<Dispute />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer-dashboard/purchase-commodity" element={<PurchaseCommodity />} />
          <Route path="/buyer-dashboard/view-purchase" element={<ViewPurchase />} />
          <Route path="/buyer-dashboard/dispute-sale" element={<DisputeSale />} />
          <Route path="/market-place" element={<MarketPlace />} />
          <Route path="/market-place/agro-commodities" element={<AgroCom />} />
          <Route path="/market-place/solid-commodities" element={<SolidCom />} />
        </Routes>
      </main>
    </div>
  );
}

const WrappedApp = () => (
  <WagmiProvider config={config} reconnectOnMount={true}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </WagmiProvider>
);

export default WrappedApp;
