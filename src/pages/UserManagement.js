import React, { useState } from 'react';
import { Page, Layout, Button, Card, Spinner } from '@shopify/polaris';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import { useUserContext } from '../contexts/UserContext';

const UserManagement = () => {
    const { users, setUsers } = useUserContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleCreate = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleAddUser = (newUser) => {
        setUsers([...users, { id: users.length + 1, ...newUser }]);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleSave = (userData) => {
        if (selectedUser) {
            // Update existing user
            setUsers(users.map(user => user.id === selectedUser.id ? { ...user, ...userData } : user));
        } else {
            // Create new user
            const newUser = { id: users.length + 1, ...userData };
            setUsers([...users, newUser]);
        }
        setIsModalOpen(false);
    };

    if (!users) return <Spinner />;

    return (
        <Page title="User Management">
            <Layout>
                <Layout.Section>
                    <UserList
                        users={users}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onAdd={handleAddUser}
                    />
                </Layout.Section>
            </Layout>

            {isModalOpen && (
                <UserForm
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    initialData={selectedUser}
                />
            )}
        </Page>
    );
};

export default UserManagement;
