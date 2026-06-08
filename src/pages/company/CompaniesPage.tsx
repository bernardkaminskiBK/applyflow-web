import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDeleteDialog from "../../components/common/ConfirmDeleteDialog";
import type { Company } from "../../types/company/company";
import CompanyFormDialog from "../../components/Companies/CompanyFormDialog";
import type { CompanyFormErrors } from "../../types/company/companyFormError";
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
import {
  createCompany,
  deleteCompany,
  getCompanies,
} from "../../api/companiesApi";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [errors, setErrors] = useState<CompanyFormErrors>({});

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [note, setNote] = useState("");

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  async function handleDeleteCompany() {
    if (!selectedCompany) {
      return;
    }

    await deleteCompany(selectedCompany.id);

    await loadCompanies();

    setIsDeleteDialogOpen(false);
    setSelectedCompany(null);
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
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <Link to={`/companies/${company.id}`}>{company.name}</Link>
                </TableCell>
                <TableCell>{company.city}</TableCell>
                <TableCell>{company.website}</TableCell>
                <TableCell>{company.note}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setSelectedCompany(company);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
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

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        title="Delete Company"
        itemType="company"
        itemName={selectedCompany?.name}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteCompany}
      />
    </Box>
  );
}
