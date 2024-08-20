import React, { useState } from 'react';
import { Card, Layout, Text, OptionList, Spinner, Page, Button, Modal } from '@shopify/polaris';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import ItemForm from './ItemForm';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { users, posts, albums, todos, setPosts, setAlbums, setTodos } = useUserContext();
    const user = users.find(user => user.id === parseInt(id));
    const userPosts = posts.filter(post => post.userId === parseInt(id));
    const userAlbums = albums.filter(album => album.userId === parseInt(id));
    const userTodos = todos.filter(todo => todo.userId === parseInt(id));

    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    if (!user) return <Spinner />;

    const handleOpenModal = (type, item = null) => {
        setModalType(type);
        if (type === 'post') setSelectedPost(item);
        if (type === 'album') setSelectedAlbum(item);
        if (type === 'todo') setSelectedTodo(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
        setSelectedAlbum(null);
        setSelectedTodo(null);
    };

    const handleSave = (data) => {
        if (modalType === 'post') {
            if (selectedPost) {
                setPosts(posts.map(post => post.id === selectedPost.id ? { ...post, ...data } : post));
            } else {
                setPosts([...posts, { ...data, userId: parseInt(id), id: posts.length + 1 }]);
            }
        } else if (modalType === 'album') {
            if (selectedAlbum) {
                setAlbums(albums.map(album => album.id === selectedAlbum.id ? { ...album, ...data } : album));
            } else {
                setAlbums([...albums, { ...data, userId: parseInt(id), id: albums.length + 1 }]);
            }
        } else if (modalType === 'todo') {
            if (selectedTodo) {
                setTodos(todos.map(todo => todo.id === selectedTodo.id ? { ...todo, ...data } : todo));
            } else {
                setTodos([...todos, { ...data, userId: parseInt(id), id: todos.length + 1 }]);
            }
        }
        handleCloseModal();
    };

    const handleDelete = (type, id) => {
        if (type === 'post') setPosts(posts.filter(post => post.id !== id));
        if (type === 'album') setAlbums(albums.filter(album => album.id !== id));
        if (type === 'todo') setTodos(todos.filter(todo => todo.id !== id));
    };

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
                    <Card title="Posts" sectioned>
                        <Button onClick={() => handleOpenModal('post')}>Add Post</Button>
                        <OptionList
                            options={postOptions}
                            onChange={(value) => navigate(`/user/${id}/posts/${value}`)}
                            selected={[]}
                        />
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card title="Albums" sectioned>
                        <Button onClick={() => handleOpenModal('album')}>Add Album</Button>
                        <OptionList
                            options={albumOptions}
                            onChange={(value) => navigate(`/user/${id}/albums/${value}`)}
                            selected={[]}
                        />
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card title="Todos" sectioned>
                        <Button onClick={() => handleOpenModal('todo')}>Add Todo</Button>
                        <OptionList
                            options={todoOptions}
                            onChange={(value) => navigate(`/user/${id}/todos`)}
                            selected={[]}
                        />
                    </Card>
                </Layout.Section>

                {isModalOpen && (
                    <ItemForm
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        onSave={handleSave}
                        initialData={modalType === 'post' ? selectedPost : modalType === 'album' ? selectedAlbum : selectedTodo}
                        type={modalType.charAt(0).toUpperCase() + modalType.slice(1)}
                    />
                )}
            </Layout>
        </Page>
    );
};

export default UserDetail;
