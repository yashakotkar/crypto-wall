import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Typography,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import React, { useContext } from "react";
import { Fragment } from "react";
import { MetamaskAccountContext } from "./../MetamaskAccountProvider";
import { styled } from "@mui/material/styles";
import moment from "moment";
import Identicon from "identicon.js";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Box from "@mui/material/Box";

const Wall = () => {
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

  const PostImage = styled("img")(({ theme }) => ({ width: "100%" }));

  return (
    <Container maxWidth={"sm"} sx={{ paddingTop: 4 }}>
      <Divider>
        <Typography variant="h3" component="h3">
          Wall
        </Typography>
      </Divider>
      {posts.map((post, index) => (
        <Card key={index} sx={{ marginTop: 4 }}>
          <CardHeader
            avatar={
              <Avatar
                src={`data:image/png;base64,${new Identicon(
                  post.author,
                  30
                ).toString()}`}
              />
            }
            action={
              <IconButton
                name={post.id}
                onClick={(e) => {
                  let tipAmount = window.web3.utils.toWei("0.1", "Ether");
                  console.log(post.id, tipAmount);
                  tipPostOwner(post.id, tipAmount);
                }}
                aria-label=""
                variant="standard"
                disabled={loading}
              >
                <AttachMoneyIcon />
              </IconButton>
            }
            title={post.author}
            subheader={moment(post.timestamp * 1000).format(
              "DD MMMM YYYY hh:mm"
            )}
          />

          <CardMedia>
            <PostImage
              alt="postImage"
              src={`https://ipfs.infura.io/ipfs/${post.imageHash}`}
            />
          </CardMedia>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              container
              gap={2}
            >
              <Typography variant="body1" component="span">
                {" "}
                {post.description}
              </Typography>
              <Typography variant="body1" sx={{ minWidth: "20%" }}>
                Tip: {window.web3.utils.fromWei(post.tipAmount, "Ether")} ETH
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Wall;
