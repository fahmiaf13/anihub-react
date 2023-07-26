// import { Button } from "@/atoms/inputs";
import { Stack } from "@/components/atoms/layouts";
import { css, useTheme } from "@emotion/react";
// import { Typography } from "@/components/atoms";
import Logo from "@/assets/icons/Logo.svg";
import { Icon } from "@iconify/react";
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
      `}
    >
      <Stack direction="row" justify="center" align="center">
        <div
          css={css`
            background-color: ${theme.colors.white};
            color: ${theme.colors.secondary};
            // width: 100px;
            // height: 80px;
            border-radius: 25px;
            padding: 1rem;
          `}
        >
          <Stack justify="center" direction="row" align="center">
            <Icon icon="ci:hamburger-md" width={24} />
            <Link to="/">
              <img
                src={Logo}
                css={css`
                  width: 24px;
                  margin-inline: ;
                `}
              />
            </Link>
            <Icon icon="material-symbols:collections-bookmark-outline-rounded" width={24} />
          </Stack>
        </div>
      </Stack>
    </nav>
  );
};

export default Navbar;
