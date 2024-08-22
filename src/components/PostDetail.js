import React, { useState } from 'react';
import { Card, Layout, Text, Page, Button, Modal, TextField } from '@shopify/polaris';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const PostDetail = () => {
    const { userId, postId } = useParams();
    const navigate = useNavigate();
    const { posts, comments, setPosts, setComments } = useUserContext();

    // Tìm post và các comment liên quan
    const post = posts.find(post => post.id === parseInt(postId));
    const postComments = comments.filter(comment => comment.postId === parseInt(postId));

    // State modal và comment
    const [selectedComment, setSelectedComment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [commentText, setCommentText] = useState('');

    // Nếu post không tồn tại, hiển thị thông báo lỗi
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

    // Mở modal với kiểu và comment đã chọn
    const handleOpenModal = (type, comment = null) => {
        setModalType(type);
        setSelectedComment(comment);
        setCommentText(comment ? comment.body : '');
        setIsModalOpen(true);
    };

    // Đóng modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedComment(null);
        setCommentText('');
    };

    // Lưu comment mới hoặc đã chỉnh sửa
    const handleSave = () => {
        if (modalType === 'edit' && selectedComment) {
            setComments(comments.map(comment =>
                comment.id === selectedComment.id ? { ...comment, body: commentText } : comment
            ));
        } else if (modalType === 'add') {
            setComments([...comments, { id: comments.length + 1, postId: parseInt(postId), body: commentText }]);
        }
        handleCloseModal();
    };

    // Xóa comment
    const handleDelete = (commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    return (
        <Page title="Post Details">
            <Layout>
                <Layout.Section>
                    <Card title="Post Information" sectioned>
                        <p><Text variation="strong">Title:</Text> {post.title}</p>
                        <p><Text variation="strong">Body:</Text> {post.body}</p>
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
                                    marginTop: '10px',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            >
                                <Text>{comment.body}</Text>
                                <div>
                                    <Button onClick={() => handleOpenModal('edit', comment)}>Edit</Button>
                                    <Button destructive onClick={() => handleDelete(comment.id)}>Delete</Button>
                                </div>
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
