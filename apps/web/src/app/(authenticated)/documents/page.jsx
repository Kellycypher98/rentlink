
import { useEffect, useState } from 'react'
import {
  Typography,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Upload,
} from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '../../../modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '../../../domain'
import { PageLayout } from '../../../layouts/Page.layout'

export default function DocumentSharingPage() {
  const router = useRouter()
  const params = useParams()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [properties, setProperties] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    if (userId) {
      fetchProperties()
    }
  }, [userId])

  const fetchProperties = async () => {
    try {
      const properties = await Api.Property.findManyByLandlordId(userId, {
        includes: ['documents'],
      })
      setProperties(properties)
    } catch (error) {
      enqueueSnackbar('Failed to fetch properties', { variant: 'error' })
    }
  }

  const handleAddDocument = async values => {
    try {
      await Api.Document.createOneByPropertyId(selectedPropertyId, {
        documentType: values.documentType,
        filePathUrl: values.filePathUrl,
      })
      enqueueSnackbar('Document added successfully', { variant: 'success' })
      setIsModalVisible(false)
      fetchProperties()
    } catch (error) {
      enqueueSnackbar('Failed to add document', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Property Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Documents',
      dataIndex: 'documents',
      key: 'documents',
      render: documents => (
        <ul>
          {documents?.map(doc => (
            <li key={doc.id}>
              <a
                href={doc.filePathUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {doc.documentType}
              </a>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => showAddDocumentModal(record.id)}
          >
            Add Document
          </Button>
        </Space>
      ),
    },
  ]

  const showAddDocumentModal = propertyId => {
    setSelectedPropertyId(propertyId)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Document Management</Title>
      <Text>
        Manage and share documents related to your properties and tenants.
      </Text>
      <Table columns={columns} dataSource={properties} rowKey="id" />
      <Modal
        title="Add New Document"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddDocument}>
          <Form.Item
            name="documentType"
            label="Document Type"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="filePathUrl"
            label="File URL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
