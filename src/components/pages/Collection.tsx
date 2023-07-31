import { CollectionContext } from "@/context/CollectionContext";
import { Template } from "../templates";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Grid, Stack, TextInput, Typography } from "../atoms";
import { css, useTheme } from "@emotion/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Modal } from "../molecules";
import { Link } from "react-router-dom";

export default function Collection() {
  const theme = useTheme();
  const { groups, deleteGroup, renameGroup } = useContext(CollectionContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [groupId, setGroupId] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleOpenModal = (id: number) => {
    setIsModalOpen(true);
    setGroupId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setGroupId(null);
    setNewName("");
  };

  const handleGroupRename = () => {
    renameGroup(groupId!, newName);
    handleCloseModal();
  };

  const handleGroupDelete = (groupId: number) => {
    deleteGroup(groupId);
  };

  const handleChangeCollectionName = (value: string) => {
    setNewName(value);
  };

  useEffect(() => {
    const slideshowInterval = setInterval(() => {
      setCurrentIndex((prevImage) => (prevImage + 1) % groups.length);
    }, 3000);

    return () => clearInterval(slideshowInterval);
  }, [groups]);

  return (
    <Template title="Collection">
      <section
        css={css`
          height: 100vh;
        `}
      >
        <Container
          sx={css`
            height: 100%;
          `}
        >
          <Stack align="center" justify="center" direction="column">
            <Typography font="mont" weight={800} size="4xl">
              My Collections
            </Typography>
            <Grid spacing={12} xl={10} alignContent="center" container>
              {groups.map((group, index) => (
                <div key={index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                  <Card
                    sx={css`
                      height: 200px;
                      position: relative;
                    `}
                  >
                    {group.collections.length > 0 && (
                      <img
                        css={css`
                          width: 100%;
                          height: 100%;
                          object-fit: cover;
                          border-radius: 17px;
                        `}
                        src={group.collections[currentIndex]?.coverImage?.large ?? "https://placehold.co/400x600"}
                        alt={`Collection ${index + 1}`}
                      />
                    )}

                    {hoveredIndex === index && (
                      <div
                        css={css`
                          background-color: ${theme.colors.white + "90"};
                          position: absolute;
                          top: 0;
                          left: 0;
                          width: 100%;
                          height: 100%;
                          border-radius: 20px;
                        `}
                      >
                        <Stack>
                          <Stack justify="flex-end">
                            <Link to={`/collection/${group.id}`}>
                              <Typography
                                sx={css`
                                  &:hover {
                                    color: ${theme.colors.neon};
                                  }
                                `}
                                font="mont"
                                weight={800}
                                size="xl"
                                align="center"
                              >
                                {group.name}
                              </Typography>
                            </Link>
                          </Stack>
                          <Stack direction="row" justify="center" align="center">
                            <Button onClick={() => handleOpenModal(group.id)} variant="secondary">
                              <Icon icon="mdi:edit" width={28} />
                            </Button>
                            <Button onClick={() => handleGroupDelete(group.id)} variant="secondary">
                              <Icon icon="ic:round-delete" width={28} />
                            </Button>
                          </Stack>
                        </Stack>
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </Grid>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <Stack
                sx={css`
                  height: auto;
                  width: 300px;
                `}
              >
                <Typography weight={800} font="mont" size="xl">
                  Change collection name
                </Typography>
                <TextInput placeholder="group name" value={newName} onChange={handleChangeCollectionName} />
                <Stack direction="row">
                  <Button fullWidth onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button fullWidth onClick={() => handleGroupRename()}>
                    Change Name
                  </Button>
                </Stack>
              </Stack>
            </Modal>
          </Stack>
        </Container>
      </section>
    </Template>
  );
}
