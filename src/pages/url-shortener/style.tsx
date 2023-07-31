import { Box, styled, TextField, Typography } from "@mui/material";

export const MainContainer = styled(Box)({
  marginTop: "5rem",
  className: "font-barlow",
});

export const Title = styled(Typography)({
  alignSelf: "center",
});

export const InputText = styled(TextField)({
  width: "100%",
});

export const InputError = styled("span")({
  position: "absolute",
  bottom: "-16px",
  left: "8px",
  fontSize: "smaller",
  color: "red !important",
});
