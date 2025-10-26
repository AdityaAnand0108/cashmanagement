export const footerSx = {
  footer: {
    backgroundColor: "background.paper",
    color: "text.secondary",
    borderTop: "1px solid",
    borderColor: "divider",
    py: 2,
    px: { xs: 2, sm: 4 },
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    justifyContent: "space-between",
    mt: "auto", // keeps footer at the bottom in flex layouts
  },
  text: {
    fontSize: 14,
    textAlign: { xs: "center", sm: "left" },
  },
  links: {
    display: "flex",
    gap: 2,
    mt: { xs: 1, sm: 0 },
  },
  link: {
    fontSize: 14,
    color: "primary.main",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};