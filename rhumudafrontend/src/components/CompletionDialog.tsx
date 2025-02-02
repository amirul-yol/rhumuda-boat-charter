import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

interface CompletionDialogProps {
  open: boolean;
  onClose: () => void;
}

const CompletionDialog: React.FC<CompletionDialogProps> = ({
  open,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    // Clear localStorage
    localStorage.removeItem("rhumuda_inquiry_form");
    onClose();
    navigate("/");
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          width: "400px",
          borderRadius: "12px",
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#0384BD",
          color: "white",
          py: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <CheckCircleOutlineIcon />
        Thank you for your inquiry!
      </DialogTitle>
      <DialogContent sx={{ mt: 2, pb: 3 }}>
        <Typography paragraph>
          Your inquiry has been submitted successfully! You will receive an
          inquiry confirmation email shortly with the details of your request.
        </Typography>
        <Typography>
          We will review your request and contact you soon to confirm
          availability and discuss your booking options. Thank you for choosing
          Rhumuda Boat Charter.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            bgcolor: "#0384BD",
            "&:hover": { bgcolor: "rgba(3, 132, 189, 0.9)" },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompletionDialog;
