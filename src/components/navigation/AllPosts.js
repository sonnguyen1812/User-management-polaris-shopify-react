import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Card, Layout, Text } from '@shopify/polaris';
import { useUserContext } from '../../contexts/UserContext';

const AllPosts = () => {
    const navigate = useNavigate();
    const { posts } = useUserContext();

    const handleNavigateToPostDetail = (userId, postId) => {
        navigate(`/user/${userId}/posts/${postId}`);
    };

    return (
        <Page
            title="All Posts"
            backAction={{ content: 'Back', onAction: () => navigate(-1) }}
        >
            <Layout>
                {posts.map(post => (
                    <Layout.Section key={post.id}>
                        <div title={post.title}>
                            <Card>
                                <div
                                    title={post.id}
                                    onClick={() => handleNavigateToPostDetail(post.userId, post.id)}
                                    >
                                    <Text as="p">{post.title}</Text>
                                </div>
                            </Card>
                        </div>
                    </Layout.Section>
                ))}
            </Layout>
        </Page>
    );
};

export default AllPosts;
