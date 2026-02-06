import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";
import Venues from "./pages/Venues";
import Users from "./pages/Users";
import PromoCrud from "./pages/PromoCrud";
import SubscriptionCrud from "./pages/SubscriptionCrud";
import QRGenerator from "./pages/QRGenerator";
import MyQRCodes from "./pages/MyQRCodes";


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return null; // or spinner

  return (
    <Router>
      <Routes>
        {/* ✅ DEFAULT ROUTE */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Home />}
        />

        {/* ✅ PROTECTED ADMIN AREA */}
        <Route
          path="/*"
          element={
            user ? (
              <AdminLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/QRGenerator" element={<QRGenerator />} />
                    <Route path="/my-qrs" element={<MyQRCodes />} />

                  <Route path="/machines" element={<Machines />} />
                  <Route path="/venues" element={<Venues />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/subscriptions" element={<SubscriptionCrud />} />
                  <Route path="/promo-codes" element={<PromoCrud />} />
                  <Route path="/analytics" element={<div>Analytics</div>} />
                  <Route path="/reports" element={<div>Reports</div>} />
                  <Route path="/settings" element={<div>Settings</div>} />
                </Routes>
              </AdminLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;



// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import AdminLayout from './layouts/AdminLayout';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Machines from './pages/Machines';
// import Venues from './pages/Venues';
// import Users from './pages/Users';
// import PromoCrud from './pages/PromoCrud'
// import SubscriptionCrud from './pages/SubscriptionCrud';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route leads to login */}
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />

//         {/* The Dashboard and all other admin pages are grouped inside AdminLayout */}
//         <Route path="/*" element={
//           <AdminLayout>
//             <Routes>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/machines" element={<Machines />} />
//               <Route path="/venues" element={<Venues />} />
//               <Route path="/users" element={<Users />} />
//               {/* Add other placeholders here */}
//               <Route path="/subscriptions" element={<SubscriptionCrud/>} />
//               <Route path="/promo-codes" element={<PromoCrud/>} />
//               <Route path="/ingredients" element={<div>Ingredients Content</div>} />
//               <Route path="/agents" element={<div>Agents Content</div>} />
//               <Route path="/transactions" element={<div>Transactions Content</div>} />
//               <Route path="/analytics" element={<div>Analytics Content</div>} />
//               <Route path="/reports" element={<div>Reports Content</div>} />
//               <Route path="/settings" element={<div>Settings Content</div>} />
//             </Routes>
//           </AdminLayout>
//         } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;