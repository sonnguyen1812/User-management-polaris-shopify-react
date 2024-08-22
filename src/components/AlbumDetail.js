import React, { useState } from 'react';
import { Card, Layout, Text, Page, Button, Modal, TextField } from '@shopify/polaris';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import {ArrowLeftIcon} from "@shopify/polaris-icons";

const AlbumDetail = () => {
    const { userId, albumId } = useParams();
    const navigate = useNavigate();
    const { albums, photos, setAlbums, setPhotos } = useUserContext();

    const album = albums.find(album => album.id === parseInt(albumId));
    const albumPhotos = photos.filter(photo => photo.albumId === parseInt(albumId));

    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoTitle, setPhotoTitle] = useState('');

    if (!album) {
        return (
            <Page title="Album Not Found">
                <Card sectioned>
                    <p>Album not found</p>
                    <Button onClick={() => navigate(-1)}>Go Back</Button>
                </Card>
            </Page>
        );
    }

    const handleOpenModal = (type, photo = null) => {
        setModalType(type);
        setSelectedPhoto(photo);
        setPhotoUrl(photo ? photo.url : '');
        setPhotoTitle(photo ? photo.title : '');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPhoto(null);
        setPhotoUrl('');
        setPhotoTitle('');
    };

    const handleSave = () => {
        if (modalType === 'edit' && selectedPhoto) {
            setPhotos(photos.map(photo =>
                photo.id === selectedPhoto.id ? { ...photo, url: photoUrl, title: photoTitle } : photo
            ));
        } else if (modalType === 'add') {
            setPhotos([...photos, { id: photos.length + 1, albumId: parseInt(albumId), url: photoUrl, title: photoTitle }]);
        }
        handleCloseModal();
    };

    const handleDelete = (photoId) => {
        setPhotos(photos.filter(photo => photo.id !== photoId));
    };

    return (
        <Page title="Album Details">
            <Layout>
                <Layout.Section>
                    <Button onClick={() => navigate(-1)} icon={ArrowLeftIcon}>Go Back</Button>
                </Layout.Section>

                <Layout.Section>
                    <Card title="Album Information" sectioned>
                        <p><Text variation="strong">Title:</Text> {album.title}</p>
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card title="Photos" sectioned>
                        <Button onClick={() => handleOpenModal('add')}>Add Photo</Button>
                        {albumPhotos.map(photo => (
                            <div
                                key={photo.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '10px',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            >
                                <div>
                                    <img src={photo.url} alt={photo.title} style={{ width: '100px', height: '100px' }} />
                                    <Text>{photo.title}</Text>
                                </div>
                                <div>
                                    <Button onClick={() => handleOpenModal('edit', photo)}>Edit</Button>
                                    <Button destructive onClick={() => handleDelete(photo.id)}>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </Card>
                </Layout.Section>

                {isModalOpen && (
                    <Modal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        title={modalType === 'edit' ? 'Edit Photo' : 'Add Photo'}
                        primaryAction={{
                            content: 'Save',
                            onAction: handleSave
                        }}
                    >
                        <Modal.Section>
                            <TextField
                                value={photoTitle}
                                onChange={setPhotoTitle}
                                label="Photo Title"
                                placeholder="Enter photo title"
                            />
                            <TextField
                                value={photoUrl}
                                onChange={setPhotoUrl}
                                label="Photo URL"
                                placeholder="Enter photo URL"
                            />
                        </Modal.Section>
                    </Modal>
                )}
            </Layout>
        </Page>
    );
};

export default AlbumDetail;
