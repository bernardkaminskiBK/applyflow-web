import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "../../../api/authApi";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    try {
      setLoading(true);
      setError(null);

      const response = await login({
        email,
        password,
      });

      localStorage.setItem("token", response.token);

      navigate("/");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 400,
          p: 4,
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography
              sx={{
                variant: "h5",
                fontWeight: "bold",
              }}
            >
              ApplyFlow
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Sign in to continue
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            fullWidth
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
