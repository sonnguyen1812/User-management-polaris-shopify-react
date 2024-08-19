import React, { useEffect, useState } from 'react';
import { Card, ResourceList, Spinner } from '@shopify/polaris';
import { fetchUsers } from '../services/api';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers().then((response) => {
            setUsers(response.data);
            setLoading(false);
        });
    }, []);

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
