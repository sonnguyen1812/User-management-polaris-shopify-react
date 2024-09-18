import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { Card, Page, Layout, Text } from "@shopify/polaris";

const UserAlbums = () => {
  const { id } = useParams();
  const { albums } = useUserContext();
  const userAlbums = albums.filter((album) => album.userId === parseInt(id));
  const navigate = useNavigate();

  return (
    <Page
      title="Albums"
      backAction={{ content: "Back", onAction: () => navigate(-1) }}
    >
      <Layout>
        {userAlbums.map((album) => (
          <Layout.Section key={album.id}>
            <div
              title={
                <Text variant="headingSm" as="h3">
                  {album.title}
                </Text>
              }
              onClick={() => navigate(`/user/${id}/albums/${album.id}`)}
            >
              <Card>
                <Text as="p">{album.title}</Text>
              </Card>
            </div>
          </Layout.Section>
        ))}
      </Layout>
    </Page>
  );
};

export default UserAlbums;
