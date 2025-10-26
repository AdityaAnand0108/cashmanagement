import { Padding } from "@mui/icons-material";

export const headerSx = {
  appBar: {
    backgroundColor: "background.paper", // follows theme
    color: "text.primary",
    boxShadow: 1,
  },
  toolbar: {
    display: "flex",
    gap: 2,
    alignItems: "center",
    minHeight: { xs: 64, sm: 72 },
    px: { xs: 1, sm: 3 },
  },
  menuButton: {
    mr: 1,
    display: { xs: "inline-flex", sm: "none" }, // show on mobile
  },
  title: {
    fontWeight: 600,
    FontFace: "Roboto, sans-serif",
    letterSpacing: 0.2,
    flexShrink: 0,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    Padding: 5,
  },
  iconButton: {
    ml: 1,
  },
  avatarButton: {
    ml: 1,
  },
  avatar: {
    width: 34,
    height: 34,
    bgcolor: "primary.main",
    fontSize: 14,
  },
};
