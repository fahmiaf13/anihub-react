import { useQuery, gql } from "@apollo/client";
// COMPONENT
import { Container, Grid, Stack } from "@/components/atoms/layouts";
import { Button, Typography } from "@/components/atoms";
import { Template } from "@/components/templates";
import { Card, Carousel, Loading } from "@/components/molecules";
// IMAGE
import { heroImg } from "@/assets/images/hero/image";
import { css, useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { CollectionContext } from "@/context/CollectionContext";
import { useContext } from "react";
import { Icon } from "@iconify/react";

type GetListAnimeData = {
  Page: {
    pageInfo: {
      total: number;
      perPage: number;
      lastPage: number;
      currentPage: number;
    };
    media: {
      id: number;
      coverImage: {
        large: string;
      };
      title: {
        english: string;
        romaji: string;
        native: string;
      };
    }[];
  };
};

const GET_LIST_ANIME = gql`
  query GetList {
    Page(page: 10, perPage: 10) {
      pageInfo {
        total
        perPage
        lastPage
        currentPage
      }
      media(type: ANIME) {
        id
        coverImage {
          large
        }
        title {
          english
          romaji
          native
        }
      }
    }
  }
`;

const Home = () => {
  const theme = useTheme();
  const { loading, data, error } = useQuery<GetListAnimeData>(GET_LIST_ANIME);
  const { addToCollection, bookmarkedCollections, removeFromCollection } = useContext(CollectionContext);

  const animatedText = css`
    background-color: transparent;
    color: #333;
    padding: 0.5rem;
    transition: all 0.5s ease-out;
    &:hover {
      background-color: ${theme.colors.neon};
      -webkit-transform: translate2d(2rem, 2rem);
    }
    ""
  `;

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  const medias = data?.Page.media;

  return (
    <Template>
      <section style={{ height: "100vh", width: "100%" }}>
        <Stack>
          <Stack
            justify="flex-end"
            align="center"
            sx={css`
              padding-top: 10rem;
            `}
          >
            <Typography align="center" weight={800} font="mont" size="6xl">
              Explore the Fascinating World of <br /> <span css={animatedText}>Anime</span> & <span css={animatedText}>Manga</span>
            </Typography>
            <Typography weight={200} align="center" size="xl">
              Your Ultimate Anime Sharing Platform
            </Typography>
            <Grid>
              <Button>
                <Typography>Explore</Typography>
              </Button>
            </Grid>
          </Stack>
          <Stack
            justify="flex-end"
            sx={css`
              padding-block: "3rem";
            `}
          >
            <Carousel>
              {heroImg.map((hero, index) => (
                <div key={index}>
                  <div
                    css={css`
                      width: 150px;
                      min-height: 200px;
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
                      src={hero.src}
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </Stack>
        </Stack>
      </section>

      <section style={{ minHeight: "100vh", width: "100%" }}>
        <Container>
          <Typography align="center" size="5xl" font="mont" weight={800}>
            What to Watch
          </Typography>
          <Container
            sx={css`
              margin-top: 3rem;
            `}
          >
            <Typography weight={800} font="mont" size="3xl" align="center">
              ANIME
            </Typography>
            <Stack align="center">
              <Grid container lg={10} spacing={12} direction="row">
                {medias?.map((media, index) => {
                  const isBookmarked = bookmarkedCollections.some((c) => c.id == media.id);

                  const handleBookmarkClick = () => {
                    if (isBookmarked) {
                      removeFromCollection({
                        id: media?.id,
                        title: media?.title,
                        coverImage: media?.coverImage,
                      });
                    } else {
                      addToCollection({
                        id: media?.id,
                        title: media?.title,
                        coverImage: media?.coverImage,
                      });
                    }
                  };
                  return (
                    <Card
                      key={index}
                      sx={css`
                        position: relative;
                      `}
                    >
                      <Stack
                        direction="column"
                        sx={css`
                          padding: 0.3rem;
                        `}
                      >
                        <div style={{ height: "200px" }}>
                          <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "17px" }} src={media.coverImage.large} alt={`test`} />
                        </div>
                        <Stack>
                          <Typography size="base" align="center" weight={800}>
                            {media.title.english || media.title.romaji || media.title.native}
                          </Typography>
                          <Stack justify="flex-end">
                            <Link to={`/details/${media.id}`}>
                              <Button variant="secondary" fullWidth style={{ borderRadius: "10px" }}>
                                <Typography align="center" size="sm" weight={500}>
                                  See More
                                </Typography>
                              </Button>
                            </Link>
                          </Stack>
                        </Stack>
                      </Stack>
                      <button
                        css={css`
                          all: unset;
                          cursor: pointer;
                          position: absolute;
                          top: 20px;
                          right: 20px;
                          background-color: ${theme.colors.primary};
                          display: flex;
                          align-items: center;
                          padding: 5px;
                          border-radius: 100%;
                        `}
                        onClick={handleBookmarkClick}
                      >
                        <Icon icon={isBookmarked ? "mdi:bookmark" : "mdi:bookmark-plus-outline"} width={24} color={theme.colors.danger} />
                      </button>
                    </Card>
                  );
                })}
              </Grid>
            </Stack>
          </Container>
        </Container>
      </section>
    </Template>
  );
};

export default Home;
