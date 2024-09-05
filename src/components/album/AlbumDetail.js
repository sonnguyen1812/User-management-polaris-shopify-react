import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import {
    Card,
    Page,
    Layout,
    Button,
    Modal,
    TextField,
    InlineGrid,
    Text,
    Pagination,
    Popover,
    ActionList,
    Icon,
    Flex,
    DescriptionList
} from '@shopify/polaris';
import {ArrowLeftIcon, MenuVerticalIcon, PlusCircleIcon} from "@shopify/polaris-icons";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const AlbumDetail = () => {
    const { albumId } = useParams();
    const navigate = useNavigate();
    const { albums, photos, setPhotos } = useUserContext();

    const album = albums.find(album => album.id === parseInt(albumId));
    const [currentPage, setCurrentPage] = useState(1);
    const [photosPerPage] = useState(9); // Hiển thị 9 ảnh mỗi trang
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoTitle, setPhotoTitle] = useState('');
    const [popoverActiveId, setPopoverActiveId] = useState(null);

    // Logic for pagination
    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    const currentPhotos = photos.filter(photo => photo.albumId === parseInt(albumId)).slice(indexOfFirstPhoto, indexOfLastPhoto);
    const totalPages = Math.ceil(photos.filter(photo => photo.albumId === parseInt(albumId)).length / photosPerPage);

    const handleOpenModal = useCallback((type, photo = null) => {
        setModalType(type);
        setSelectedPhoto(photo);
        setPhotoUrl(photo ? photo.url : '');
        setPhotoTitle(photo ? photo.title : '');
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedPhoto(null);
        setPhotoUrl('');
        setPhotoTitle('');
    }, []);

    const handleSave = useCallback(() => {
        if (modalType === 'edit' && selectedPhoto) {
            setPhotos(photos.map(photo =>
                photo.id === selectedPhoto.id ? { ...photo, url: photoUrl, title: photoTitle } : photo
            ));
        } else if (modalType === 'add') {
            setPhotos([...photos, { id: photos.length + 1, albumId: parseInt(albumId), url: photoUrl, title: photoTitle }]);
        }
        handleCloseModal();
    }, [modalType, selectedPhoto, photoUrl, photoTitle, photos, albumId, setPhotos, handleCloseModal]);

    const handleDelete = useCallback((photoId) => {
        setPhotos(photos.filter(photo => photo.id !== photoId));
    }, [photos, setPhotos]);

    const togglePopoverActive = (id) => {
        setPopoverActiveId(popoverActiveId === id ? null : id);
    };

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

    return (
        <Page
            title="Album Details"
            backAction={{ content: 'Back', onAction: () => navigate(-1) }}
        >
            <Layout>

                <Layout.Section>
                    <Card>
                    <DescriptionList
                        items={[
                            {term: 'Title', description: album.title}
                        ]}
                    />
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <Card>
                        <div style={{paddingBottom: '15px'}}>
                        <Button onClick={() => handleOpenModal('add')}><Icon
                            source={PlusCircleIcon}
                            tone="base"
                        />Add Photo</Button>
                        </div>
                        <InlineGrid columns={3} gap="400">
                            {currentPhotos.map(photo => (
                                <Card
                                    key={photo.id}
                                    sectioned
                                    style={{ borderRadius: '8px', overflow: 'hidden', position: 'relative' }}
                                >
                                    <LazyLoadImage
                                        src={photo.url}
                                        alt={photo.title}
                                        effect="blur"
                                        style={{ width: '90%', height: '', borderRadius: '10px', marginTop: '40px', alignItems: 'center', marginLeft: '13px' }}
                                    />
                                    <Text variant="bodyLg" as="p" alignment="center">{photo.title}</Text>

                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            zIndex: '10',
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Ngăn chặn việc click vào nút ba chấm dẫn đến navigation
                                        }}
                                    >
                                        <Popover
                                            active={popoverActiveId === photo.id} // Kiểm tra nếu popoverActiveId là của ảnh hiện tại
                                            activator={
                                                <Button variant={"plain"} icon={MenuVerticalIcon}
                                                        onClick={() => togglePopoverActive(photo.id)}/>
                                            }
                                            onClose={() => togglePopoverActive(photo.id)}
                                        >
                                            <ActionList
                                                items={[
                                                    {
                                                        content: 'Edit',
                                                        onAction: () => {
                                                            handleOpenModal('edit', photo);
                                                            togglePopoverActive(photo.id);
                                                        }
                                                    },
                                                    {
                                                        content: 'Delete',
                                                        onAction: () => {
                                                            handleDelete(photo.id);
                                                            togglePopoverActive(photo.id);
                                                        },
                                                        destructive: true,
                                                    }
                                                ]}
                                            />
                                        </Popover>
                                    </div>
                                </Card>
                            ))}
                        </InlineGrid>
                        <div align="center"
                             style={{
                                 marginTop: '30px',
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                             }}>
                            <Pagination
                                label={<Text as="p" style={{ marginTop: '10px' }}>
                                    Page {currentPage} of {totalPages}
                                </Text>}
                                hasPrevious={currentPage > 1}
                                hasNext={currentPage < totalPages}
                                onPrevious={() => setCurrentPage(prev => prev - 1)}
                                onNext={() => setCurrentPage(prev => prev + 1)}
                            />
                        </div>
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
