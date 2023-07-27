// components
import { Stack } from "@/components/atoms/layouts";
import { css, useTheme } from "@emotion/react";
import Logo from "@/assets/icons/Logo.svg";
// hooks
import { Typography } from "../atoms";
import { Link } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();

  return (
    <nav
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100vw;
        padding: 1rem 0;
        background-color: ${theme.colors.white};
      `}
    >
      <Stack direction="row" justify="center" align="center">
        <Stack justify="center" direction="row" align="center">
          <Link to="/">
            <Stack direction="row">
              <img
                src={Logo}
                css={css`
                  width: 24px;
                `}
              />
              <Typography weight={800} size="2xl" font="mont">
                Ani
                <span
                  css={css`
                    color: ${theme.colors.neon};
                  `}
                >
                  Hub
                </span>
              </Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    </nav>
  );
};

export default Navbar;
