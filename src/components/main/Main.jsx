import React, { Fragment, useContext, useState } from "react";
import "./Main.css";
import { MetamaskAccountContext } from "./../MetamaskAccountProvider";
import { Box, Button, Container, Grid, useMediaQuery } from "@mui/material";
import { styled, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { borderRadius } from "@mui/system";

const Banner = styled("div")(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
  width: "100%",
  padding: theme.spacing(4, 0),
  gap: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    width: "100%",
    height: "auto",
  },
}));

const SubBanner = styled("div")(({ theme }) => ({
  flex: "0.5",
}));

const BannerImage = styled("img")(({ theme }) => ({
  width: "100%",
  opacity: "0.5",
}));

const LinkButton = styled(Link)(({ theme }) => ({
  marginTop: theme.spacing(4),
  width: theme.spacing(15),
  padding: theme.spacing(1, 4),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.primary.dark,
  textAlign: "center",
  borderRadius: theme.spacing(1),
  textDecoration: "none",
  fontWeight: 600,
  border: `2px solid ${theme.palette.primary.dark}`,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: "black",
  },
}));

const Main = () => {
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

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Fragment>
      <Container maxWidth={"lg"}>
        <Banner>
          <SubBanner>
            <BannerImage src="/Metamask-icon.png" />
          </SubBanner>
          <SubBanner>
            {account ? (
              <div>
                <Typography
                  variant={matches ? "subtitle2" : "h6"}
                  textAlign="center"
                >
                  Account: {account}
                </Typography>
                <Box display="flex" justifyContent="space-around" gap={4}>
                  <LinkButton to="/wall">
                    {/* <Button variant="contained" fullWidth> */}
                    Wall
                    {/* </Button> */}
                  </LinkButton>
                  <LinkButton to="/upload-post">Create Post</LinkButton>
                </Box>
              </div>
            ) : (
              <Typography
                variant={matches ? "subtitle2" : "h6"}
                textAlign="center"
              >
                Connect a metamask Wallet
              </Typography>
            )}
          </SubBanner>
        </Banner>
      </Container>
    </Fragment>
  );
};

export default Main;
