
import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Statistic, Button } from 'antd'
import { HomeOutlined, UserOutlined, BankOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '../../../domain'
import { PageLayout } from '../../../layouts/Page.layout'

export default function DashboardPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  if (!authentication.isAuthenticated) {
    enqueueSnackbar('You must be logged in to access this page.', {
      variant: 'error',
    })
    router.push('/home')
    return null
  }

  const [userData, setUserData] = useState<Model.User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, { includes: ['propertysAsLandlord', 'tenants'] })
        .then(data => {
          setUserData(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Failed to fetch user data:', error)
          enqueueSnackbar('Failed to fetch data.', { variant: 'error' })
          setLoading(false)
        })
    }
  }, [userId])

  const navigateToProperties = () => router.push('/properties')
  const navigateToTenants = () => router.push('/tenants')

  return (
    <div style={{ width: '100%' }}>
      <Title level={2}>Dashboard</Title>
      <Text>Welcome to your property management dashboard.</Text>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable onClick={navigateToProperties}>
            <Statistic
              title="Properties"
              value={userData?.propertysAsLandlord?.length || 0}
              prefix={<BankOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable onClick={navigateToTenants}>
            <Statistic
              title="Tenants"
              value={userData?.tenants?.length || 0}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Last Login"
              value={dayjs(authentication.user?.dateUpdated).format(
                'DD/MM/YYYY',
              )}
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
