import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import { getCompanies } from "../api/companiesApi";
import { getJobApplications } from "../api/jobApplicationsApi";
import { getApplicationEvents } from "../api/applicationEventsApi";
import { getContactPersons } from "../api/contactPersonsApi";
import ErrorSnackbar from "../components/common/ErrorSnackbar";
import DashboardContent from "../components/Dashboard/DashboardContent";
import DashboardCard from "../components/Dashboard/DashboardCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import type { DashboardStats } from "../types/dashboard/DashboardStats";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    companyCount: 0,
    applicationCount: 0,
    eventCount: 0,
    contactCount: 0,
  });

  const dashboardCards = [
    { title: "Companies", value: stats.companyCount },
    { title: "Job Applications", value: stats.applicationCount },
    { title: "Application Events", value: stats.eventCount },
    { title: "Contact Persons", value: stats.contactCount },
  ];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    setError("");

    Promise.all([
      getCompanies(),
      getJobApplications(),
      getApplicationEvents(),
      getContactPersons(),
    ])
      .then(([companies, applications, events, contacts]) => {
        setStats({
          companyCount: companies.length,
          applicationCount: applications.length,
          eventCount: events.length,
          contactCount: contacts.length,
        });
      })
      .catch((error) => {
        console.error(error);
        setError("Dashboard data could not be loaded.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {dashboardCards.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              value={card.value}
            />
          ))}
        </Grid>
      </Box>

      <DashboardContent />

      <ErrorSnackbar
        open={Boolean(error)}
        message={error}
        onClose={() => setError("")}
      />
    </>
  );
}
