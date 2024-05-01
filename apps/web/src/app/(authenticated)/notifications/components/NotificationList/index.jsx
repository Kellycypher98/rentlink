import { Model } from "../../../../../domain";
import { List, Typography } from "antd";
import React from "react";
import { NotificationCard } from "./components/NotificationCard";

const { Text } = Typography;

export const NotificationList = ({ notifications, onDelete, onClick }) => {
  const isEmpty = notifications.length === 0;

  return (
    <>
      {isEmpty ? (
        <Text type="secondary">You have no notifications</Text>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(notification) => (
            <List.Item style={{ width: "100%" }}>
              <NotificationCard
                notification={notification}
                onClick={() => onClick(notification)}
                onDelete={() => onDelete(notification)}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
};
