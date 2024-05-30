import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'


import AppContext from "./Context/Context.jsx";


import { Navbar, Footer, Home, Appointment, AllDoctors, AboutUs , Login , Signup , ErrorPage} from "./import-export/ImportExport.js";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import GoToTop from "./components/GoToTop.jsx";
import OTP from "./components/OTP.jsx";

function App() {

  useEffect(() => {
    Swal.fire({
      title: "<strong>Discord Alert !</strong>",
      html: `
        Alert will be removed once all contributors join the server
      `,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Ok
      `,
    });
  });


  return (
    <BrowserRouter>
      <AppContext>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/alldoctors" element={<AllDoctors />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" component={OTP} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <GoToTop/>
        <Footer />
        <ToastContainer position="top-center" />
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
