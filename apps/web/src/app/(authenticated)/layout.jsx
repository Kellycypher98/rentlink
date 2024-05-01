import { useCoreStore } from "../../core/store";
import { Model } from "../../domain";
import { useNotificationCreated } from "../../domain/notification";
import { NavigationLayout } from "../../layouts/NavigationLayout";
import { AuthenticationGuard } from "../../modules/authentication";

import { UserCodeVerification } from "@web/modules/user/components";
import { ReactNode } from "react";

export default function AuthenticatedLayout({ children }) {
  const store = useCoreStore();

  useNotificationCreated((notification) => {
    const notificationsUpdated = [...store.notifications];

    notificationsUpdated.push(notification);

    store.setNotifications(notificationsUpdated);
  });

  return (
    <AuthenticationGuard>
      <UserCodeVerification>
        <NavigationLayout>{children}</NavigationLayout>
      </UserCodeVerification>
    </AuthenticationGuard>
  );
}
