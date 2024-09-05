import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, FormLayout } from '@shopify/polaris';

const PostForm = ({ post, onSave, onCancel }) => {
    const [title, setTitle] = useState(post ? post.title : '');
    const [body, setBody] = useState(post ? post.body : '');

    const handleSave = () => {
        const updatedPost = {
            ...post,
            title,
            body
        };
        onSave(updatedPost);
    };

    return (
        <Modal
            open={true}
            onClose={onCancel}
            title={post ? "Edit Post" : "Create New Post"}
            primaryAction={{
                content: 'Save',
                onAction: handleSave,
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: onCancel,
                },
            ]}
        >
            <Modal.Section>
                <FormLayout>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(value) => setTitle(value)}
                        autoComplete="off"
                    />
                    <TextField
                        label="Body"
                        value={body}
                        onChange={(value) => setBody(value)}
                        multiline={4}
                        autoComplete="off"
                    />
                </FormLayout>
            </Modal.Section>
        </Modal>
    );
};

export default PostForm;
