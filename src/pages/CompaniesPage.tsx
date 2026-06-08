import { useEffect, useState } from "react";
import { createCompany, getCompanies } from "../api/companiesApi";
import type { Company } from "../types/company";
import CompanyFormDialog from "../components/Companies/CompanyFormDialog";
import type { CompanyFormErrors } from "../types/CompanyFormError";
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

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [errors, setErrors] = useState<CompanyFormErrors>({});

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
    try {
      setErrors({});

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
      setErrors({});

      setIsCreateDialogOpen(false);
    } catch (error: any) {
      const validationErrors = error.response?.data?.errors;

      setErrors({
        name: validationErrors?.Name?.[0],
        city: validationErrors?.City?.[0],
        website: validationErrors?.Website?.[0],
        note: validationErrors?.Note?.[0],
      });
    }
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
        errors={errors}
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
