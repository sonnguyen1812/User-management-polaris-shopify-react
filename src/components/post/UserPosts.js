import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import { Card, Page, Layout, Text, Button, Popover, ActionList, Modal, TextField, Box } from '@shopify/polaris';
import { MenuVerticalIcon } from '@shopify/polaris-icons';

const UserPosts = () => {
    const { id } = useParams();
    const { posts, setPosts } = useUserContext();
    const userPosts = posts.filter(post => post.userId === parseInt(id));
    const navigate = useNavigate();

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
            userId: parseInt(id),
            id: posts.length + 1,
            title: postTitle,
            body: postBody,
        };
        setPosts([newPost,...posts ]);
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

    return (
        <Page
            title="Posts"
            primaryAction={{ content: 'Add Post', onAction: () => openModal('Add') }}
            backAction={{ content: 'Back', onAction: () => navigate(-1) }}
        >
            <Layout>
                {userPosts.map((post) => (
                    <Layout.Section key={post.id}>
                        <Card>
                            <div style={{ position: 'relative', paddingInline: '20px' }}>
                                <div
                                    onClick={() => navigate(`/user/${id}/posts/${post.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Text as="h2" variant="headingSm">{post.title}</Text>
                                    <Box paddingBlockStart="200">
                                        <Text as="p" variant="bodyMd">{post.body}</Text>
                                    </Box>
                                </div>

                                {/* Popover for Edit/Delete actions */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '25px',
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

export default UserPosts;
