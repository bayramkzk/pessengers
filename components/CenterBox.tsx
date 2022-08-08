import Box, { BoxProps } from "@mui/material/Box";
import React from "react";

interface CenterBoxProps extends BoxProps {}

const CenterBox: React.FC<CenterBoxProps> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
      {...props}
    />
  );
};

export default CenterBox;
