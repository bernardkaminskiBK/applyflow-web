import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

type CompanyFormDialogProps = {
  open: boolean;
  name: string;
  city: string;
  website: string;
  note: string;
  onNameChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onWebsiteChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function CompanyFormDialog({
  open,
  name,
  city,
  website,
  note,
  onNameChange,
  onCityChange,
  onWebsiteChange,
  onNoteChange,
  onClose,
  onSave,
}: CompanyFormDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Company</DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="City"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Website"
          value={website}
          onChange={(e) => onWebsiteChange(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Note"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
