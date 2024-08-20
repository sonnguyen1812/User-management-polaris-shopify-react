import React from 'react';
import {Button, Card, ResourceList, Text} from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';

const UserList = ({ users, onEdit, onDelete }) => {
    const navigate = useNavigate();

    return (
        <Card title={`Users (${users.length})`}>
            <ResourceList
                resourceName={{ singular: 'user', plural: 'users' }}
                items={users}
                totalItemsCount={users.length} // Hiển thị tổng số lượng người dùng
                renderItem={(user) => {
                    const { id, name, email } = user;

                    return (
                        <ResourceList.Item
                            id={id}
                            accessibilityLabel={`View details for ${name}`}
                            onClick={() => navigate(`/user/${id}`)} // Điều hướng khi bấm vào bất kỳ đâu
                        >
                            <h3>
                                <Text variation="strong">{name}</Text>
                            </h3>
                            <div>{email}</div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                <Button size="slim" onClick={(e) => { e.stopPropagation(); onEdit(user); }}>Edit</Button>
                                <Button size="slim" destructive onClick={(e) => { e.stopPropagation(); onDelete(id); }}>Delete</Button>
                            </div>
                        </ResourceList.Item>
                    );
                }}
            />
        </Card>
    );
};

export default UserList;
