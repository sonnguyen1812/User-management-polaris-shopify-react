import React from 'react';
import { Button, Card, ResourceList, Text, Icon } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';

const UserList = ({ users, onEdit, onDelete }) => {
    const navigate = useNavigate();

    return (
        <Card title={`Users (${users.length})`}>
            <ResourceList
                resourceName={{ singular: 'user', plural: 'users' }}
                items={users}
                totalItemsCount={users.length}
                renderItem={(user) => {
                    const { id, name, email } = user;

                    return (
                        <ResourceList.Item
                            id={id}
                            accessibilityLabel={`View details for ${name}`}
                            onClick={() => navigate(`/user/${id}`)}
                        >
                            <h3>
                                <Text variation="strong">{name}</Text>
                            </h3>
                            <div>{email}</div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                <Button
                                    size="slim"
                                    onClick={(e) => { e.stopPropagation(); onEdit(user); }}
                                    icon={EditIcon}
                                    accessibilityLabel="Edit user"
                                    plain
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="slim"
                                    destructive
                                    onClick={(e) => { e.stopPropagation(); onDelete(id); }}
                                    icon={DeleteIcon}
                                    accessibilityLabel="Delete user"
                                    plain
                                >
                                    Delete
                                </Button>
                            </div>
                        </ResourceList.Item>
                    );
                }}
            />
        </Card>
    );
};

export default UserList;
