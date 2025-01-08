import { Button, Form, Input, Modal } from "antd";
import { ProductFormValues, ProductsType } from "../Pages/ProductManagement";
import { useEffect } from "react";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void;
  formData?: ProductsType | null;
}

const AddProductModal = ({
  open,
  onClose,
  onSubmit,
  formData,
}: AddProductModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (formData) {
        form.setFieldsValue(formData);
      } else {
        form.resetFields();
      }
    }
  }, [form, formData, open]);

  return (
    <Form form={form} onFinish={onSubmit} className="mt-6">
      <Modal
        title={
          formData ? `แก้ไขสินค้า "${formData.name}"` : "เพิ่มรายการสินค้า"
        }
        open={open}
        centered
        closeIcon={null}
        footer={() => (
          <div className="flex justify-end gap-2">
            <Button onClick={onClose}>ยกเลิก</Button>
            <Button type="primary" onClick={() => form.submit()}>
              {formData ? "แก้ไข" : "เพิ่มสินค้า"}
            </Button>
          </div>
        )}
      >
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-md">ชื่อสินค้า</h2>
          <Form.Item
            initialValue={""}
            name="name"
            rules={[{ required: true, message: "กรุณากรอกชื่อสินค้า" }]}
          >
            <Input placeholder="กรอกชื่อสินค้า" />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-md">ราคา</h2>
          <Form.Item
            initialValue={""}
            name="price"
            rules={[{ required: true, message: "กรุณากรอกราคา" }]}
          >
            <Input type="number" placeholder="0" />
          </Form.Item>
        </div>
      </Modal>
    </Form>
  );
};

export default AddProductModal;
