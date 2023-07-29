import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Template } from "@/components/templates";
import { Loading, Error, Carousel } from "@/components/molecules";
import { Box, Container, Stack, Typography } from "@/components/atoms";
import { css, useTheme } from "@emotion/react";
import { ICollection, CollectionContext } from "@/context/CollectionContext";
import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

type CharactersType = {
  image: {
    medium: string;
  };
  name: {
    full: string;
  };
};

type GetDetailAnime = {
  Media: {
    id: number;
    title: {
      romaji: string;
      english: string;
      native: string;
    };
    description: string;
    coverImage: {
      large: string;
      extraLarge: string;
    };
    characters: {
      nodes: CharactersType[];
    };
    bannerImage: string;
  };
};

const GET_DETAIL_ANIME = gql`
  query GetList($id: Int) {
    Media(type: ANIME, id: $id) {
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
        large
        extraLarge
      }
      bannerImage
      characters {
        nodes {
          image {
            medium
          }
          name {
            full
          }
        }
      }
    }
  }
`;

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const { addToCollection, bookmarkedCollections, removeFromCollection } = useContext(CollectionContext);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { loading, error, data } = useQuery<GetDetailAnime>(GET_DETAIL_ANIME, {
    variables: { id },
  });

  const medias = data?.Media;
  const characters: CharactersType[] = data?.Media?.characters?.nodes ?? [];

  const collectionPayload: ICollection = {
    id: medias?.id ?? 0,
    title: {
      english: medias?.title?.english ?? "",
      romaji: medias?.title?.romaji ?? "",
      native: medias?.title?.native ?? "",
    },
    coverImage: {
      large: medias?.coverImage?.large ?? "",
    },
  };

  useEffect(() => {
    const isCollectionBookmarked = bookmarkedCollections.some((c) => c.id === medias?.id);
    setIsBookmarked(isCollectionBookmarked);
  }, [bookmarkedCollections, medias?.id]);

  const handleToggleBookmark = () => {
    if (isBookmarked) {
      removeFromCollection(collectionPayload);
    } else {
      addToCollection(collectionPayload);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Template title={medias?.title.english || medias?.title?.romaji || medias?.title?.native}>
      <section
        css={css`
          min-height: 100vh;
          max-width: 100vw;
        `}
      >
        <Stack
          sx={css`
            height: 600px;
            position: relative;
          `}
        >
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
              z-index: 20;
              top: 0;
              left: 0;
              right: 0;
              color: ${theme.colors.primary};
            `}
          >
            <Container
              maxWidth="lg"
              sx={css`
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
              `}
            >
              <Stack direction="row" spacing={30} align="center">
                <img
                  src={medias?.coverImage.extraLarge}
                  css={css`
                    border-radius: 17px;
                    height: 400px;
                    margin-left: 5rem;
                  `}
                />
                <Box
                  sx={css`
                    padding-inline-end: 3rem;
                    width: 100%;
                  `}
                >
                  <button
                    css={css`
                      all: unset;
                      cursor: pointer;
                      background-color: ${isBookmarked ? theme.colors.danger : theme.colors.primary};
                      display: flex;
                      align-items: center;
                      padding: 6px 10px;
                      border-radius: 30px;
                      gap: 0.3rem;
                      color: ${theme.colors.secondary};
                      transition: all 0.3s ease-in-out;
                    `}
                    onClick={handleToggleBookmark}
                  >
                    {isBookmarked ? (
                      <>
                        <Icon icon="mdi:bookmark" width={28} color={theme.colors.secondary} />
                        <span>Already bookmarked</span>
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:bookmark-plus-outline" width={28} color={theme.colors.secondary} />
                        <span>Add to bookmark</span>
                      </>
                    )}
                    {/* <Icon icon={isBookmarked ? "mdi:bookmark" : "mdi:bookmark-plus-outline"} width={24} color={theme.colors.danger} /> */}
                  </button>
                  <Typography font="mont" weight={800} size="4xl">
                    {medias?.title.english || medias?.title.romaji}
                  </Typography>
                  <Typography weight={300} size="2xl">
                    {medias?.title.native}
                  </Typography>
                  <Typography>
                    <p dangerouslySetInnerHTML={{ __html: medias?.description ?? "" }} />
                  </Typography>
                </Box>
              </Stack>
            </Container>
          </div>
        </Stack>
        <Container>
          <Stack>
            <Typography
              font="mont"
              weight={800}
              size="4xl"
              sx={css`
                padding-block: 3rem;
              `}
            >
              Characters
            </Typography>
            <Carousel>
              {characters?.map((char, index) => (
                <div key={index}>
                  <div
                    css={css`
                      width: 150px;
                      height: 200px;
                      border: 3px solid ${theme.colors.secondary};
                      border-radius: 20px;
                      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                      transition: box-shadow 0.3s ease;
                      &:hover {
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12);
                      }
                    `}
                  >
                    <img
                      css={css`
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 17px;
                      `}
                      src={char?.image?.medium}
                    />
                    <Typography
                      align="center"
                      weight={300}
                      sx={css`
                        padding-block: 1rem;
                      `}
                    >
                      {char?.name.full}
                    </Typography>
                  </div>
                </div>
              ))}
            </Carousel>
          </Stack>
        </Container>
      </section>
    </Template>
  );
};

export default Details;
