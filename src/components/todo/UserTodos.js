import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import { Card, Page, Layout, Text, Checkbox, Button, Modal, TextField, Popover, ActionList } from '@shopify/polaris';
import { MenuVerticalIcon } from '@shopify/polaris-icons';

const UserTodos = () => {
    const { id } = useParams();
    const { todos, setTodos } = useUserContext();
    const userTodos = todos.filter(todo => todo.userId === parseInt(id));
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [title, setTitle] = useState('');
    const [popoverActiveId, setPopoverActiveId] = useState(null);

    const togglePopoverActive = (todoId) => {
        setPopoverActiveId((prev) => (prev === todoId ? null : todoId));
    };

    const handleCheckboxChange = useCallback((todoId, completed) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === todoId ? { ...todo, completed: !completed } : todo
            )
        );
    }, [setTodos]);

    const handleOpenModal = useCallback((type, todo = null) => {
        setModalType(type);
        setSelectedTodo(todo);
        setTitle(todo ? todo.title : '');
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedTodo(null);
        setTitle('');
    }, []);

    const handleSave = useCallback(() => {
        if (modalType === 'edit' && selectedTodo) {
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === selectedTodo.id ? { ...todo, title: title } : todo
                )
            );
        } else if (modalType === 'add') {
            setTodos([...todos, { id: todos.length + 1, userId: parseInt(id), title: title, completed: false }]);
        }
        handleCloseModal();
    }, [modalType, selectedTodo, title, todos, id, setTodos, handleCloseModal]);

    const handleDelete = useCallback((todoId) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    }, [setTodos]);

    return (
        <Page
            title="Todo"
            backAction={{ content: 'Back', onAction: () => navigate(-1) }}
            primaryAction={{ content: 'Add Todo', onAction: () => handleOpenModal('add') }}
        >
            <Layout>
                {userTodos.map(todo => (
                    <Layout.Section key={todo.id}>
                        <Card title={todo.title}>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    zIndex: '10',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <Popover
                                    active={popoverActiveId === todo.id}
                                    activator={
                                        <Button variant="plain" icon={MenuVerticalIcon}
                                                onClick={() => togglePopoverActive(todo.id)} />
                                    }
                                    onClose={() => togglePopoverActive(todo.id)}
                                >
                                    <ActionList
                                        items={[
                                            {
                                                content: 'Edit',
                                                onAction: () => {
                                                    handleOpenModal('edit', todo);
                                                    togglePopoverActive(todo.id);
                                                }
                                            },
                                            {
                                                content: 'Delete',
                                                onAction: () => {
                                                    handleDelete(todo.id);
                                                    togglePopoverActive(todo.id);
                                                },
                                                destructive: true,
                                            }
                                        ]}
                                    />
                                </Popover>
                            </div>

                                <Checkbox
                                    label={<Text as={"p"}> {todo.title} </Text>}
                                    checked={todo.completed}
                                    onChange={() => handleCheckboxChange(todo.id, todo.completed)}
                                />

                        </Card>
                    </Layout.Section>
                ))}
            </Layout>

            {isModalOpen && (
                <Modal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    title={modalType === 'edit' ? 'Edit Todo' : 'Add Todo'}
                    primaryAction={{
                        content: 'Save',
                        onAction: handleSave,
                    }}
                >
                    <Modal.Section>
                        <TextField
                            label="Todo Title"
                            value={title}
                            onChange={setTitle}
                            placeholder="Enter todo title"
                        />
                    </Modal.Section>
                </Modal>
            )}
        </Page>
    );
};

export default UserTodos;
