'use client'

import { Button, Form, Input, Typography } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddNewPropertyPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [form] = Form.useForm()

  const handleSubmit = async (values: {
    address: string
    description?: string
  }) => {
    if (!userId) {
      enqueueSnackbar('User must be logged in to add a property', {
        variant: 'error',
      })
      return
    }

    try {
      const newProperty = await Api.Property.createOneByLandlordId(userId, {
        address: values.address,
        description: values.description,
      })
      enqueueSnackbar('Property added successfully', { variant: 'success' })
      router.push(`/properties/${newProperty.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to add property', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Title level={2}>Add New Property</Title>
        <Text type="secondary">
          Enter the details of the property you wish to add to your portfolio.
        </Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: 'Please input the address of the property!',
              },
            ]}
          >
            <Input placeholder="1234 Main St" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: false }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Description of the property"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Property
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="link"
          icon={<HomeOutlined />}
          onClick={() => router.push('/home')}
        >
          Return to Home
        </Button>
      </div>
    </PageLayout>
  )
}
