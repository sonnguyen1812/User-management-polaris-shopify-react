import React, { useState } from 'react';
import { Card, Layout, Text, Page, Button, Checkbox } from '@shopify/polaris';
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

    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    // Kiểm tra nếu user không tồn tại, trả về thông báo lỗi
    if (!user) return <p>User not found</p>;

    const handleOpenModal = (type, item = null) => {
        setModalType(type);
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleSave = (data) => {
        if (modalType === 'post') {
            if (selectedItem) {
                setPosts(posts.map(post => post.id === selectedItem.id ? { ...post, ...data } : post));
            } else {
                setPosts([...posts, { ...data, userId: parseInt(id), id: posts.length + 1 }]);
            }
        } else if (modalType === 'album') {
            if (selectedItem) {
                setAlbums(albums.map(album => album.id === selectedItem.id ? { ...album, ...data } : album));
            } else {
                setAlbums([...albums, { ...data, userId: parseInt(id), id: albums.length + 1 }]);
            }
        } else if (modalType === 'todo') {
            if (selectedItem) {
                setTodos(todos.map(todo => todo.id === selectedItem.id ? { ...todo, ...data } : todo));
            } else {
                setTodos([...todos, { ...data, userId: parseInt(id), id: todos.length + 1 }]);
            }
        }
        handleCloseModal();
    };

    const handleDelete = (type, itemId) => {
        if (type === 'post') setPosts(posts.filter(post => post.id !== itemId));
        if (type === 'album') setAlbums(albums.filter(album => album.id !== itemId));
        if (type === 'todo') setTodos(todos.filter(todo => todo.id !== itemId));
    };

    const handleTodoCompletion = (todoId) => {
        setTodos(todos.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <Page title="User Details">
            <Layout>
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
                    <Card title="Posts" sectioned>
                        <Button onClick={() => handleOpenModal('post')}>Add Post</Button>
                        {userPosts.map(post => (
                            <div
                                key={post.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '10px',
                                    cursor: 'pointer',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                                onClick={() => navigate(`/user/${id}/posts/${post.id}`)}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f4f6f8'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                                <Text>{post.title}</Text>
                                <div>
                                    <Button onClick={(e) => { e.stopPropagation(); handleOpenModal('post', post); }}>Edit</Button>
                                    <Button destructive onClick={(e) => { e.stopPropagation(); handleDelete('post', post.id); }}>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card title="Albums" sectioned>
                        <Button onClick={() => handleOpenModal('album')}>Add Album</Button>
                        {userAlbums.map(album => (
                            <div
                                key={album.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '10px',
                                    cursor: 'pointer',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                                onClick={() => navigate(`/user/${id}/albums/${album.id}`)}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f4f6f8'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                                <Text>{album.title}</Text>
                                <div>
                                    <Button onClick={(e) => { e.stopPropagation(); handleOpenModal('album', album); }}>Edit</Button>
                                    <Button destructive onClick={(e) => { e.stopPropagation(); handleDelete('album', album.id); }}>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card title="Todos" sectioned>
                        <Button onClick={() => handleOpenModal('todo')}>Add Todo</Button>
                        {userTodos.map(todo => (
                            <div
                                key={todo.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '10px',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox
                                        label={todo.title}
                                        checked={todo.completed}
                                        onChange={() => handleTodoCompletion(todo.id)}
                                    />
                                </div>
                                <div>
                                    <Button onClick={() => handleOpenModal('todo', todo)}>Edit</Button>
                                    <Button destructive onClick={() => handleDelete('todo', todo.id)}>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </Card>
                </Layout.Section>

                {isModalOpen && (
                    <ItemForm
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        onSave={handleSave}
                        initialData={selectedItem}
                        type={modalType.charAt(0).toUpperCase() + modalType.slice(1)}
                    />
                )}
            </Layout>
        </Page>
    );
};

export default UserDetail;
