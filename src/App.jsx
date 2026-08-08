import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmployeeList from "./pages/Employees/EmployeeList";
import EmployeeForm from "./pages/Employees/EmployeeForm";
import DepartmentList from "./pages/Departments/DepartmentList";
import DepartmentForm from "./pages/Departments/DepartmentForm";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }
        />

        <Route
    path="/employees"
    element={
        <ProtectedRoute>
            <EmployeeList />
        </ProtectedRoute>
    }
/>

        <Route
    path="/employees/create"
    element={
        <ProtectedRoute>
            <EmployeeForm />
        </ProtectedRoute>
    }
/>

        <Route
    path="/employees/edit/:id"
    element={
        <ProtectedRoute>
            <EmployeeForm />
        </ProtectedRoute>
    }
/>

        <Route
    path="/departments"
    element={
        <ProtectedRoute>
            <DepartmentList />
        </ProtectedRoute>
    }
/>

        <Route
    path="/departments/create"
    element={
        <ProtectedRoute>
            <DepartmentForm />
        </ProtectedRoute>
    }
/>

        <Route
    path="/departments/edit/:id"
    element={
        <ProtectedRoute>
            <DepartmentForm />
        </ProtectedRoute>
    }
/>

        <Route
    path="/profile"
    element={
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    }
/>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;