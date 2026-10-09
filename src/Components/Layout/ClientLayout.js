import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import ProductQuickViewModal from '../Product/ProductQuickViewModal';

const ClientLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#fbfbfb]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ProductQuickViewModal />
    </div>
  );
};

export default ClientLayout;
