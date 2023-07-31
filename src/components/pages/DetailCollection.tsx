import { useNavigate, useParams } from "react-router-dom";
import { Template } from "@/components/templates";
import { Button, Container, Grid, Stack, TextInput, Typography } from "../atoms";
import { CollectionContext } from "@/context/CollectionContext";
import { useContext, useState } from "react";
import { css } from "@emotion/react";
import { Card, Modal } from "../molecules";
import { Icon } from "@iconify/react/dist/iconify.js";
import DeleteImage from "@/assets/images/delete.json";
import Lottie from "lottie-react";

const DetailCollection = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { groups, renameGroup, removeFromGroup } = useContext(CollectionContext);
  const [newName, setNewName] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalRemove, setOpenRemoveModal] = useState<boolean>(false);

  const thisGroup = groups.find((group) => group?.id.toString() === id);

  const handleCloseRemoveModal = () => {
    setOpenRemoveModal(false);
    setSelectedId(null);
  };

  const handleOpenRemoveModal = (collectionId: number) => {
    setOpenRemoveModal(true);
    setSelectedId(collectionId);
  };

  const handleRemoveFromGroup = () => {
    removeFromGroup(selectedId ?? 0, thisGroup?.id ?? 0);
    handleCloseRemoveModal();
  };

  const handleCloseEditModal = () => {
    setOpenModalEdit(false);
    setNewName("");
  };

  const handleOpenEditModal = () => {
    setOpenModalEdit(true);
  };

  const handleChangeCollectionName = (value: string) => {
    setNewName(value);
  };

  const handleRenameGroup = () => {
    const validateSpecialChar = /^[a-zA-Z0-9_]+$/;
    const isDuplicateName = groups.some((group) => group.name === newName);
    if (validateSpecialChar.test(newName)) {
      if (!isDuplicateName) {
        if (newName.trim() !== "") {
          renameGroup(thisGroup?.id ?? 0, newName);
          handleCloseEditModal();
        } else {
          alert("Group name cannot be empty field");
        }
      } else {
        alert("Group name already exists");
      }
    } else {
      alert("Group name contains special characters");
    }
  };
  return (
    <Template title={thisGroup?.name}>
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
          <Stack
            justify="center"
            align="center"
            sx={css`
              height: 100%;
            `}
          >
            <Stack
              direction="row"
              justify="center"
              align="center"
              sx={css`
                height: auto;
              `}
            >
              <div
                onClick={() => handleOpenEditModal()}
                css={css`
                  cursor: pointer;
                `}
              >
                <Typography font="mont" size="4xl" weight={800}>
                  {thisGroup?.name}
                </Typography>
              </div>
            </Stack>
            <Grid spacing={12} xl={10} alignContent="center" container>
              {thisGroup?.collections.map((collection, index) => (
                <div key={index}>
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
                        <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "17px" }} src={collection.coverImage.large} alt={`test`} />
                      </div>
                      <Stack
                        sx={css`
                          height: auto;
                        `}
                      >
                        <Typography size="base" align="center" weight={800}>
                          {collection.title.english || collection.title.romaji || collection.title.native}
                        </Typography>
                        <Stack direction="row" justify="flex-end">
                          <Button onClick={() => handleOpenRemoveModal(collection.id)} variant="secondary">
                            <Icon icon="ic:round-delete" />
                          </Button>
                          <Button onClick={() => navigate(`/details/${collection.id}`)} variant="secondary" fullWidth style={{ borderRadius: "10px" }}>
                            <Typography align="center" size="sm" weight={500}>
                              See More
                            </Typography>
                          </Button>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Card>
                </div>
              ))}
            </Grid>
          </Stack>
          <Modal isOpen={openModalRemove} onClose={handleCloseRemoveModal}>
            <Stack
              justify="center"
              align="center"
              sx={css`
                width: 500px;
                height: auto;
              `}
            >
              <Typography align="center" weight={800} font="mont" size="4xl">
                Are you sure want to delete ?
              </Typography>
              <Lottie animationData={DeleteImage} style={{ height: 300, width: 300 }} />
              <Button fullWidth onClick={() => handleRemoveFromGroup()}>
                Yes
              </Button>
              <Button fullWidth onClick={() => handleCloseRemoveModal()}>
                No
              </Button>
            </Stack>
          </Modal>

          <Modal isOpen={openModalEdit} onClose={handleCloseEditModal}>
            <Stack
              sx={css`
                width: 500px;
                height: auto;
              `}
            >
              <Typography weight={800} font="mont" size="xl">
                Change collection name
              </Typography>
              <Stack>
                <TextInput placeholder="new collection name" value={newName} onChange={handleChangeCollectionName} />
                <Button onClick={() => handleRenameGroup()}>Change</Button>
                <Button onClick={() => handleCloseEditModal()}>Cancel</Button>
              </Stack>
            </Stack>
          </Modal>
        </Container>
      </section>
    </Template>
  );
};

export default DetailCollection;
