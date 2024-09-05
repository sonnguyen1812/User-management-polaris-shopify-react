import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import { Card, Page, Layout, Text, Box } from '@shopify/polaris';

const UserPosts = () => {
    const { id } = useParams();
    const { posts } = useUserContext();
    const userPosts = posts.filter(post => post.userId === parseInt(id));
    const navigate = useNavigate();

    return (
        <Page
            title="Posts"
            backAction={{ content: 'Back', onAction: () => navigate(-1) }}
        >
            <Layout>
                {userPosts.map(post => (
                    <Layout.Section key={post.id}>
                        <div
                            roundedAbove="sm"
                            onClick={() => navigate(`/user/${id}/posts/${post.id}`)} // Điều hướng đến PostDetail.js
                        >
                            <Card>
                                <Text as="h2" variant="headingSm">
                                    {post.title}
                                </Text>
                                <Box paddingBlockStart="200">
                                    <Text as="p" variant="bodyMd">
                                        {post.body}
                                    </Text>
                                </Box>
                            </Card>
                        </div>
                    </Layout.Section>
                ))}
            </Layout>
        </Page>
    );
};

export default UserPosts;
