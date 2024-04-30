import { useState, useEffect } from "react";
import { Button, Upload, Typography, Form, Input, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAuthentication } from "@web/modules/authentication";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { useRouter, useParams } from "next/navigation";
import { Api, Model } from "@web/domain";
import { PageLayout } from "@web/layouts/Page.layout";

const { Title, Text } = Typography;
const { Option } = Select;

export default function AddDocumentPage() {
  const router = useRouter();
  const params = useParams();
  const authentication = useAuthentication();
  const userId = authentication.user?.id;
  const { enqueueSnackbar } = useSnackbar();
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [fileList, setFileList] = useState([]);
  const [documentType, setDocumentType] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      if (userId) {
        try {
          const properties = await Api.Property.findManyByLandlordId(userId, {
            includes: ["landlord"],
          });
          setProperties(properties);
        } catch (error) {
          enqueueSnackbar("Failed to fetch properties", { variant: "error" });
        }
      }
    };

    fetchProperties();
  }, [userId]);

  const handleUpload = async (options) => {
    const { file } = options;
    try {
      const url = await Api.Upload.upload(file);
      setFileList([{ url: url, status: "done", name: file.name }]);
      message.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      message.error(`${file.name} file upload failed.`);
    }
  };

  const handleSubmit = async () => {
    if (!selectedProperty || !documentType || fileList.length === 0) {
      enqueueSnackbar("Please fill all fields and upload a document", {
        variant: "error",
      });
      return;
    }

    try {
      const document = await Api.Document.createOneByPropertyId(
        selectedProperty,
        {
          documentType: documentType,
          filePathUrl: fileList[0].url,
        }
      );
      enqueueSnackbar("Document added successfully", { variant: "success" });
      router.push("/documents");
    } catch (error) {
      enqueueSnackbar("Failed to add document", { variant: "error" });
    }
  };

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Add Document</Title>
      <Text>
        Please upload documents related to your properties to share with
        tenants.
      </Text>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Select Property" required>
          <Select
            placeholder="Select a property"
            onChange={(value) => setSelectedProperty(value)}
            value={selectedProperty}
          >
            {properties.map((property) => (
              <Option key={property.id} value={property.id}>
                {property.address}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Document Type" required>
          <Input
            placeholder="Enter document type"
            onChange={(e) => setDocumentType(e.target.value)}
            value={documentType}
          />
        </Form.Item>
        <Form.Item label="Upload Document" required>
          <Upload
            fileList={fileList}
            customRequest={handleUpload}
            maxCount={1}
            beforeUpload={() => false}
            onRemove={() => setFileList([])}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={fileList.length === 0}
          >
            Submit Document
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  );
}
