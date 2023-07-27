import Lottie from "lottie-react";
import ErrorIcon from "@/assets/images/error.json";
import { Button, Stack, Typography } from "@/components/atoms";
import { Link } from "react-router-dom";

const Error = () => {
  const style = {
    height: 300,
    width: 300,
  };
  return (
    <div css={{ position: "fixed", top: "0", left: "0" }}>
      <Stack justify="center" align="center" style={{ backgroundColor: "#fff", width: "100vw", height: "100vh" }}>
        <Typography font="mont" weight={800} size="5xl">
          Page not found!
        </Typography>
        <Lottie animationData={ErrorIcon} style={style} />
        <Link to="/">
          <Button variant="secondary">
            <Typography font="mont" weight={800} size="xl">
              Back
            </Typography>
          </Button>
        </Link>
      </Stack>
    </div>
  );
};

export default Error;
