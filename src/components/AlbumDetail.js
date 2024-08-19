import React from 'react';
import { Card, Layout, Text, Spinner, Page } from '@shopify/polaris';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const AlbumDetail = () => {
    const { id } = useParams();
    const { albums, photos } = useUserContext();
    const album = albums.find(album => album.id === parseInt(id));
    const albumPhotos = photos.filter(photo => photo.albumId === parseInt(id));

    if (!album) return <Spinner />;

    return (
        <Page title={`Album: ${album.title}`}>
            <Layout>


                <Layout.Section>
                    <Card sectioned>
                        <Text variant="headingMd" as="h2">Album Information</Text>
                        <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                            <Text variant="bodyMd" as="p">
                                <strong>Title:</strong> {album.id}
                            </Text>
                            <Text variant="bodyMd" as="p">
                                <strong>Body:</strong> {album.title}
                            </Text>
                            <Text variant="bodyMd" as="p">
                                <strong>Body:</strong> {album.body}
                            </Text>
                        </div>
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card sectioned>
                        <Text variant="headingMd" as="h3">Photos</Text>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                            {albumPhotos.map(photo => (
                                <div key={photo.id} style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                    <LazyLoadImage
                                        alt={photo.title}
                                        src={photo.url}
                                        effect="blur"
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default AlbumDetail;
