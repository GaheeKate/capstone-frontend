import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import QuestionData from "./components/Question";
import Result from "./components/Result";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import SignupUserForm from "./features/users/SignupUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("AnimalTrait");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="QuestionData" element={<QuestionData />} />
        <Route path="Result" element={<Result />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignupUserForm />} />

        {/* Protected Routes */}

        <Route
          element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
        >
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />
                }
              >
                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path=":id" element={<EditUser />} />
                  <Route path="new" element={<NewUserForm />} />
                </Route>
              </Route>

              <Route path="notes">
                <Route index element={<NotesList />} />
                <Route path=":id" element={<EditNote />} />
                <Route path=":id" element={<NewNote />} />
              </Route>
            </Route>
            {/* End Dash */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
