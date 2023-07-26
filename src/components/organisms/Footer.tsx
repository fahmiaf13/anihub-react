import { css, useTheme } from "@emotion/react";
import { Stack, Typography } from "@/components/atoms";

const Footer = () => {
  const theme = useTheme();
  return (
    <footer
      css={css`
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.primary};
        padding: 2rem;
      `}
    >
      <Stack justify="center" align="center">
        <Typography size="4xl" font="mont" weight={800}>
          AniHub
        </Typography>
      </Stack>
    </footer>
  );
};

export default Footer;
