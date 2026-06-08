import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { createCompany, getCompanies } from "../api/companiesApi";
import type { Company } from "../types/company";
import CompanyFormDialog from "../components/Companies/CompanyFormDialog";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    const data = await getCompanies();
    setCompanies(data);
  }

  async function handleCreateCompany() {
    await createCompany({
      name,
      city,
      website,
      note,
    });

    await loadCompanies();

    setName("");
    setCity("");
    setWebsite("");
    setNote("");

    setIsCreateDialogOpen(false);
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4">Companies</Typography>

        <Button variant="contained" onClick={() => setIsCreateDialogOpen(true)}>
          Add Company
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Website</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Note</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.city}</TableCell>
                <TableCell>{company.website}</TableCell>
                <TableCell>{company.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CompanyFormDialog
        open={isCreateDialogOpen}
        name={name}
        city={city}
        website={website}
        note={note}
        onNameChange={setName}
        onCityChange={setCity}
        onWebsiteChange={setWebsite}
        onNoteChange={setNote}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreateCompany}
      />
    </Box>
  );
}
