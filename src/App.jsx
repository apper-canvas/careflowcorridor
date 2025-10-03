import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/organisms/Sidebar";
import MobileSidebar from "@/components/organisms/MobileSidebar";
import Header from "@/components/organisms/Header";
import Dashboard from "@/components/pages/Dashboard";
import Patients from "@/components/pages/Patients";
import Appointments from "@/components/pages/Appointments";
import Doctors from "@/components/pages/Doctors";
import Departments from "@/components/pages/Departments";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <Sidebar />
          <MobileSidebar 
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)} 
          />
          
          <div className="flex-1 flex flex-col min-h-screen">
            <Header 
              onMenuClick={() => setIsMobileMenuOpen(true)}
              onQuickAction={() => {}}
            />
            
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/departments" element={<Departments />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;