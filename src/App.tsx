import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import CompaniesPage from "./pages/CompaniesPage";
import JobApplicationsPage from "./pages/JobApplicationsPage";
import ApplicationEventsPage from "./pages/ApplicationEventsPage";
import ContactPersonsPage from "./pages/ContactPersonsPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/job-applications" element={<JobApplicationsPage />} />
          <Route
            path="/application-events"
            element={<ApplicationEventsPage />}
          />
          <Route path="/contact-persons" element={<ContactPersonsPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
