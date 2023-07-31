import { useParams } from "react-router-dom";

const DetailCollection = () => {
  const { name } = useParams<{ name: string }>();
  return <div>{name}</div>;
};

export default DetailCollection;
