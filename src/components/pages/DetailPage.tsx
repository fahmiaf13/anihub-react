import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Template } from "@/components/templates";
import { Loading, Error, Carousel, Modal, Tabs } from "@/components/molecules";
import { Box, Button, Container, Grid, Stack, TextInput, Typography } from "@/components/atoms";
import { css, useTheme } from "@emotion/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext, useState } from "react";
import { ICollection, CollectionContext } from "@/context/CollectionContext";

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
      episodes
      genres
      averageScore
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
  const { loading, error, data } = useQuery<GetDetailAnime>(GET_DETAIL_ANIME, {
    variables: { id },
  });
  const { groups, addToGroup, createNewGroup } = useContext(CollectionContext);
  const [isModalCollection, setIsModalCollection] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ICollection[]>([]);
  const [groupName, setGroupName] = useState<string>("");

  const medias = data?.Media;
  const characters: CharactersType[] = data?.Media?.characters?.nodes ?? [];

  const media: ICollection = {
    id: medias?.id ?? 0,
    coverImage: medias?.coverImage ?? { large: "" },
    title: medias?.title ?? { english: "", romaji: "", native: "" },
  };

  const handleOpenCollectionModal = () => {
    setIsModalCollection(true);
    setSelectedItem([media]);
  };
  const handleCloseCollectionModal = () => {
    setIsModalCollection(false);
    setSelectedItem([]);
    setGroupName("");
  };

  const handleGroupNameChange = (value: string) => {
    setGroupName(value);
  };

  const addToCollection = (groupId: number) => {
    selectedItem.forEach((collection) => {
      addToGroup(collection, groupId);
    });
    handleCloseCollectionModal();
  };

  const handleCreateNewGroup = () => {
    const validateSpecialChar = /^[a-zA-Z0-9_]+$/;
    const isDuplicateName = groups.some((group) => group.name === groupName);
    if (validateSpecialChar.test(groupName)) {
      if (!isDuplicateName) {
        if (groupName.trim() !== "" && selectedItem.length > 0) {
          createNewGroup(groupName, selectedItem);
          setGroupName("");
          handleCloseCollectionModal();
        } else {
          alert("Group name cannot be empty");
        }
      } else {
        alert("Group name already exists");
      }
    } else {
      alert("Group name contains special characters");
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
                <Stack
                  justify="center"
                  align="center"
                  sx={css`
                    margin-left: 5rem;
                    margin-top: 5rem;
                  `}
                >
                  <img
                    src={medias?.coverImage.extraLarge}
                    css={css`
                      border-radius: 17px;
                      height: 400px;
                    `}
                  />
                  <Button onClick={() => handleOpenCollectionModal()} variant="primary">
                    <Stack
                      sx={css`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: auto;
                      `}
                      direction="row"
                    >
                      <Icon icon="ic:round-bookmark" fontSize={24} />
                      <span>Add to collection</span>
                    </Stack>
                  </Button>
                </Stack>
                <Box
                  sx={css`
                    padding-inline-end: 3rem;
                    width: 100%;
                  `}
                >
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
        <Modal isOpen={isModalCollection} onClose={handleCloseCollectionModal}>
          <div
            css={css`
              width: 600px;
              height: 650px;
            `}
          >
            <Stack align="center">
              <div
                css={css`
                  height: 400px;
                `}
              >
                <img
                  src={selectedItem[0]?.coverImage?.large}
                  css={css`
                    border-radius: 17px;
                    height: 100%;
                  `}
                />
              </div>
              <Typography font="mont" weight={800} size="2xl">
                {selectedItem[0]?.title?.english}
              </Typography>
              <Grid
                sx={css`
                  width: 100%;
                `}
              >
                <Tabs>
                  <Tabs.Panel label="Add to collection">
                    <Grid
                      sx={css`
                        margin-top: 1.5rem;
                      `}
                      container
                      spacing={10}
                      sm={12}
                      direction="row"
                    >
                      {groups.map((group, index) => (
                        <Button key={index} onClick={() => addToCollection(group.id)}>
                          <Stack direction="row" align="center">
                            <Icon icon="heroicons:folder-20-solid" />
                            <span>{group.name}</span>
                          </Stack>
                        </Button>
                      ))}
                    </Grid>
                  </Tabs.Panel>
                  <Tabs.Panel label="Create A New Collection">
                    <Stack
                      sx={css`
                        margin-block: 1rem;
                      `}
                    >
                      <TextInput placeholder="group name" value={groupName} onChange={handleGroupNameChange} />
                    </Stack>
                    <Stack
                      direction="row"
                      sx={css`
                        margin-block: 1rem;
                      `}
                    >
                      <Button fullWidth>Discard</Button>
                      <Button fullWidth onClick={handleCreateNewGroup}>
                        Create
                      </Button>
                    </Stack>
                  </Tabs.Panel>
                </Tabs>
              </Grid>
            </Stack>
          </div>
        </Modal>
      </section>
    </Template>
  );
};

export default Details;
