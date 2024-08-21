import React, { useState } from 'react';
import { Modal, TextField, Button, FormLayout } from '@shopify/polaris';

const AlbumForm = ({ album, onSave, onCancel }) => {
    const [title, setTitle] = useState(album ? album.title : '');

    const handleSave = () => {
        const updatedAlbum = {
            ...album,
            title,
        };
        onSave(updatedAlbum);
    };

    return (
        <Modal
            open={true}
            onClose={onCancel}
            title={album ? "Edit Album" : "Create New Album"}
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
                </FormLayout>
            </Modal.Section>
        </Modal>
    );
};

export default AlbumForm;
