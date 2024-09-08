import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Card, Layout, Text } from '@shopify/polaris';
import { useUserContext } from '../../contexts/UserContext';

const AllAlbums = () => {
    const navigate = useNavigate();
    const { albums } = useUserContext();

    const handleNavigateToAlbumDetail = (userId, albumId) => {
        navigate(`/user/${userId}/albums/${albumId}`);
    };

    return (
        <Page
            title="All Albums"
            backAction={{ content: 'Back', onAction: () => navigate(-1) }}
        >
            <Layout>
                {albums.map(album => (
                    <Layout.Section key={album.id}>
                        <Card>
                                <div
                                 onClick={() => handleNavigateToAlbumDetail(album.userId, album.id)}>
                                    <Text>{album.title}</Text>
                                </div>
                        </Card>
                    </Layout.Section>
                ))}
            </Layout>
        </Page>
    );
};

export default AllAlbums;
