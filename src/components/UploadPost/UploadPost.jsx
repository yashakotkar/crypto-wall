import React, { useContext, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Input,
  LinearProgress,
  styled,
  TextField,
} from "@mui/material";
import { MetamaskAccountContext } from "./../MetamaskAccountProvider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  marginTop: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse",
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flex: 0.5,
  [theme.breakpoints.down("md")]: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  flex: 0.5,
  [theme.breakpoints.down("md")]: {
    flex: 1,
  },
}));

const UploadPost = () => {
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

  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState("");

  return (
    <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Divider>
        <Typography variant="h3" component="h3">
          Create Post
        </Typography>
      </Divider>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (desc && buffer) {
            uploadPost(desc, () => {
              setDesc("");
              setImage(null);
            });
          }
        }}
      >
        <StyledCard>
          <StyledCardContent>
            <Grid container gap={4}>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth={true} variant="standard" >
                <FormLabel>Image</FormLabel>
                  <Input
                    type="file"
                    accept=".jpg, .jpeg, .png, .bmp, .gif"
                    onChange={(e) => {
                      e.preventDefault();
                      setImage(window.URL.createObjectURL(e.target.files[0]));
                      captureFile(e.target.files[0]);
                    }}
                    disabled={loading}
                  />
                </FormControl>
              </Grid>
              <Grid item sx={12} lg={12}>
                <TextField
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Post Description"
                  required
                  fullWidth={true}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <Button
                  fullWidth={true}
                  type="submit"
                  disabled={!desc || !buffer || loading}
                >
                  Upload!
                </Button>
              </Grid>
            </Grid>
          </StyledCardContent>
          <StyledCardMedia component="img" image={image} />

          {/* <CardActions></CardActions> */}
        </StyledCard>
      </form>
    </Container>
  );
};

export default UploadPost;
