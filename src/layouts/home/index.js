import Box from "@mui/material/Box";
import Navbar from "./components1/navbar";
import GeneralInformation from "./components1/generalInformation";
import ScholarshipHolder from "./components1/scholarshipHolder";
import ApplyTheProgram from "./components1/applyTheProgram";
import NecessaryDocuments from "./components1/necessaryDocuments";
import Note from "./components1/note";
import Footer from "./components1/footer";

import background from "../../assets/images/home-images/pexels-pixabay.png";

function Home() {
  return (
    <Box>
      <Navbar />
      <GeneralInformation />
      <ScholarshipHolder />
      <ApplyTheProgram />
      <NecessaryDocuments />
      <Box
        sx={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "unset",
          backgroundBlendMode: "multiply",
          backgroundColor: "#00233F",
        }}
      >
        <Note />
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
