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
import Bookmark from "../atoms/Bookmark";
// import { useState } from "react";

type GetListAnimeData = {
  Page: {
    pageInfo: {
      total: number;
      perPage: number;
      lastPage: number;
      currentPage: number;
    };
    media: {
      id: string;
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
  // const [selectedId, setSelectedId] = useState<number[]>([]);
  const { loading, data, error } = useQuery<GetListAnimeData>(GET_LIST_ANIME);

  const animatedText = css`
    background-color: transparent;
    color: #333;
    padding: 0.5rem;
    transition: all 0.5s ease-out;

    &:hover {
      background-color: ${theme.colors.neon};
      -webkit-transform: translate2d(2rem, 2rem);
    }
  `;

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  const medias = data?.Page.media;

  return (
    <Template>
      <section style={{ height: "100vh", width: "100%" }}>
        <Stack>
          <Stack justify="flex-end" align="center" style={{ paddingTop: "10rem" }}>
            <Typography align="center" weight={800} font="mont" size="6xl">
              Explore the Fascinating World of <br /> <span css={animatedText}>Anime</span>& <span css={animatedText}>Manga</span>
            </Typography>
            <Typography weight={200} align="center" size="xl">
              Your Ultimate Anime Sharing Platform
            </Typography>
            <Grid>
              <Button>Explore</Button>
            </Grid>
          </Stack>
          <Stack justify="flex-end" style={{ paddingBlock: "3rem" }}>
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
                    <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "17px" }} src={hero.src} />
                  </div>
                </div>
              ))}
            </Carousel>
          </Stack>
        </Stack>
      </section>

      <section style={{ minHeight: "100vh", width: "100%" }}>
        <Container>
          <Typography weight={800} font="mont" size="3xl" align="center">
            ANIME
          </Typography>
          <Stack align="center">
            <Grid container lg={10} spacing={12} direction="row">
              {medias?.map((media, index) => (
                <Card key={index} style={{ position: "relative" }}>
                  <Stack direction="column" style={{ padding: "0.3rem" }}>
                    <div style={{ height: "200px" }}>
                      <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "17px" }} src={media.coverImage.large} alt={`test`} />
                    </div>
                    <Stack>
                      <Typography size="base" align="center" weight={800}>
                        {media.title.english || media.title.romaji || media.title.native}
                      </Typography>
                      <Stack justify="flex-end">
                        <Link to={`/details/${media.id}`}>
                          <Button fullWidth style={{ borderRadius: "10px" }}>
                            <Typography align="center" size="sm" weight={900}>
                              See More
                            </Typography>
                          </Button>
                        </Link>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Bookmark
                    style={{ zIndex: 10, position: "absolute", top: 20, right: 20, backgroundColor: `${theme.colors.primary}`, width: 30, height: 30, borderRadius: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                  />
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </section>
    </Template>
  );
};

export default Home;
