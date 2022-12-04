import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PublicIcon from "@mui/icons-material/Public";
import { MenuItem, Select } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import CancelIcon from "@mui/icons-material/Cancel";
import { useMapContext } from "../../context";

const drawerWidth = 519;

const Index = ({ children }) => {
  const {
    data: { data },
    map,
    setDetailData,
    detailData,
  } = useMapContext();

  const [center, setCenter] = useState("");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          height: "122px",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "#282C38" }}
            fontWeight={700}
            variant="h6"
            noWrap
            component="div"
          >
            TOP-RATED TOURIST ATTRACTIONS IN SINGAPORE
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              color: "#637C80",
            }}
          >
            <SettingsIcon
              sx={{
                fontSize: "31px",
                cursor: "pointer",
              }}
            />
            <HelpIcon
              sx={{
                fontSize: "31px",
                cursor: "pointer",
              }}
            />
            {detailData && (
              <CancelIcon
                onClick={() => setDetailData(null)}
                sx={{
                  fontSize: "31px",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            height: "100vh",
            display: "flex",
          }}
        >
          <List sx={{ pt: 0, width: "151px", backgroundColor: "#313541" }}>
            {["Browse", "Suggest Attraction", "Videos", "Blog", "About"].map(
              (text, index) => (
                <ListItem
                  sx={{ backgroundColor: index === 0 ? "#72CDD2" : "unset" }}
                  key={text}
                  disablePadding
                >
                  <ListItemButton
                    sx={{
                      padding: "27px 0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      color: index === 0 ? "#fff" : "#798B94",
                      borderBottom: "1px solid #2D313C",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* sorry for incorrect icons i have no idea to attach the low quality icon, so just pick from mui icons */}
                      <PublicIcon sx={{ fontSize: "45px" }} />
                    </ListItemIcon>
                    <ListItemText sx={{ maxWidth: "102px" }} primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
          <Box sx={{ pt: 0, width: "368px", backgroundColor: "#282C37" }}>
            <Box
              sx={{
                padding: "38px",
                borderBottom: "1px solid #2D313C",
              }}
            >
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                fullWidth
                value="1"
                sx={{
                  color: "#7C959C",
                }}
              >
                <MenuItem value="1">Filter by favorite</MenuItem>
              </Select>
            </Box>
            <List
              sx={{
                width: "100%",
                bgcolor: "#282C37",
                p: "0 32px 32px 32px",
                mt: "10px",
              }}
              component="nav"
            >
              {data.map((d) => (
                <ListItemButton
                  sx={{
                    color: center === d.title ? "#93D62F" : "#fff",
                    borderBottom: "1px solid #2D313C",
                    pt: "10px",
                    pb: "10px",
                  }}
                  onClick={() => {
                    // move to marker location
                    map.panTo({ lat: d.lat, lng: d.long });

                    // set map zoom to 17
                    map.setZoom(17);

                    // set active list through title
                    setCenter(d.title);
                  }}
                  key={d.title}
                >
                  <ListItemText primary={d.title} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "calc(100vh - 64px)",
          bgcolor: "background.default",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Index;
