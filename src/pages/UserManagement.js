import React, { useState } from 'react';
import { Page, Layout, Spinner } from '@shopify/polaris';
import UserList from '../components/user/UserList';
import { useUserContext } from '../contexts/UserContext';

const UserManagement = () => {
    const { users, setUsers } = useUserContext();
    const [, setIsModalOpen] = useState(false);
    const [, setSelectedUser] = useState(null);

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
        </Page>
    );
};

export default UserManagement;
