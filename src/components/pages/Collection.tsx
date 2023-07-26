import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Template } from "@/components/templates";
import { Loading } from "@/components/molecules";
import Cardss from "../molecules/Cardss";

type GetDetailAnime = {
  Media: {
    title: {
      romaji: string;
      english: string;
      native: string;
      userPreferred: string;
    };
  };
};

const GET_DETAIL_ANIME = gql`
  query GetList($id: Int) {
    Media(type: ANIME, id: $id) {
      title {
        romaji
        english
        native
        userPreferred
      }
      coverImage {
        large
      }
    }
  }
`;

const Collection = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<GetDetailAnime>(GET_DETAIL_ANIME, {
    variables: { id },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const medias = data?.Media;

  return (
    <Template title={medias?.title.english}>
      {medias?.title.english || medias?.title?.romaji || medias?.title?.native}
      <Cardss />
    </Template>
  );
};

export default Collection;
