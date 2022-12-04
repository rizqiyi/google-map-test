import React from "react";
import { Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import DetailPoster from "../../images/detail.jpg";
import { useMapContext } from "../../context";

const Index = () => {
  const { detailData } = useMapContext();

  return (
    <Drawer
      sx={{
        width: `calc(100% - 367px)`,
        position: "relative",
        zIndex: 0,
      }}
      hideBackdrop
      anchor="right"
      open={!!detailData ?? false}
    >
      <img
        src={DetailPoster}
        style={{ marginTop: "122px" }}
        width="100%"
        height="296px"
        alt="detail"
      />
      <Box sx={{ padding: "10px 37px", backgroundColor: "#72CDD2" }}>
        <Typography sx={{ color: "#fff" }} variant="h6">
          {detailData?.title}
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "20px 37px",
          backgroundColor: "#313541",
          height: "100%",
        }}
      >
        <Typography
          sx={{ color: "#CCCCCC", maxWidth: "277px" }}
          variant="body2"
        >
          {detailData?.description}
        </Typography>

        <Box sx={{ mt: "40px", display: "flex", alignItems: "center" }}>
          <LocationOnIcon sx={{ color: "#70CDD4" }} />
          <Typography sx={{ color: "#CCCCCC", ml: "5px" }} variant="body2">
            {detailData?.title}, Singapore
          </Typography>
        </Box>
        <Box sx={{ mt: "20px", display: "flex", alignItems: "center" }}>
          <LanguageIcon sx={{ color: "#93D72E" }} />
          <Typography sx={{ color: "#CCCCCC", ml: "5px" }} variant="body2">
            www.website.com
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Index;
