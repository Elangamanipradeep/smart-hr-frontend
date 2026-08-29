import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmployeeList from "./pages/Employees/EmployeeList";
import EmployeeForm from "./pages/Employees/EmployeeForm";
import DepartmentList from "./pages/Departments/DepartmentList";
import DepartmentDetails from "./pages/Departments/DepartmentDetails";
import DepartmentForm from "./pages/Departments/DepartmentForm";
import Profile from "./pages/Profile/Profile";
import EmployeeDetails from "./pages/Employees/EmployeeDetails";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserList from "./pages/Users/UserList";
import UserForm from "./pages/Users/UserForm";

import AdminRoute from "./routes/AdminRoute";
import Unauthorized from "./pages/Unauthorized/Unauthorized";

import AIAssistant from "./pages/AIAssistant/AIAssistant";
import AdminOrHRRoute from "./routes/AdminOrHRRoute";

import DashboardLayout from "./layouts/DashboardLayout";

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
    path="/ai-assistant"
    element={
        <AdminOrHRRoute>
            <DashboardLayout>
                <AIAssistant />
            </DashboardLayout>
        </AdminOrHRRoute>
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
            path="/departments/view/:id"
            element={
                <ProtectedRoute>
                    <DepartmentDetails />
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

        <Route

            path="/employees/view/:id"

            element={
                <ProtectedRoute>
                    <EmployeeDetails />
                </ProtectedRoute>
            }

        />

        <Route
            path="/users"
            element={
                <AdminRoute>
                    <UserList />
                </AdminRoute>
            }
        />

        <Route
            path="/users/create"
            element={
                <AdminRoute>
                    <UserForm />
                </AdminRoute>
            }
        />

        <Route
            path="/users/:id/edit"
            element={
                <AdminRoute>
                    <UserForm />
                </AdminRoute>
            }
        />

        <Route
            path="/unauthorized"
            element={<Unauthorized />}
        />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;