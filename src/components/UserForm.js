import React, { useState, useEffect } from 'react';
import { Modal, Form, TextField, Button } from '@shopify/polaris';

const UserForm = ({ open, onClose, onSave, initialData }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setEmail(initialData.email);
            setPhone(initialData.phone);
            setWebsite(initialData.website);
        }
    }, [initialData]);

    const handleSubmit = () => {
        const userData = { name, email, phone, website };
        onSave(userData);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={initialData ? "Edit User" : "Create New User"}
            primaryAction={{
                content: initialData ? "Save Changes" : "Create User",
                onAction: handleSubmit,
            }}
        >
            <Modal.Section>
                <Form>
                    <TextField label="Name" value={name} onChange={setName} />
                    <TextField label="Email" value={email} onChange={setEmail} />
                    <TextField label="Phone" value={phone} onChange={setPhone} />
                    <TextField label="Website" value={website} onChange={setWebsite} />
                </Form>
            </Modal.Section>
        </Modal>
    );
};

export default UserForm;
