import React, { useState, useCallback } from 'react';
import { Frame, TopBar, Navigation, ActionList } from '@shopify/polaris';
import { PersonIcon, BlogIcon, CameraIcon, ListBulletedIcon } from '@shopify/polaris-icons';
import { useLocation, useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const toggleIsUserMenuOpen = useCallback(
        () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
        [],
    );

    const handleSearchResultsDismiss = useCallback(() => {
        setIsSearchActive(false);
        setSearchValue('');
    }, []);

    const handleSearchChange = useCallback((value) => {
        setSearchValue(value);
        setIsSearchActive(value.length > 0);
    }, []);

    const handleNavigationToggle = useCallback(() => {
        console.log('toggle navigation visibility');
    }, []);

    const handleSearch = useCallback(() => {
        const [prefix, query] = searchValue.split(':');
        if (prefix === '+posts') {
            navigate(`/posts?search=${query}`);
        } else if (prefix === '+albums') {
            navigate(`/albums?search=${query}`);
        } else if (prefix === '+todos') {
            navigate(`/todos?search=${query}`);
        } else {
            navigate(`/users?search=${query}`);
        }
    }, [searchValue, navigate]);


    const logo = {
        topBarSource:
            'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
        width: 86,
        url: '/',
        accessibilityLabel: 'Shopify',
    };

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={[
                {
                    items: [{ content: 'Account Settings' }],
                },
                {
                    items: [{ content: 'Logout' }],
                },
            ]}
            name="User Name"
            detail="Account Details"
            open={isUserMenuOpen}
            onToggle={toggleIsUserMenuOpen}
        />
    );

    const searchResultsMarkup = isSearchActive ? (
        <ActionList
            sections={[
                { title: 'Users', items: [{ content: 'View all Users', onAction: () => handleSearch('users') }] },
                { title: 'Posts', items: [{ content: 'View all Posts', onAction: () => handleSearch('+posts') }] },
                { title: 'Albums', items: [{ content: 'View all Albums', onAction: () => handleSearch('+albums') }] },
                { title: 'Todos', items: [{ content: 'View all Todos', onAction: () => handleSearch('+todos') }] },
            ]}
        />
    ) : null;

    const searchFieldMarkup = (
        <TopBar.SearchField
            onChange={handleSearchChange}
            value={searchValue}
            placeholder="Search"
            showFocusBorder
        />
    );

    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
            searchResultsVisible={isSearchActive}
            searchField={searchFieldMarkup}
            searchResults={searchResultsMarkup}
            onSearchResultsDismiss={handleSearchResultsDismiss}
            onNavigationToggle={handleNavigationToggle}
        />
    );

    const navigationItems = [
        {
            label: 'Dashboard',
            icon: PersonIcon,
            url: '/',
        },
        {
            label: 'Posts',
            icon: BlogIcon,
            url: '/posts',
        },
        {
            label: 'Albums',
            icon: CameraIcon,
            url: '/albums',
        },
        {
            label: 'Todo Lists',
            icon: ListBulletedIcon,
            url: '/todos',
        },
    ];

    const navigationMarkup = (
        <Navigation location={location.pathname}>
            <Navigation.Section
                items={navigationItems.map(item => ({
                    ...item,
                    selected: location.pathname === item.url,
                    onClick: () => navigate(item.url),
                }))}
            />
        </Navigation>
    );

    return (
        <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            logo={logo}
            // Rounded corners applied here
            style={{ borderRadius: '0 0 8px 8px' }}
        >
            {children}
        </Frame>
    );
};

export default MainLayout;
