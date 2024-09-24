import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Card, Layout, Text, Button, Popover, ActionList, Modal, TextField } from '@shopify/polaris';
import { MenuVerticalIcon } from '@shopify/polaris-icons';
import { useUserContext } from '../../contexts/UserContext';

const AllPosts = () => {
  const navigate = useNavigate();
  const { posts, setPosts } = useUserContext();
  const [popoverActiveId, setPopoverActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // "Add" or "Edit"
  const [selectedPost, setSelectedPost] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const togglePopoverActive = useCallback((id) => {
    setPopoverActiveId(popoverActiveId === id ? null : id);
  }, [popoverActiveId]);

  const openModal = (type, post = null) => {
    setModalType(type);
    if (type === 'Edit' && post) {
      setSelectedPost(post);
      setPostTitle(post.title);
      setPostBody(post.body);
    } else {
      setPostTitle('');
      setPostBody('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleAddPost = () => {
    const newPost = {
      userId: 1,
      id: posts.length + 1,
      title: postTitle,
      body: postBody,
    };
    setPosts([newPost, ...posts]);
    closeModal();
  };

  const handleEditPost = () => {
    const updatedPosts = posts.map((post) =>
        post.id === selectedPost.id ? { ...post, title: postTitle, body: postBody } : post
    );
    setPosts(updatedPosts);
    closeModal();
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    setPopoverActiveId(null);
  };

  const handleNavigateToPostDetail = (userId, postId) => {
    navigate(`/user/${userId}/posts/${postId}`);
  };

  return (
      <Page
          title="All Posts"
          primaryAction={{ content: 'Add Post', onAction: () => openModal('Add') }}
          backAction={{ content: 'Back', onAction: () => navigate(-1) }}
      >
        <Layout>
          {posts.map((post) => (
              <Layout.Section key={post.id}>
                <Card>
                  <div style={{ position: 'relative' }}>
                    <div
                        onClick={() => handleNavigateToPostDetail(post.userId, post.id)}
                        style={{ cursor: 'pointer' }}
                    >
                      <Text as="p">{post.title}</Text>
                    </div>

                    {/* Popover for Edit/Delete actions */}
                    <div
                        style={{
                          position: 'absolute',
                          top: '2px',
                          right: '2px',
                          zIndex: '10',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                      <Popover
                          active={popoverActiveId === post.id}
                          activator={
                            <Button
                                icon={MenuVerticalIcon}
                                variant={"plain"}
                                onClick={() => togglePopoverActive(post.id)}
                            />
                          }
                          onClose={() => togglePopoverActive(post.id)}
                      >
                        <ActionList
                            items={[
                              {
                                content: 'Edit',
                                onAction: () => {
                                  openModal('Edit', post);
                                  togglePopoverActive(post.id);
                                },
                              },
                              {
                                content: 'Delete',
                                destructive: true,
                                onAction: () => handleDeletePost(post.id),
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

        {/* Modal for Add/Edit Post */}
        {isModalOpen && (
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                title={modalType === 'Add' ? 'Add New Post' : 'Edit Post'}
                primaryAction={{
                  content: modalType === 'Add' ? 'Add' : 'Save',
                  onAction: modalType === 'Add' ? handleAddPost : handleEditPost,
                }}
                secondaryActions={[{ content: 'Cancel', onAction: closeModal }]}
            >
              <Modal.Section>
                <TextField
                    label="Title"
                    value={postTitle}
                    onChange={(value) => setPostTitle(value)}
                    autoComplete="off"
                />
                <TextField
                    label="Body"
                    value={postBody}
                    onChange={(value) => setPostBody(value)}
                    autoComplete="off"
                    multiline
                />
              </Modal.Section>
            </Modal>
        )}
      </Page>
  );
};

export default AllPosts;
