import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Template } from "@/components/templates";
import { Loading } from "@/components/molecules";
import { Box, Container, Stack, Typography } from "@/components/atoms";
import { css, useTheme } from "@emotion/react";

type GetDetailAnime = {
  Media: {
    title: {
      romaji: string;
      english: string;
      native: string;
      userPreferred: string;
    };
    description: string;
    coverImage: {
      large: string;
      extraLarge: string;
    };
    bannerImage: string;
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
      description
      coverImage {
        large
        extraLarge
      }
      bannerImage
    }
  }
`;

const Details = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { loading, error, data } = useQuery<GetDetailAnime>(GET_DETAIL_ANIME, {
    variables: { id },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const medias = data?.Media;

  return (
    <Template title={medias?.title.english || medias?.title?.romaji || medias?.title?.native}>
      <section style={{ minHeight: "100vh", maxWidth: "100vw" }}>
        <Stack style={{ height: "600px", position: "relative" }}>
          <img
            src={medias?.bannerImage || "https://placehold.co/600x400"}
            css={css`
              width: 100%;
              height: 100%;
              z-index: 1;
              object-fit: cover;
              position: absolute;
              top: 0;
              left: 0;
            `}
          />
          <div
            css={css`
              width: 100%;
              height: 100%;
              background-color: ${theme.colors.secondary};
              opacity: 0.8;
              position: absolute;
              z-index: 10;
              top: 0;
              left: 0;
            `}
          />
          <div
            css={css`
              width: 100vw;
              height: 100%;
              position: absolute;
              z-index: 100;
              top: 0;
              left: 0;
              right: 0;
              color: ${theme.colors.primary};
            `}
          >
            <Container maxWidth="lg" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Stack direction="row" spacing={30} align="center">
                <img
                  src={medias?.coverImage.extraLarge}
                  css={css`
                    border-radius: 17px;
                    height: 400px;
                    margin-left: 5rem;
                  `}
                />
                <Box style={{ paddingInlineEnd: "3rem", width: "100% " }}>
                  <Typography font="mont" weight={800} size="4xl">
                    {medias?.title.english || medias?.title.romaji}
                  </Typography>
                  <Typography weight={300} size="4xl">
                    {medias?.title.native}
                  </Typography>
                  <Typography>{medias?.description}</Typography>
                </Box>
              </Stack>
            </Container>
          </div>
        </Stack>
      </section>
    </Template>
  );
};

export default Details;
