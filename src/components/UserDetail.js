import React from 'react';
import { Card, Layout, Text, Page, Button } from '@shopify/polaris';
import { ArrowLeftIcon } from "@shopify/polaris-icons";
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { users, posts, albums, todos, photos, comments } = useUserContext();

    const user = users.find(user => user.id === parseInt(id));
    const userPosts = posts.filter(post => post.userId === parseInt(id));
    const userAlbums = albums.filter(album => album.userId === parseInt(id));
    const userTodos = todos.filter(todo => todo.userId === parseInt(id));
    const userPhotos = photos.filter(photo => photo.albumId === parseInt(id));
    const userComments = comments.filter(comment => comment.postId === parseInt(id));

    if (!user) return <p>User not found</p>;

    return (
        <Page title="User Details">
            <Layout>
                <Layout.Section>
                    <Button onClick={() => navigate(-1)} icon={ArrowLeftIcon}>Go Back</Button>
                </Layout.Section>
                <Layout.Section>
                    <Card title="User Information" sectioned>
                        <p><Text variation="strong">Name:</Text> {user.name || 'N/A'}</p>
                        <p><Text variation="strong">Email:</Text> {user.email || 'N/A'}</p>
                        <p><Text variation="strong">Phone:</Text> {user.phone || 'N/A'}</p>
                        <p><Text variation="strong">Website:</Text> {user.website || 'N/A'}</p>
                        <p><Text variation="strong">Company:</Text> {user.company?.name || 'N/A'}</p>
                        <p><Text variation="strong">Address:</Text> {`${user.address?.suite || ''}, ${user.address?.street || ''}, ${user.address?.city || ''}, ${user.address?.zipcode || ''}`}</p>
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card title="API Stats" sectioned>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <div style={statBoxStyle}>
                                <Text variant="headingLg" style={statNumberStyle}>{userPosts.length}</Text>
                                <Text style={statLabelStyle}>Posts</Text>
                                <Button plain onClick={() => navigate(`/user/${id}/posts`)}>View Details</Button>
                            </div>
                            <div style={statBoxStyle}>
                                <Text variant="headingLg" style={statNumberStyle}>{userAlbums.length}</Text>
                                <Text style={statLabelStyle}>Albums</Text>
                                <Button plain onClick={() => navigate(`/user/${id}/albums`)}>View Details</Button>
                            </div>
                            <div style={statBoxStyle}>
                                <Text variant="headingLg" style={statNumberStyle}>{userTodos.length}</Text>
                                <Text style={statLabelStyle}>Todos</Text>
                                <Button plain onClick={() => navigate(`/user/${id}/todos`)}>View Details</Button>
                            </div>
                            <div style={statBoxStyle}>
                                <Text variant="headingLg" style={statNumberStyle}>{userPhotos.length}</Text>
                                <Text style={statLabelStyle}>Photos</Text>
                                <Button plain onClick={() => navigate(`/user/${id}/photos`)}>View Details</Button>
                            </div>
                            <div style={statBoxStyle}>
                                <Text variant="headingLg" style={statNumberStyle}>{userComments.length}</Text>
                                <Text style={statLabelStyle}>Comments</Text>
                                <Button plain onClick={() => navigate(`/user/${id}/comments`)}>View Details</Button>
                            </div>
                        </div>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

const statBoxStyle = {
    padding: '20px',
    textAlign: 'center',
    flex: '1',
    border: '1px solid #d9d9d9',
    borderRadius: '8px',
    margin: '10px',
    backgroundColor: '#f9f9f9',
};

const statNumberStyle = {
    fontSize: '24px',
    color: '#5c6ac4',
    fontWeight: 'bold',
};

const statLabelStyle = {
    fontSize: '16px',
    color: '#637381',
};

export default UserDetail;
