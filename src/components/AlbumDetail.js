import React, { useEffect, useState } from 'react';
import { Card, Layout, Text, Spinner, Page, Grid, Image } from '@shopify/polaris';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const AlbumDetail = () => {
    const { userId, albumId } = useParams();
    const { albums, photos } = useUserContext();
    const [album, setAlbum] = useState(null);
    const [albumPhotos, setAlbumPhotos] = useState([]);

    useEffect(() => {
        const selectedAlbum = albums.find(album => album.id === parseInt(albumId));
        if (selectedAlbum) {
            setAlbum(selectedAlbum);
            setAlbumPhotos(photos.filter(photo => photo.albumId === parseInt(albumId)));
        }
    }, [albumId, albums, photos]);

    if (!album) return <Spinner />;

    return (
        <Page title="Album Details">
            <Layout>
                <Layout.Section>
                    <Card title="Album Information" sectioned>
                        <p><Text variation="strong">Title:</Text> {album.title}</p>
                        <p><Text variation="strong">Album ID:</Text> {album.id}</p>
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card title="Photos" sectioned>
                        {albumPhotos.length > 0 ? (
                            <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap="4">
                                {albumPhotos.map(photo => (
                                    <Grid.Cell key={photo.id}>
                                        <Card sectioned>
                                            <Image
                                                source={photo.url}
                                                alt={photo.title}
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                            <p><Text variation="strong">Title:</Text> {photo.title}</p>
                                        </Card>
                                    </Grid.Cell>
                                ))}
                            </Grid>
                        ) : (
                            <p>No photos available.</p>
                        )}
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default AlbumDetail;
