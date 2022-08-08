import WarningIcon from "@mui/icons-material/Warning";
import { supabase } from "lib/supabase";
import React from "react";
import LetterAvatar from "./LetterAvatar";

interface SessionAvatarProps {
  size?: number | string;
  fontSize?: number | string;
}

const SessionAvatar: React.FC<SessionAvatarProps> = ({ size, fontSize }) => {
  const user = supabase.auth.user();

  if (!user?.email) return <WarningIcon />;

  return (
    <LetterAvatar
      email={user.email}
      sx={{ width: size, height: size, fontSize }}
    />
  );
};

export default SessionAvatar;
