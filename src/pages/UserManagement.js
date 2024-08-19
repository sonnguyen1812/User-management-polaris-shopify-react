import React from 'react';
import { Card, Layout, ResourceList, Avatar, Text } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const UserManagement = () => {
    const { users } = useUserContext();
    const navigate = useNavigate();

    return (
        <Layout>
            <Layout.Section>
                <Card title="Users">
                    <ResourceList
                        resourceName={{ singular: 'user', plural: 'users' }}
                        items={users}
                        renderItem={(user) => {
                            const { id, name, email } = user;
                            const media = <Avatar customer size="medium" name={name} />;

                            return (
                                <ResourceList.Item
                                    id={id}
                                    media={media}
                                    accessibilityLabel={`View details for ${name}`}
                                    onClick={() => navigate(`/user/${id}`)}
                                >
                                    <h3>
                                        <Text variation="strong">{name}</Text>
                                    </h3>
                                    <div>{email}</div>
                                </ResourceList.Item>
                            );
                        }}
                    />
                </Card>
            </Layout.Section>
        </Layout>
    );
};

export default UserManagement;
