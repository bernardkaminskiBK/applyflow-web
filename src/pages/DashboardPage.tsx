import { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { getCompanies } from "../api/companiesApi";
import { getJobApplications } from "../api/jobApplicationsApi";
import { getApplicationEvents } from "../api/applicationEventsApi";
import { getContactPersons } from "../api/contactPersonsApi";

export default function DashboardPage() {
  const [companyCount, setCompanyCount] = useState(0);
  const [applicationCount, setApplicationCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);

  useEffect(() => {
    async function loadDashboardData() {
      const [companies, applications, events, contacts] = await Promise.all([
        getCompanies(),
        getJobApplications(),
        getApplicationEvents(),
        getContactPersons(),
      ]);

      setCompanyCount(companies.length);
      setApplicationCount(applications.length);
      setEventCount(events.length);
      setContactCount(contacts.length);
    }

    loadDashboardData();
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <DashboardCard title="Companies" value={companyCount} />
          <DashboardCard title="Job Applications" value={applicationCount} />
          <DashboardCard title="Application Events" value={eventCount} />
          <DashboardCard title="Contact Persons" value={contactCount} />
        </Grid>
      </Box>
    </>
  );
}

type DashboardCardProps = {
  title: string;
  value: number;
};

function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Typography align="center" variant="h4">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
