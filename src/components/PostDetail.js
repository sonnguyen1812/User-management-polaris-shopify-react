import React, { useEffect, useState } from 'react';
import { Card, Layout, Text, Spinner, Page } from '@shopify/polaris';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const PostDetail = () => {
    const { userId, postId } = useParams();
    const { posts, comments } = useUserContext();
    const [post, setPost] = useState(null);
    const [postComments, setPostComments] = useState([]);

    useEffect(() => {
        const selectedPost = posts.find(post => post.id === parseInt(postId));
        if (selectedPost) {
            setPost(selectedPost);
            setPostComments(comments.filter(comment => comment.postId === parseInt(postId)));
        }
    }, [postId, posts, comments]);

    if (!post) return <Spinner />;

    return (
        <Page title="Post Details">
            <Layout>
                <Layout.Section>
                    <Card title="Post Information" sectioned>
                        <p><Text variation="strong">Title:</Text> {post.title}</p>
                        <p><Text variation="strong">Body:</Text> {post.body}</p>
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card title="Comments" sectioned>
                        {postComments.length > 0 ? (
                            postComments.map(comment => (
                                <Card key={comment.id} sectioned>
                                    <p><Text variation="strong">Name:</Text> {comment.name}</p>
                                    <p><Text variation="strong">Email:</Text> {comment.email}</p>
                                    <p><Text variation="strong">Comment:</Text> {comment.body}</p>
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
