import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme/Themes";
import { grey } from "@mui/material/colors";
import WeekView from "./templates/WeekView";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          border: "1px solid " + grey[900],
          borderRadius: 1,
          minHeight: "100vh",
          p: "0 !important"
        }}
      >
        <WeekView />
      </Container>
    </ThemeProvider>
  );
};

export default App;
