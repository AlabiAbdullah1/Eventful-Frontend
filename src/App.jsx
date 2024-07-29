/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import CityList from "./components/CityList";
// import CountryList from "./components/CountryList";
// import City from "./components/City";
// import Form from "./components/Form";
// import { CitiesProvider } from "./contexts/CityContext";
// import { AuthProvider } from "./contexts/FakeAuthContext";
// import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import CreatorSignup from "./pages/CreatorSignup";
import CreatorLogin from "./pages/CreatorLogin";
import EventeeSignup from "./pages/EventeeSignup";
import EventeeLogin from "./pages/EventeeLogin";
import CreatorDashboard from "./pages/CreatorDashboard";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Homepage />} />
          <Route path="creator-signup" element={<CreatorSignup />} />
          <Route path="creator-login" element={<CreatorLogin />} />
          <Route path="eventee-signup" element={<EventeeSignup />} />
          <Route path="eventee-login" element={<EventeeLogin />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="creator-dashboard" element={<CreatorDashboard />} />
          {/* <Route path="product" element={<Product />} />

        // <Route path="pricing" element={<Pricing />} />
        <Route
          path="app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CityList />} />
          <Route path="cities" element={<CityList />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="login" element={<Login />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
