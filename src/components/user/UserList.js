import React, { useState } from "react";
import {
  Card,
  Text,
  Avatar,
  InlineGrid,
  BlockStack,
  Modal,
  TextField,
  Tooltip,
  Button,
  ActionList,
  Popover,
  Spinner,
} from "@shopify/polaris";
import {
  PlusIcon,
  BlogIcon,
  ImageWithTextOverlayIcon,
  ListBulletedFilledIcon,
  MenuVerticalIcon, // Import icon ba chấm dọc
} from "@shopify/polaris-icons";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import "../../Stylesheet/AvatarUser.css";

const UserList = () => {
  const { users, setUsers } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPhone, setNewUserPhone] = useState("");
  const [newUserWebsite, setNewUserWebsite] = useState("");
  const [newUserCompany, setNewUserCompany] = useState("");
  const [newUserAddress, setNewUserAddress] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [popoverActiveId, setPopoverActiveId] = useState(null); // Quản lý trạng thái của từng popover
  const [errors, setErrors] = useState({}); // Trạng thái lỗi
  const navigate = useNavigate();

  const togglePopoverActive = (userId) => {
    setPopoverActiveId((prevId) => (prevId === userId ? null : userId));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPhone("");
    setErrors({}); // Reset lỗi khi đóng modal
  };

  const validateUserData = () => {
    const newErrors = {};
    if (!newUserName) newErrors.name = "Name is required";
    if (!newUserEmail) newErrors.email = "Email is required";
    if (!newUserPhone) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const handleSaveUser = () => {
    const newErrors = validateUserData();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const maxId = users.reduce(
      (max, user) => (user.id > max ? user.id : max),
      10,
    );

    const newUser = {
      id: maxId + 1,
      name: newUserName,
      email: newUserEmail,
      phone: newUserPhone,
      website: newUserWebsite,
      company: newUserCompany,
      address: newUserAddress,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    handleCloseModal();
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    togglePopoverActive(null);
  };

  const validateEditedUserData = () => {
    const newErrors = {};
    if (!selectedUser.name) newErrors.name = "Name is required";
    if (!selectedUser.email) newErrors.email = "Email is required";
    if (!selectedUser.phone) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const handleSaveEditedUser = () => {
    const newErrors = validateEditedUserData();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (selectedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? selectedUser : user,
        ),
      );
      setIsEditModalOpen(false);
    }
  };

  const getInitials = (name) => {
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    return initials.toUpperCase();
  };

  const getUserStats = (userId) => {
    const user = users.find((user) => user.id === userId) || {};

    const userPosts = (user.posts || []).length || 0;
    const userAlbums = (user.albums || []).length || 0;
    const userTodos = (user.todos || []).length || 0;
    const completedTodos =
      (user.todos || []).filter((todo) => todo.completed).length || 0;
    const pendingTodos = userTodos - completedTodos;

    return { userPosts, userAlbums, userTodos, completedTodos, pendingTodos };
  };

  const handleUserClick = (id) => {
    navigate(`/user/${id}`);
  };

  const CustomAvatar = ({ initials, size }) => {
    return (
      <div className="avatar-round">
        <Avatar initials={initials} size={size} />
      </div>
    );
  };

  if (!users) return <Spinner />;

  return (
    <>
      <Card title={`Users (${users.length})`}>
        <div style={{ padding: "16px" }}>
          <InlineGrid columns={4} gap="600">
            <div
              style={{
                border: "1.5px dashed #b9b9b9",
                borderRadius: "10px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f4f6f8",
                height: "100%",
                boxSizing: "border-box",
                flexDirection: "column",
              }}
              onClick={handleOpenModal}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  cursor: "pointer",
                  marginBottom: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <PlusIcon />
              </div>
              <Text variant="bodyMd">ADD USER</Text>
            </div>

            {users.map((user) => {
              const { id, name, email, phone } = user;
              const {
                userPosts,
                userAlbums,
                userTodos,
                completedTodos,
                pendingTodos,
              } = getUserStats(id);

              return (
                <div
                  key={id}
                  onClick={() => handleUserClick(id)}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "16px",
                    paddingTop: "30px",
                    backgroundColor: "#fff",
                    height: "340px", // Cố định chiều cao thẻ
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between", // Căn chỉnh các thành phần trong thẻ
                    boxSizing: "border-box",
                    cursor: "pointer",
                    position: "relative", // Cần thiết để căn nút ba chấm
                    transition: "transform 0.2s",
                    overflow: "hidden", // Ngăn chặn nội dung tràn ra ngoài
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <BlockStack
                    vertical="true"
                    alignment="center"
                    spacing="extraTight"
                  >
                    <CustomAvatar initials={getInitials(name)} size="medium" />
                    <div
                      style={{
                        textAlign: "center",
                        overflow: "hidden",
                        marginTop: "15px",
                      }}
                    >
                      <Text
                        variant="headingMd"
                        as="h3"
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {name}
                      </Text>
                      <Text
                        variant="bodyMd"
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {email}
                      </Text>
                      <Text
                        variant="bodyMd"
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {phone}
                      </Text>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "20px",
                        gap: "20px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <BlogIcon
                          color="subdued"
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "4px",
                          }}
                        />{" "}
                        {userPosts}
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ImageWithTextOverlayIcon
                          color="subdued"
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "4px",
                          }}
                        />{" "}
                        {userAlbums}
                      </div>
                      <Tooltip
                        content={`Completed: ${completedTodos}, In progress: ${pendingTodos}`}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <ListBulletedFilledIcon
                            color="subdued"
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "4px",
                            }}
                          />{" "}
                          {userTodos}
                        </div>
                      </Tooltip>
                    </div>
                  </BlockStack>

                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      zIndex: "10",
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn chặn việc click vào nút ba chấm dẫn đến navigation
                    }}
                  >
                    <Popover
                      active={popoverActiveId === id} // Kiểm tra nếu popoverActiveId là của user hiện tại
                      activator={
                        <Button
                          variant={"plain"}
                          icon={MenuVerticalIcon}
                          onClick={() => togglePopoverActive(id)}
                        />
                      }
                      onClose={() => togglePopoverActive(id)}
                    >
                      <ActionList
                        items={[
                          {
                            content: "Edit",
                            onAction: () => {
                              handleEditUser(user);
                              togglePopoverActive(id);
                            },
                          },
                          {
                            content: "Delete",
                            onAction: () => handleDeleteUser(id),
                          },
                        ]}
                      />
                    </Popover>
                  </div>
                </div>
              );
            })}
          </InlineGrid>
        </div>
      </Card>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Create New User"
        primaryAction={{
          content: "Save",
          onAction: handleSaveUser,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleCloseModal,
          },
        ]}
      >
        <Modal.Section>
          <TextField
            label="Name"
            value={newUserName}
            onChange={(value) => {
              setNewUserName(value);
              setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
            }}
            autoComplete="off"
            error={errors.name}
          />
          <TextField
            label="Email"
            value={newUserEmail}
            onChange={(value) => {
              setNewUserEmail(value);
              setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
            }}
            autoComplete="off"
            error={errors.email}
          />
          <TextField
            label="Phone"
            value={newUserPhone}
            onChange={(value) => {
              setNewUserPhone(value);
              setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
            }}
            autoComplete="off"
            error={errors.phone}
          />
          <TextField
            label="Website"
            value={newUserWebsite}
            onChange={(value) => setNewUserWebsite(value)}
            autoComplete="off"
          />
          <TextField
            label="Company"
            value={newUserCompany}
            onChange={(value) => setNewUserCompany(value)}
            autoComplete="off"
          />
          <TextField
            label="Address"
            value={newUserAddress}
            onChange={(value) => setNewUserAddress(value)}
            autoComplete="off"
          />
        </Modal.Section>
      </Modal>

      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User"
        primaryAction={{
          content: "Save",
          onAction: handleSaveEditedUser,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => setIsEditModalOpen(false),
          },
        ]}
      >
        <Modal.Section>
          <TextField
            label="Name"
            value={selectedUser ? selectedUser.name : ""}
            onChange={(value) =>
              setSelectedUser({ ...selectedUser, name: value })
            }
            autoComplete="off"
            error={errors.name}
          />
          <TextField
            label="Email"
            value={selectedUser ? selectedUser.email : ""}
            onChange={(value) =>
              setSelectedUser({ ...selectedUser, email: value })
            }
            autoComplete="off"
            error={errors.email}
          />
          <TextField
            label="Phone"
            value={selectedUser ? selectedUser.phone : ""}
            onChange={(value) =>
              setSelectedUser({ ...selectedUser, phone: value })
            }
            autoComplete="off"
            error={errors.phone}
          />
          <TextField
            label="Website"
            value={selectedUser ? selectedUser.website : ""}
            onChange={(value) =>
              setSelectedUser({ ...selectedUser, website: value })
            }
            autoComplete="off"
          />
          <TextField
            label="Company"
            value={selectedUser ? selectedUser.company : ""}
            onChange={(value) =>
              setSelectedUser({ ...selectedUser, company: value })
            }
            autoComplete="off"
          />
          <TextField
            label="Address"
            value={selectedUser ? selectedUser.address : ""}
            onChange={(value) =>
              setSelectedUser({ ...selectedUser, address: value })
            }
            autoComplete="off"
          />
        </Modal.Section>
      </Modal>
    </>
  );
};

export default UserList;
