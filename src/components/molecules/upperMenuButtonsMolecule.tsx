import { HomeTwoTone, ReplayTwoTone } from "@mui/icons-material";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Link from "@mui/material/Link/Link";

interface IUpperMenuButtonsMolecule {
  showControls: boolean;
}

export const UpperMenuButtonsMolecule: React.FC<IUpperMenuButtonsMolecule> = ({
  showControls,
}) => {
  return (
    <Box
      style={{
        position: "fixed",
        top: 32,
        width: "100vw",
        display: showControls ? "flex" : "none",
        justifyContent: "space-around",
      }}
    >
      <Link href="https://mesttech.com.br">
        <Button variant="outlined">
          <HomeTwoTone />
        </Button>
      </Link>
      <Button onClick={() => window.location.reload()} variant="outlined">
        <ReplayTwoTone />
      </Button>
    </Box>
  );
};
