import { CloseOutlined } from "@ant-design/icons";
import { Model } from "../../../../../../../domain";
import { Avatar, Button, Card, Flex, Typography } from "antd";
import React from "react";

const { Text, Paragraph } = Typography;

export const NotificationCard = ({ notification, onClick, onDelete }) => {
  return (
    <Card onClick={onClick} style={{ marginBottom: 16, width: "100%" }}>
      <Flex gap="middle">
        <Avatar src={notification.senderPictureUrl}>
          {notification.senderName[0]}
        </Avatar>

        <Flex vertical flex={1}>
          <Text strong>{notification.title}</Text>
          <Paragraph>{notification.message}</Paragraph>
        </Flex>

        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      </Flex>
    </Card>
  );
};
