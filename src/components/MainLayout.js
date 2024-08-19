import React from 'react';
import { Frame, TopBar, Page } from '@shopify/polaris';

const MainLayout = ({ children }) => {
    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={<TopBar.UserMenu name="User Name" detail="Account Details" />}
        />
    );

    return (
        <Frame
            topBar={topBarMarkup}
        >
            <Page>
                {children}
            </Page>
        </Frame>
    );
};

export default MainLayout;
