import React from 'react';
import { Frame, TopBar, Page, Navigation } from '@shopify/polaris';
import {
    PersonIcon,
    BlogIcon,
    CameraIcon,
    ListBulletedFilledIcon
} from '@shopify/polaris-icons';

const MainLayout = ({ children }) => {
    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={<TopBar.UserMenu name="User Name" detail="Account Details" />}
        />
    );

    const navigationMarkup = (
        <Navigation location="/">
            <Navigation.Section
                items={[
                    {
                        label: 'Dashboard',
                        icon: PersonIcon,
                        url: '/'
                    },
                    {
                        label: 'Posts',
                        icon: BlogIcon,
                        /*url: '/'*/
                    },
                    {
                        label: 'Albums',
                        icon: CameraIcon,
                        /*url: '/'*/
                    },
                    {
                        label: 'Todo Lists',
                        icon: ListBulletedFilledIcon,
                        /*url: '/'*/
                    },
                ]}
            />
        </Navigation>
    );

    return (
        <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup} // Thêm navigation vào đây
        >
            <Page>
                {children}
            </Page>
        </Frame>
    );
};

export default MainLayout;
