import React, { useState, useCallback } from 'react';
import {
    Card,
    Layout,
    Text,
    Page,
    Button,
    Modal,
    TextField,
    ActionList,
    Popover,
    DescriptionList
} from '@shopify/polaris';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import { ArrowLeftIcon, MenuIcon } from "@shopify/polaris-icons";

const PostDetail = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { posts, comments, setComments } = useUserContext();

    const post = posts.find(post => post.id === parseInt(postId));
    const postComments = comments.filter(comment => comment.postId === parseInt(postId));

    const [selectedComment, setSelectedComment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [commentText, setCommentText] = useState('');
    const [activePopoverId, setActivePopoverId] = useState(null);

    const handleOpenModal = useCallback((type, comment = null) => {
        setModalType(type);
        setSelectedComment(comment);
        setCommentText(comment ? comment.body : '');
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedComment(null);
        setCommentText('');
    }, []);

    const handleSave = useCallback(() => {
        if (modalType === 'edit' && selectedComment) {
            setComments(comments.map(comment =>
                comment.id === selectedComment.id ? { ...comment, body: commentText } : comment
            ));
        } else if (modalType === 'add') {
            setComments([...comments, { id: comments.length + 1, postId: parseInt(postId), body: commentText }]);
        }
        handleCloseModal();
    }, [modalType, selectedComment, commentText, comments, handleCloseModal, postId, setComments]);

    const handleDelete = useCallback((commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId));
    }, [comments, setComments]);

    const togglePopoverActive = useCallback((commentId) => {
        setActivePopoverId((prev) => (prev === commentId ? null : commentId));
    }, []);

    if (!post) {
        return (
            <Page title="Post Not Found">
                <Card sectioned>
                    <p>Post not found</p>
                    <Button onClick={() => navigate(-1)}>Go Back</Button>
                </Card>
            </Page>
        );
    }

    return (
        <Page
            title="Post Details"
            backAction={{ content: 'Back', onAction: () => navigate(-1) }}
        >
            <Layout>
                <Layout.Section>
                    <Card>

                        <div style={{paddingBottom: '20px', paddingTop: '10px', paddingLeft: '10px'}}>
                            <Text as="h3" variant="headingLg" fontWeight='bold'>
                                Post Info
                            </Text>
                        </div>
                        <DescriptionList
                            items={[
                                {term: 'Title', description: post.title},
                                {term: 'Body', description: post.body},
                            ]}
                        />
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card title="Comments" sectioned>
                        <Button onClick={() => handleOpenModal('add')}>Add Comment</Button>
                        {postComments.map(comment => (
                            <div
                                key={comment.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    margin: '20px', // Khoảng cách giữa các comment
                                    padding: '15px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            >
                                <Text>{comment.body}</Text>
                                <Popover
                                    active={activePopoverId === comment.id}
                                    activator={
                                        <Button
                                            icon={MenuIcon}
                                            onClick={() => togglePopoverActive(comment.id)}
                                            accessibilityLabel="More actions"
                                        />
                                    }
                                    onClose={() => togglePopoverActive(comment.id)}
                                >
                                    <ActionList
                                        items={[
                                            { content: 'Edit', onAction: () => handleOpenModal('edit', comment) },
                                            { content: 'Delete', onAction: () => handleDelete(comment.id) },
                                        ]}
                                    />
                                </Popover>
                            </div>
                        ))}
                    </Card>
                </Layout.Section>

                {isModalOpen && (
                    <Modal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        title={modalType === 'edit' ? 'Edit Comment' : 'Add Comment'}
                        primaryAction={{
                            content: 'Save',
                            onAction: handleSave
                        }}
                    >
                        <Modal.Section>
                            <TextField
                                value={commentText}
                                onChange={setCommentText}
                                multiline
                                label="Comment"
                                placeholder="Enter your comment"
                            />
                        </Modal.Section>
                    </Modal>
                )}
            </Layout>
        </Page>
    );
};

export default PostDetail;
