import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link
} from "@material-ui/core";

export default function Footer() {
  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar>
          <Typography align="center" style={{ width: "100%" }}>
            Made by{" "}
            <Link href="https://github.com/Kurdiumov" color="textPrimary">
              Rostyslav Kurdiumov
            </Link>
            .
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
