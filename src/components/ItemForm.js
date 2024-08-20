import React, { useState } from 'react';
import { Modal, FormLayout, TextField, Button } from '@shopify/polaris';

const ItemForm = ({ open, onClose, onSave, initialData, type }) => {
    const [title, setTitle] = useState(initialData ? initialData.title : '');
    const [body, setBody] = useState(initialData ? initialData.body : '');

    const handleSave = () => {
        onSave({ title, body });
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={`${initialData ? 'Edit' : 'Add'} ${type}`}
            primaryAction={{
                content: 'Save',
                onAction: handleSave,
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: onClose,
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
                    {type !== 'Album' && (
                        <TextField
                            label="Body"
                            value={body}
                            onChange={(value) => setBody(value)}
                            multiline
                            autoComplete="off"
                        />
                    )}
                </FormLayout>
            </Modal.Section>
        </Modal>
    );
};

export default ItemForm;
