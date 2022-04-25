import React, { Fragment, useContext } from "react";
import "./Navbar.css";
import { MetamaskAccountContext } from "./../MetamaskAccountProvider";
import Identicon from "identicon.js";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { LinearProgress } from "@mui/material";
const Navbar = () => {
  const {
    account,
    buffer,
    cryptoWall,
    posts,
    loading,
    captureFile,
    uploadPost,
    tipPostOwner,
  } = useContext(MetamaskAccountContext);

  return (
    <Fragment>
      <AppBar position="sticky" top={0}>
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Link to="/">
              <Typography
                variant="h4"
                component="h6"
                color="textPrimary"
                sx={{
                  flexGrow: 1,
                  fontWeight: 600,
                  flex: 1,
                  textDecoration: "none",
                }}
              >
                CRYPTO WALL
              </Typography>
            </Link>
            <Box
              display="flex"
              justifyContent="left"
              alignItems="center"
              gap={2}
            >
              <Typography
                variant="subtitle2"
                component="p"
                sx={{ flexGrow: 1, fontWeight: 600 }}
              >
                {account}
              </Typography>
              {account && (
                <img
                  alt="identicon"
                  src={`data:image/png;base64,${new Identicon(
                    account,
                    30
                  ).toString()}`}
                />
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {loading && <LinearProgress />}
    </Fragment>
  );
};

export default Navbar;
