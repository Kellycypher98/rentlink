'use client'

import { useEffect, useState } from 'react'
import { Typography, Descriptions, Card, Avatar, List, Button } from 'antd'
import { FileOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TenantDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [tenant, setTenant] = useState<Model.Tenant | null>(null)

  useEffect(() => {
    if (!params.id) {
      enqueueSnackbar('No tenant ID provided', { variant: 'error' })
      router.push('/tenants')
      return
    }

    const fetchTenant = async () => {
      try {
        const tenantData = await Api.Tenant.findOne(params.id, {
          includes: ['user', 'property', 'leases', 'documents'],
        })
        setTenant(tenantData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch tenant details', { variant: 'error' })
        console.error('Failed to fetch tenant details:', error)
      }
    }

    fetchTenant()
  }, [params.id, router])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Tenant Details</Title>
      <Text type="secondary">Detailed information about the tenant.</Text>
      {tenant ? (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Name">
            {tenant.user?.name || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {tenant.user?.email || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Property Address">
            {tenant.property?.address || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Lease Start Date">
            {tenant.leases?.[0]
              ? dayjs(tenant.leases[0].startDate).format('YYYY-MM-DD')
              : 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Lease End Date">
            {tenant.leases?.[0]
              ? dayjs(tenant.leases[0].endDate).format('YYYY-MM-DD')
              : 'N/A'}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Text>Loading tenant details...</Text>
      )}

      <Card title="Documents" style={{ marginTop: 24 }}>
        <List
          dataSource={tenant?.documents}
          renderItem={doc => (
            <List.Item key={doc.id}>
              <List.Item.Meta
                avatar={<Avatar icon={<FileOutlined />} />}
                title={<a href={doc.filePathUrl}>{doc.documentType}</a>}
                description={`Uploaded: ${dayjs(doc.dateCreated).format('YYYY-MM-DD')}`}
              />
            </List.Item>
          )}
        />
      </Card>

      <Button
        type="primary"
        icon={<HomeOutlined />}
        style={{ marginTop: 24 }}
        onClick={() => router.push('/properties')}
      >
        View Properties
      </Button>
      <Button
        type="default"
        icon={<UserOutlined />}
        style={{ marginLeft: 8 }}
        onClick={() => router.push('/tenants')}
      >
        Back to Tenants
      </Button>
    </PageLayout>
  )
}
