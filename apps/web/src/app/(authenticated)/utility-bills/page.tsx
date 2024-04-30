'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Space,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function UtilityBillsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [properties, setProperties] = useState([])
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [utilityBills, setUtilityBills] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (userId) {
      fetchProperties()
    }
  }, [userId])

  const fetchProperties = async () => {
    try {
      const properties = await Api.Property.findManyByLandlordId(userId, {
        includes: ['utilityBills'],
      })
      setProperties(properties)
    } catch (error) {
      enqueueSnackbar('Failed to fetch properties', { variant: 'error' })
    }
  }

  const handlePropertySelect = async propertyId => {
    const selected = properties.find(p => p.id === propertyId)
    setSelectedProperty(selected)
    setUtilityBills(selected?.utilityBills || [])
  }

  const showAddBillModal = () => {
    setIsModalVisible(true)
  }

  const handleAddBill = async values => {
    try {
      const newBill = await Api.UtilityBill.createOneByPropertyId(
        selectedProperty.id,
        {
          billType: values.billType,
          amount: values.amount,
          dueDate: dayjs(values.dueDate).format('YYYY-MM-DD'),
        },
      )
      setUtilityBills([...utilityBills, newBill])
      setIsModalVisible(false)
      form.resetFields()
      enqueueSnackbar('Utility bill added successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to add utility bill', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Bill Type',
      dataIndex: 'billType',
      key: 'billType',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: text => dayjs(text).format('YYYY-MM-DD'),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Utility Bills Management</Title>
      <Text>Select a property to view and manage its utility bills.</Text>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {properties.map(property => (
          <Button
            key={property.id}
            onClick={() => handlePropertySelect(property.id)}
          >
            {property.address}
          </Button>
        ))}
      </Space>
      {selectedProperty && (
        <>
          <Title level={4}>Utility Bills for {selectedProperty.address}</Title>
          <Button icon={<PlusOutlined />} onClick={showAddBillModal}>
            Add New Bill
          </Button>
          <Table dataSource={utilityBills} columns={columns} rowKey="id" />
        </>
      )}
      <Modal
        title="Add New Utility Bill"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddBill} layout="vertical">
          <Form.Item
            name="billType"
            label="Bill Type"
            rules={[{ required: true, message: 'Please input the bill type!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please input the amount!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please input the due date!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Bill
          </Button>
        </Form>
      </Modal>
    </PageLayout>
  )
}
