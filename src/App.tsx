import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import CompaniesPage from "./pages/companies/CompaniesPage";
import JobApplicationsPage from "./pages/jobApplications/JobApplicationsPage";
import ApplicationEventsPage from "./pages/applicationEvents/ApplicationEventsPage";
import ContactPersonsPage from "./pages/ContactPersonsPage";
import CompanyDetailsPage from "./pages/companies/CompanyDetailsPage";
import JobApplicationDetailsPage from "./pages/jobApplications/JobApplicationDetailsPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/:id" element={<CompanyDetailsPage />} />
          <Route path="/job-applications" element={<JobApplicationsPage />} />
          <Route
            path="/job-applications/:id"
            element={<JobApplicationDetailsPage />}
          />
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
