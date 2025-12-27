import { Route, Routes } from "react-router";
import { ModalProvider } from "./hooks/ModalContext";

import Login from "./pages/Login";
import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import CreateForm from "./pages/CreateForm";
import FillForm from "./pages/FillForm";
import CompletedForm from "./pages/CompletedForm";
import User from "./pages/User";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <ModalProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* ADMIN */}
        <Route element={<ProtectedRoute allowedRoles={"ADMIN"} />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="create-form" element={<CreateForm />} />
            <Route path="fill-form" element={<FillForm />} />
            <Route path="completed-form" element={<CompletedForm />} />
            <Route path="user" element={<User />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* CLIENT */}
        <Route element={<ProtectedRoute allowedRoles={"CLIENT"} />}>
          <Route path="user" element={<UserLayout />}>
            <Route path="fill-form" element={<FillForm />} />
            <Route path="completed-form" element={<CompletedForm />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </ModalProvider>
  );
}

export default App;
