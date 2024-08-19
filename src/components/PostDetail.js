import React from 'react';
import { Card, Page, Layout, Spinner, TextContainer } from '@shopify/polaris';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const PostDetail = () => {
    const { postId } = useParams();
    const { posts, comments } = useUserContext();

    const post = posts.find(post => post.id === parseInt(postId));
    const postComments = comments.filter(comment => comment.postId === parseInt(postId));

    if (!post) return <Spinner />;

    return (
        <Page title="Post Details">
            <Layout>
                <Layout.Section>
                    <Card sectioned title={post.title}>
                        <TextContainer>
                            <p>{post.body}</p>
                        </TextContainer>
                    </Card>
                </Layout.Section>
                <Layout.Section secondary>
                    <Card sectioned title="Comments">
                        {postComments.length > 0 ? (
                            postComments.map(comment => (
                                <Card key={comment.id} sectioned title={comment.name}>
                                    <p>{comment.body}</p>
                                    <p><strong>By:</strong> {comment.email}</p>
                                </Card>
                            ))
                        ) : (
                            <p>No comments available.</p>
                        )}
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default PostDetail;
