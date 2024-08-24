import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader.tsx";

const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Courses = lazy(() => import("./pages/Courses.tsx"));
const Students = lazy(() => import("./pages/Students.tsx"));
const Teachers = lazy(() => import("./pages/Teachers.tsx"));
const Transactions = lazy(() => import("./pages/Transactions.tsx"));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />}></Route>
            <Route path="/admin/courses" element={<Courses />}></Route>
            <Route path="/admin/students" element={<Students />}></Route>
            <Route path="/admin/teachers" element={<Teachers />}></Route>
            <Route
              path="/admin/transactions"
              element={<Transactions />}
            ></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
