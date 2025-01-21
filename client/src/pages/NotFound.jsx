import React from "react";
import { Error as ErrorIcon } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <Stack
        alignItems={"center"}
        spacing={"2rem"}
        justifyContent={"center"}
        height="100%"
      >
        <ErrorIcon sx={{ fontSize: "10rem" }} />
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">Not Found</Typography>
        <Link to="/">Go back to home</Link>
      </Stack>
    </Container>
  );
};

export default NotFound;




// import React from "react";

// const NotFound = () => {
//   return (
//     <div style={{ textAlign: "center", padding: "2rem", color: "gray" }}>
//       <h1>404 - Page Not Found</h1>
//       <p>The page you are looking for does not exist.</p>
//     </div>
//   );
// };

// export default NotFound;
