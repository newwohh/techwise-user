import React from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";

const ContactUs = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: "30px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Us
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Your Name"
              variant="outlined"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" variant="outlined" required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{
            marginTop: "20px",
            color: "white",
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
            boxShadow: "none",
          }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ContactUs;
