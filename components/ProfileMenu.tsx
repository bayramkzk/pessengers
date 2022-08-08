import EmailIcon from "@mui/icons-material/Email";
import WarningIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { supabase } from "lib/supabase";
import React from "react";
import UserAvatar from "./UserAvatar";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const user = supabase.auth.user();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) return <WarningIcon />;

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <UserAvatar />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText>{user.email}</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
