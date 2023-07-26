import Lottie from "lottie-react";
import LoadingIcon from "@/assets/images/loading.json";
import { Stack } from "@/components/atoms";

const Loading = () => {
  const style = {
    height: 300,
    width: 300,
  };
  return (
    <div css={{ position: "fixed", top: "0", left: "0" }}>
      <Stack justify="center" align="center" style={{ backgroundColor: "#fff", width: "100vw", height: "100vh" }}>
        <Lottie animationData={LoadingIcon} style={style} />
      </Stack>
    </div>
  );
};

export default Loading;
