export const baseButton = {
  active: {
    background: "linear-gradient(45deg, #ffbc00, #ff0058, #8B3489)",
    boxShadow: "none !important",
    transform: "translateY(1px) !important",
  },
  base: {
    backgroundColor: "#fff",
    marginTop: 4,
    touchAction: "manipulation",
    transition: "all 150ms cubic-bezier(.23, 1, 0.32, 1)",
    userSelect: "none",
    WebkitUserSelect: "none",
    willChange: "transform",
  },
  hover: {
    background: "linear-gradient(45deg, #ffbc00, #ff0058, #8B3489)",
    border: "none",
    boxShadow: "rgba(0, 0, 0, 0.25) 0 8px 15px",
    color: "#fff",
    fontSize: "1.2rem",
    transform: "translateY(-1px)",
  },
};
