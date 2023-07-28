import Lottie from "lottie-react";
import LoadingIcon from "@/assets/images/loading.json";
import { Stack } from "@/components/atoms";
import { css } from "@emotion/react";

const Loading = () => {
  const style = {
    height: 300,
    width: 300,
  };
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
      `}
    >
      <Stack
        justify="center"
        align="center"
        sx={css`
          background-color: #fff;
          width: 100vw;
          height: 100vh;
        `}
      >
        <Lottie animationData={LoadingIcon} style={style} />
      </Stack>
    </div>
  );
};

export default Loading;
