import React from 'react';
import { Card, Layout, Page, Text, Spinner } from '@shopify/polaris';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const PostDetail = () => {
    const { id } = useParams();
    const { posts, comments } = useUserContext();
    const post = posts.find(post => post.id === parseInt(id));
    const postComments = comments.filter(comment => comment.postId === parseInt(id));

    if (!post) return <Spinner />;

    return (
        <Page title={`Post: ${post.title}`}>
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <Text variant="headingMd" as="h2">Post Information</Text>
                        <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                            <Text variant="bodyMd" as="p">
                                <strong>Title:</strong> {post.title}
                            </Text>
                            <Text variant="bodyMd" as="p">
                                <strong>Body:</strong> {post.body}
                            </Text>
                        </div>
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card sectioned>
                        <Text variant="headingMd" as="h3">Comments</Text>
                        {postComments.length > 0 ? (
                            <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                {postComments.map(comment => (
                                    <Card key={comment.id} sectioned style={{ marginBottom: '16px' }}>
                                        <Text variant="bodyMd" as="p">
                                            <strong>{comment.name}</strong>
                                        </Text>
                                        <Text variant="bodySm" as="p">
                                            {comment.body}
                                        </Text>
                                        <Text variant="bodySm" as="p">
                                            <em>— {comment.email}</em>
                                        </Text>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Text variant="bodyMd" as="p">No comments yet.</Text>
                        )}
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default PostDetail;
