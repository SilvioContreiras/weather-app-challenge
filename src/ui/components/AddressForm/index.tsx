import React, { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { validateAddress } from "@utils/validateAddress";

interface Props {
  onAddressSubmit: (address: string) => void;
  onClear: () => void;
}

const AddressInput: React.FC<Props> = ({ onAddressSubmit, onClear }) => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleClear();
    if (validateAddress(address)) {
      onAddressSubmit(address);
    } else {
      setError(
        "Please provide a valid address with a structure number and street name."
      );
    }
  };

  const handleClear = () => {
    setAddress("");
    onClear();
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems="center"
        gap={2}
      >
        <TextField
          label="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="outlined"
          margin="none"
          size="small"
          sx={{ width: "560px" }}
          placeholder="1600 Pennsylvania Ave NW, Washington, DC 20500 "
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          disabled={!address.trim()}
        >
          Get Weather
        </Button>
        <Button
          type="button"
          variant="contained"
          color="error"
          size="medium"
          onClick={handleClear}
        >
          Clear
        </Button>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default AddressInput;
