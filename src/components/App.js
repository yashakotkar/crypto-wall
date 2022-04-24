import "./App.css";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Main from "./main/Main";
import { MetamaskAccountProvider } from "./MetamaskAccountProvider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./../styles/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wall from './wall/Wall';

function App() {
  return (
    <BrowserRouter>
      <MetamaskAccountProvider>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route path="wall" element={<Wall />} />
              {/* <Route path="/post" element={<Main />} /> */}
            </Routes>
            <Footer />
          </div>
        </ThemeProvider>
      </MetamaskAccountProvider>
    </BrowserRouter>
  );
}

export default App;
