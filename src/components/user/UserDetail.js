import React from 'react';
import { Card, Layout, Text, Page, DescriptionList } from '@shopify/polaris';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { users, posts, albums, todos } = useUserContext();

    const user = users.find(user => user.id === parseInt(id));
    const userPosts = posts.filter(post => post.userId === parseInt(id));
    const userAlbums = albums.filter(album => album.userId === parseInt(id));
    const userTodos = todos.filter(todo => todo.userId === parseInt(id));

    if (!user) return <p>User not found</p>;

    const userInfo = [
        { term: 'Name', description: user.name || 'N/A' },
        { term: 'Email', description: user.email || 'N/A' },
        { term: 'Phone', description: user.phone || 'N/A' },
        { term: 'Website', description: user.website || 'N/A' },
        { term: 'Company', description: user.company?.name || 'N/A' },
        { term: 'Address', description: `${user.address?.suite || ''}, ${user.address?.street || ''}, ${user.address?.city || ''}, ${user.address?.zipcode || ''}` },
    ];

    return (
        <Page
            title="User Details"
            backAction={{ content: 'Back', onAction: () => navigate(-1) }}
        >
            <Layout>
                <Layout.Section>
                    <Card>
                        <div style={{paddingBottom: '20px', paddingTop: '10px', paddingLeft: '10px'}}>
                            <Text as="h3" variant="headingLg" fontWeight='bold'>
                                User Information
                            </Text>
                        </div>
                        <DescriptionList items={userInfo} />
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card title="API Stats" sectioned>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <div
                                style={statBoxStyle}
                                onClick={() => navigate(`/user/${id}/posts`)}
                            >
                                <Text variant="headingLg" style={statNumberStyle}>{userPosts.length}</Text>
                                <Text style={statLabelStyle}>Posts</Text>
                            </div>
                            <div
                                style={statBoxStyle}
                                onClick={() => navigate(`/user/${id}/albums`)}
                            >
                                <Text variant="headingLg" style={statNumberStyle}>{userAlbums.length}</Text>
                                <Text style={statLabelStyle}>Albums</Text>
                            </div>
                            <div
                                style={statBoxStyle}
                                onClick={() => navigate(`/user/${id}/todos`)}
                            >
                                <Text variant="headingLg" style={statNumberStyle}>{userTodos.length}</Text>
                                <Text style={statLabelStyle}>Todos</Text>
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
    borderRadius: '10px',
    margin: '10px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
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
