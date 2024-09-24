import React, { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import {
  Card,
  Page,
  Layout,
  Text,
  Button,
  Popover,
  ActionList,
  Modal,
  TextField,
} from "@shopify/polaris";
import { MenuVerticalIcon } from "@shopify/polaris-icons";

const UserAlbums = () => {
  const { id } = useParams();
  const { albums, setAlbums } = useUserContext();
  const userAlbums = albums.filter((album) => album.userId === parseInt(id));
  const navigate = useNavigate();

  const [popoverActiveId, setPopoverActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "Add" or "Edit"
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumTitle, setAlbumTitle] = useState("");

  const togglePopoverActive = useCallback(
      (id) => {
        setPopoverActiveId(popoverActiveId === id ? null : id);
      },
      [popoverActiveId]
  );

  const openModal = (type, album = null) => {
    setModalType(type);
    if (type === "Edit" && album) {
      setSelectedAlbum(album);
      setAlbumTitle(album.title);
    } else {
      setAlbumTitle("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlbum(null);
  };

  const handleAddAlbum = () => {
    const newAlbum = {
      userId: parseInt(id),
      id: albums.length + 1,
      title: albumTitle,
    };
    setAlbums([newAlbum,...albums ]);
    closeModal();
  };

  const handleEditUserAlbums = () => {
    const updatedAlbums = albums.map((album) =>
        album.id === selectedAlbum.id
            ? { ...album, title: albumTitle }
            : album
    );
    setAlbums(updatedAlbums);
    closeModal();
  };

  const handleDeleteAlbum = (albumId) => {
    const updatedAlbums = albums.filter((album) => album.id !== albumId);
    setAlbums(updatedAlbums);
    setPopoverActiveId(null);
  };

  return (
      <Page
          title="Albums"
          primaryAction={{ content: "Add Album", onAction: () => openModal("Add") }}
          backAction={{ content: "Back", onAction: () => navigate(-1) }}
      >
        <Layout>
          {userAlbums.map((album) => (
              <Layout.Section key={album.id}>
                <Card>
                  <div style={{ position: "relative" }}>
                    <div
                        onClick={() => navigate(`/user/${id}/albums/${album.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                      <Text as="h2" variant="headingSm">
                        {album.title}
                      </Text>
                    </div>

                    {/* Popover for Edit/Delete actions */}
                    <div
                        style={{
                          position: "absolute",
                          top: "2px",
                          right: "5px",
                          zIndex: "10",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                      <Popover
                          active={popoverActiveId === album.id}
                          activator={
                            <Button
                                icon={MenuVerticalIcon}
                                variant={"plain"}
                                onClick={() => togglePopoverActive(album.id)}
                            />
                          }
                          onClose={() => togglePopoverActive(album.id)}
                      >
                        <ActionList
                            items={[
                              {
                                content: "Edit",
                                onAction: () => {
                                  openModal("Edit", album);
                                  togglePopoverActive(album.id);
                                },
                              },
                              {
                                content: "Delete",
                                destructive: true,
                                onAction: () => handleDeleteAlbum(album.id),
                              },
                            ]}
                        />
                      </Popover>
                    </div>
                  </div>
                </Card>
              </Layout.Section>
          ))}
        </Layout>

        {/* Modal for Add/Edit Album */}
        {isModalOpen && (
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                title={modalType === "Add" ? "Add New Album" : "Edit Album"}
                primaryAction={{
                  content: modalType === "Add" ? "Add" : "Save",
                  onAction: modalType === "Add" ? handleAddAlbum : handleEditUserAlbums,
                }}
                secondaryActions={[{ content: "Cancel", onAction: closeModal }]}
            >
              <Modal.Section>
                <TextField
                    label="Album Title"
                    value={albumTitle}
                    onChange={(value) => setAlbumTitle(value)}
                    autoComplete="off"
                />
              </Modal.Section>
            </Modal>
        )}
      </Page>
  );
};

export default UserAlbums;
