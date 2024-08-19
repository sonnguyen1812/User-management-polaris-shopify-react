import React from 'react';
import { Card, Layout, Text, OptionList, Spinner, Page } from '@shopify/polaris';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { users, posts, albums, todos } = useUserContext();
    const user = users.find(user => user.id === parseInt(id));
    const userPosts = posts.filter(post => post.userId === parseInt(id));
    const userAlbums = albums.filter(album => album.userId === parseInt(id));
    const userTodos = todos.filter(todo => todo.userId === parseInt(id));

    if (!user) return <Spinner />;

    const postOptions = userPosts.map(post => ({ label: post.title, value: post.id }));
    const albumOptions = userAlbums.map(album => ({ label: album.title, value: album.id }));
    const todoOptions = [{ label: 'View Todos', value: 'todos' }];

    return (
        <Page title="User Details">
            <Layout>
                <Layout.Section>
                    <Card title="User Information" sectioned>
                        <p><Text variation="strong">Name:</Text> {user.name}</p>
                        <p><Text variation="strong">Email:</Text> {user.email}</p>
                        <p><Text variation="strong">Phone:</Text> {user.phone}</p>
                        <p><Text variation="strong">Website:</Text> {user.website}</p>
                        <p><Text variation="strong">Company:</Text> {user.company.name}</p>
                        <p><Text variation="strong">Address:</Text> {`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</p>
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card sectioned>
                        <Text variant="headingMd" as="h3">Posts</Text>
                        <OptionList
                            options={postOptions}
                            onChange={(value) => {
                                if (value) navigate(`/user/${id}/posts/${value}`);
                            }}
                            selected={[]}
                        />
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card sectioned>
                        <Text variant="headingMd" as="h3">Albums</Text>
                        <OptionList
                            options={albumOptions}
                            onChange={(value) => {
                                if (value) navigate(`/user/${id}/albums/${value}`);
                            }}
                            selected={[]}
                        />
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card sectioned>
                        <Text variant="headingMd" as="h3">Todos</Text>
                        <OptionList
                            options={todoOptions}
                            onChange={() => {
                                navigate(`/user/${id}/todos`);
                            }}
                            selected={[]}
                        />
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default UserDetail;
