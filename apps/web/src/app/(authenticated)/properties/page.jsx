import { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useAuthentication } from '../../../modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '../../../domain'
import { PageLayout } from '../../../layouts/Page.layout'


const { Title, Text } = Typography

export default function PropertiesPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [properties, setProperties] = useState([])

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, { includes: ['propertysAsLandlord'] })
        .then(user => {
          setProperties(user.propertysAsLandlord || [])
        })
        .catch(error => {
          enqueueSnackbar('Failed to fetch properties: ' + error.message, {
            variant: 'error',
          })
        })
    }
  }, [userId])

  const navigateToAddProperty = () => {
    router.push('/properties/new')
  }

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>My Properties</Title>
        <Text type="secondary">
          Manage all your listed properties from here.
        </Text>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={navigateToAddProperty}
        >
          Add New Property
        </Button>
        <Row gutter={[16, 16]}>
          {properties?.map(property => (
            <Col key={property.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={property.address}
                actions={[
                  <Button
                    key="edit"
                    type="link"
                    onClick={() => router.push(`/properties/${property.id}`)}
                  >
                    View Details
                  </Button>,
                ]}
              >
                <Text>
                  {property.description || 'No description provided.'}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </PageLayout>
  )
}
