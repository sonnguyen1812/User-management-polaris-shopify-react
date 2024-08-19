import React, { useState, useEffect } from 'react';
import { Card, ResourceList, Spinner } from '@shopify/polaris';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const { users, loading } = useUserContext();
    const navigate = useNavigate();

    if (loading) return <Spinner />;

    return (
        <Card>
            <ResourceList
                resourceName={{ singular: 'user', plural: 'users' }}
                items={users}
                renderItem={(item) => {
                    const { id, name, email } = item;
                    return (
                        <ResourceList.Item
                            key={id}
                            onClick={() => navigate(`/user/${id}`)}
                        >
                            <h3>{name}</h3>
                            <div>{email}</div>
                        </ResourceList.Item>
                    );
                }}
            />
        </Card>
    );
};

export default UserList;
