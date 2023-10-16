import { Grid, Link, Typography } from "@mui/material";
import typography from "assets/theme/base/typography";
import AMAAH4 from "../../../../components/AMAAH4";

function Note() {
  return (
    <Grid container spacing={1} sx={{ textAlign: "center", paddingBottom: "25px" }}>
      <Grid
        container
        item
        spacing={3}
        sx={{
          width: { md: "900px", sm: "545px", xs: "370px" },
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 !important",
        }}
      >
        <Grid
          item
          xs={7}
          md={12}
          sx={{ marginTop: { md: "5%", sm: "5%", xs: "10%" }, padding: "0 !important" }}
        >
          <AMAAH4
            variant="h2"
            fontSize={{
              lg: 32,
              md: 30,
              sm: 27,
              xs: 18,
            }}
            sx={{
              color: "#FFFFFF",
            }}
          >
            Ծանոթագրություն
          </AMAAH4>
          <Typography
            fontSize={{
              lg: 16,
              md: 14,
              sm: 11,
              xs: 10,
            }}
            sx={{
              color: "#fff",
              paddingTop: "25px",
              marginBottom: "13px",
            }}
          >
            Հայտում նշված անձնական տեղեկությունները հրապարակման ենթակա չեն: Այդ տեղեկություններն
            օգտագործվելու են բացառապես AMAA-ի կրթաթոշակի ծրագրի շրջանակում՝ հանձնաժողովի կողմից
            հայտերի դիտարկման համար։
          </Typography>

          <Typography
            fontSize={{
              lg: 24,
              md: 23,
              sm: 20,
              xs: 17,
            }}
            sx={{
              color: "#33C9BF",
              fontFamily: "Mardoto-Medium",
            }}
          >
            Ծրագրի արդյունքների ամփոփումը՝ մինչև տվյալ տարվա նոյեմբերի 30-ը։
          </Typography>
          <Typography
            fontSize={{
              lg: 16,
              md: 14,
              sm: 11,
              xs: 10,
            }}
            sx={{
              color: "#fff",
              paddingTop: "25px",
              marginBottom: "13px",
              fontFamily: typography.fontFamily,
            }}
          >
            Եթե հայտը լրացնելիս առաջանում են տեխնիկական դժվարություններ, խնդրում ենք կապ հաստատել
            մեզ հետ՝ զանգահարելով (+374 10) 54 35 76 հեռախոսահամարին, կամ գրել scholarship@amaa.am
            էլ. հասցեին։
          </Typography>
          <Typography
            fontSize={{
              lg: 14,
              md: 14,
              sm: 11,
              xs: 10,
            }}
            sx={{
              color: "#fff",
              paddingTop: "25px",
              marginBottom: "13px",
              fontFamily: typography.fontFamily,
            }}
          >
            Ծրագրին ավելի մանրամասն կարող եք ծանոթանալ{" "}
            <Link
              href="https://amaa.am/%D5%AE%D6%80%D5%A1%D5%A3%D6%80%D5%A5%D6%80/%D5%AF%D6%80%D5%A9%D5%A1%D5%A9%D5%B8%D5%B7%D5%A1%D5%AF/"
              target="_blank"
              underline="none"
              color="#33C9BF"
              fontSize={{
                lg: 14,
                md: 14,
                sm: 11,
                xs: 10,
              }}
              sx={{
                opacity: 1,
                "&:hover": {
                  opacity: 0.8,
                },
                fontFamily: typography.fontFamily,
              }}
            >
              «Հաճախակի տրվող հարցեր»
            </Link>{" "}
            բաժնում
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Note;
