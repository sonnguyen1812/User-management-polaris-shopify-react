import React, { useState } from 'react';
import { Card, Page, Layout, Spinner, Checkbox } from '@shopify/polaris';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const TodoDetail = () => {
    const { id } = useParams();
    const { todos } = useUserContext();

    const userTodos = todos.filter(todo => todo.userId === parseInt(id));
    const [todoList, setTodoList] = useState(userTodos);

    const handleToggleComplete = (todoId) => {
        const updatedTodos = todoList.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );
        setTodoList(updatedTodos);
    };

    if (!userTodos.length) return <Spinner />;

    return (
        <Page title="Todo List">
            <Layout>
                <Layout.Section>
                    <Card sectioned title="Todos">
                        {todoList.map(todo => (
                            <div key={todo.id} style={{ marginBottom: '10px' }}>
                                <Checkbox
                                    label={todo.title}
                                    checked={todo.completed}
                                    onChange={() => handleToggleComplete(todo.id)}
                                />
                            </div>
                        ))}
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default TodoDetail;
