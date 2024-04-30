'use client'

import { Form, Input, Button, Select, Typography } from 'antd'
import { UserOutlined, MailOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddTenantPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [properties, setProperties] = React.useState<Model.Property[]>([])

  React.useEffect(() => {
    const fetchProperties = async () => {
      if (userId) {
        try {
          const properties = await Api.Property.findManyByLandlordId(userId, {
            includes: ['tenants'],
          })
          setProperties(properties)
        } catch (error) {
          enqueueSnackbar('Failed to fetch properties', { variant: 'error' })
        }
      }
    }
    fetchProperties()
  }, [userId])

  const handleFormSubmit = async (values: {
    email: string
    propertyId: string
  }) => {
    try {
      const newTenant = await Api.Tenant.createOneByPropertyId(
        values.propertyId,
        { userId: values.email },
      )
      enqueueSnackbar('Tenant added successfully', { variant: 'success' })
      router.push(`/tenants/${newTenant.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to add tenant', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Title level={2}>Add New Tenant</Title>
        <Text type="secondary">
          Enter the details of the tenant you wish to add to your property.
        </Text>
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input the tenant's email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Tenant Email" />
          </Form.Item>
          <Form.Item
            name="propertyId"
            rules={[{ required: true, message: 'Please select the property!' }]}
          >
            <Select placeholder="Select Property" allowClear>
              {properties.map(property => (
                <Option key={property.id} value={property.id}>
                  {property.address}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Add Tenant
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
