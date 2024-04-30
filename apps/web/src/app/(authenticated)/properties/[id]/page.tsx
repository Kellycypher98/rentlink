'use client'

import React, { useEffect, useState } from 'react'
import {
  Typography,
  Descriptions,
  Card,
  List,
  Avatar,
  Space,
  Button,
} from 'antd'
import {
  HomeOutlined,
  FileTextOutlined,
  UserOutlined,
  ToolOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function PropertyDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [property, setProperty] = useState<Model.Property | null>(null)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyDetails = await Api.Property.findOne(params.id, {
          includes: [
            'landlord',
            'tenants',
            'leases',
            'documents',
            'utilityBills',
          ],
        })
        setProperty(propertyDetails)
      } catch (error) {
        enqueueSnackbar('Failed to fetch property details', {
          variant: 'error',
        })
      }
    }

    fetchProperty()
  }, [params.id])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Property Details</Title>
      <Text type="secondary">Detailed information about the property.</Text>

      {property && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Address">
            {property.address}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {property.description}
          </Descriptions.Item>
          <Descriptions.Item label="Landlord">
            {property.landlord?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Creation Date">
            {dayjs(property.dateCreated).format('DD/MM/YYYY')}
          </Descriptions.Item>
        </Descriptions>
      )}

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card
          title="Tenants"
          extra={
            <Button
              type="link"
              icon={<UserOutlined />}
              onClick={() => router.push('/tenants')}
            >
              Manage
            </Button>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={property?.tenants}
            renderItem={tenant => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={tenant.user?.name}
                  description={`Lease Count: ${tenant.leases?.length}`}
                />
              </List.Item>
            )}
          />
        </Card>

        <Card
          title="Documents"
          extra={
            <Button
              type="link"
              icon={<FileTextOutlined />}
              onClick={() => router.push('/documents')}
            >
              Manage
            </Button>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={property?.documents}
            renderItem={document => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<FileTextOutlined />} />}
                  title={document.documentType}
                  description={`Uploaded: ${dayjs(document.dateCreated).format('DD/MM/YYYY')}`}
                />
              </List.Item>
            )}
          />
        </Card>

        <Card
          title="Utility Bills"
          extra={
            <Button
              type="link"
              icon={<DollarCircleOutlined />}
              onClick={() => router.push('/utility-bills')}
            >
              Manage
            </Button>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={property?.utilityBills}
            renderItem={bill => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<DollarCircleOutlined />} />}
                  title={`${bill.billType} - $${bill.amount}`}
                  description={`Due: ${dayjs(bill.dueDate).format('DD/MM/YYYY')}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </PageLayout>
  )
}
