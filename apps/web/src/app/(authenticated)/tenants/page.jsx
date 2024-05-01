import { useEffect, useState } from 'react'
import { Typography, Table, Button, Space, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useAuthentication } from '../../../modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '../../../domain'
import { PageLayout } from '../../../layouts/Page.layout'

const { Title, Text } = Typography

export default function TenantManagementPage() {
  const router = useRouter()
  const params = useParams()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [tenants, setTenants] = useState([])

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: ['propertysAsLandlord.tenants.user'],
      })
        .then(user => {
          const tenants =
            user.propertysAsLandlord?.flatMap(property => property.tenants) ??
            []
          setTenants(tenants)
        })
        .catch(error => {
          enqueueSnackbar('Failed to fetch tenants: ' + error.message, {
            variant: 'error',
          })
        })
    }
  }, [userId])

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'user',
      key: 'avatar',
      render: user =>
        user?.pictureUrl ? (
          <Avatar src={user.pictureUrl} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        ),
    },
    {
      title: 'Name',
      dataIndex: 'user',
      key: 'name',
      render: user => user?.name || 'No Name Provided',
    },
    {
      title: 'Email',
      dataIndex: 'user',
      key: 'email',
      render: user => user?.email || 'No Email Provided',
    },
    {
      title: 'Property Address',
      dataIndex: 'property',
      key: 'address',
      render: property => property?.address || 'No Address Provided',
    },
    {
      title: 'Lease Start Date',
      dataIndex: 'leases',
      key: 'startDate',
      render: leases =>
        leases?.length
          ? dayjs(leases[0].startDate).format('YYYY-MM-DD')
          : 'No Lease Info',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => router.push(`/tenants/${record.id}`)}>
            Details
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  const handleDelete = (tenantId) => {
    Api.Tenant.deleteOne(tenantId)
      .then(() => {
        enqueueSnackbar('Tenant deleted successfully', { variant: 'success' })
        setTenants(tenants => tenants.filter(tenant => tenant.id !== tenantId))
      })
      .catch(error => {
        enqueueSnackbar('Failed to delete tenant: ' + error.message, {
          variant: 'error',
        })
      })
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Tenant Management</Title>
      <Text>
        Manage and view all tenants associated with your properties. Click on
        Details to view more information about a tenant or Delete to remove
        a tenant.
      </Text>
      <Table dataSource={tenants} columns={columns} rowKey="id" />
    </PageLayout>
  )
}
