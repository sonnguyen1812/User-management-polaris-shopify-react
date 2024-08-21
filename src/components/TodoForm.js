import React, { useState } from 'react';
import { Modal, TextField, Button, FormLayout, Checkbox } from '@shopify/polaris';

const TodoForm = ({ todo, onSave, onCancel }) => {
    const [title, setTitle] = useState(todo ? todo.title : '');
    const [completed, setCompleted] = useState(todo ? todo.completed : false);

    const handleSave = () => {
        const updatedTodo = {
            ...todo,
            title,
            completed,
        };
        onSave(updatedTodo);
    };

    return (
        <Modal
            open={true}
            onClose={onCancel}
            title={todo ? "Edit Todo" : "Create New Todo"}
            primaryAction={{
                content: 'Save',
                onAction: handleSave,
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: onCancel,
                },
            ]}
        >
            <Modal.Section>
                <FormLayout>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(value) => setTitle(value)}
                        autoComplete="off"
                    />
                    <Checkbox
                        label="Completed"
                        checked={completed}
                        onChange={(checked) => setCompleted(checked)}
                    />
                </FormLayout>
            </Modal.Section>
        </Modal>
    );
};

export default TodoForm;
