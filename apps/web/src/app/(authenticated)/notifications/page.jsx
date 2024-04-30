import { Flex, Typography } from 'antd'

import { useHttpAction } from '../../../core/http/http.action.hook'
import { useCoreStore } from '../../../core/store'
import { Api } from '../../../domain'
import { PageLayout } from '../../../layouts/Page.layout'
import { useNotificationToast } from '../../../modules/notification/components'
import { Actions } from './components/Actions'
import { NotificationList } from './components/NotificationList'

export default function NotificationsPage() {
  const { notifications, setNotifications } = useCoreStore()

  const notificationToast = useNotificationToast()
  const actionClearAll = useHttpAction()

  const handleClearAll = () => {
    actionClearAll.run(() =>
      Api.Notification.deleteAllByMe().then(() => setNotifications([])),
    )
  }

  const canClearAll = notifications.length > 0

  return (
    <PageLayout layout="super-narrow">
      <Flex justify="space-between" align="center">
        <Typography.Title level={1}>Notifications</Typography.Title>
        <Actions
          canClearAll={canClearAll}
          isLoadingClearAll={actionClearAll.isLoading}
          onClearAll={handleClearAll}
        />
      </Flex>

      <NotificationList
        notifications={notifications}
        onClick={notificationToast.onClick}
        onDelete={notificationToast.onDelete}
      />
    </PageLayout>
  )
}
