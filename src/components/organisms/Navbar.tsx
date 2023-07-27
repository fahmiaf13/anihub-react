// components
import { Container, Stack } from "@/components/atoms/layouts";
import { css, useTheme } from "@emotion/react";
import Logo from "@/assets/icons/Logo.svg";
// hooks
import { Typography } from "../atoms";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

const Navbar = () => {
  const theme = useTheme();
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100vw;
        background-color: ${scrolled ? theme.colors.white : "transparent"};
        display: flex;
        transition: background-color 0.3s ease;
      `}
    >
      <Container maxWidth="lg" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Stack direction="row" align="center" justify="space-between" style={{ width: "100%", padding: "2rem 5rem" }}>
          <Stack style={{ backgroundColor: `${theme.colors.white}`, padding: "1rem 1.5rem", borderRadius: "40px" }} direction="row">
            <img
              src={Logo}
              css={css`
                width: 24px;
              `}
            />
            <Stack direction="row" style={{ marginLeft: "1rem" }} spacing={12}>
              <Link to="/">
                <Typography size="lg">Home</Typography>
              </Link>
              <Link to="/">
                <Typography size="lg">Anime</Typography>
              </Link>
              <Link to="/">
                <Typography size="lg">Manga</Typography>
              </Link>
            </Stack>
          </Stack>
          <Stack style={{ backgroundColor: `${theme.colors.white}`, padding: "1rem 1rem", borderRadius: "40px" }} direction="row">
            <Icon icon="bi:bookmark-heart-fill" width={24} color={theme.colors.danger} />
          </Stack>
        </Stack>
      </Container>
    </nav>
  );
};

export default Navbar;
