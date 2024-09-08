import React from 'react';
import { Page, TextContainer, Button, Text } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Page>
            <TextContainer>
                <Text variant="headingMd" as="h2">404 - Page Not Found</Text>
                <p>Sorry, the page you are looking for does not exist.</p>
                <Button onClick={() => navigate('/')}>Go to Home</Button>
            </TextContainer>
        </Page>
    );
};

export default NotFoundPage;
