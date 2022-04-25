import "./App.css";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Main from "./main/Main";
import { MetamaskAccountProvider } from "./MetamaskAccountProvider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./../styles/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wall from "./wall/Wall";
import UploadPost from "./UploadPost/UploadPost";
import { Paper, styled } from "@mui/material";

const StyledPage = styled(Paper)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column"
}));

const Page = styled(Paper)(({ theme }) => ({
  flex: 1,
}));

function App() {
  return (
    <BrowserRouter>
      <MetamaskAccountProvider>
        <ThemeProvider theme={theme}>
          <StyledPage>
            <Navbar />
            <Page>
              <Routes>
                <Route exact path="/" element={<Main />} />
                <Route path="wall" element={<Wall />} />
                <Route path="/upload-post" element={<UploadPost />} />
              </Routes>
            </Page>
            <Footer />
          </StyledPage>
        </ThemeProvider>
      </MetamaskAccountProvider>
    </BrowserRouter>
  );
}

export default App;
