import { Button, Form } from "antd";
import { FormValues } from "../Pages/RealtimeChatApp";

const RegisterChatMember = ({
  onSubmitForm,
}: {
  onSubmitForm: (values: FormValues) => void;
}) => {
  const [form] = Form.useForm();

  return (
    <div className="flex items-center justify-center w-1/4 p-5 mx-auto bg-white border border-gray-200 rounded-md shadow-md dark:bg-gray-500 dark:border-none">
      <Form form={form} onFinish={onSubmitForm} className="w-full">
        <div className="flex flex-col gap-2">
          <h1 className="mb-2 text-lg font-bold text-center">
            ลงทะเบียนเพื่อเข้ากลุ่มแชท
          </h1>
          <Form.Item
            name="email"
            className="w-full"
            initialValue={""}
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <input
              type="email"
              placeholder="Your Email"
              onInvalid={(e: React.FormEvent<HTMLInputElement>) => {
                e.preventDefault();
                (e.target as HTMLInputElement).setCustomValidity("");
              }}
              className="w-full p-2 bg-white border rounded-md"
            />
          </Form.Item>
          <Form.Item
            initialValue={""}
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <input
              type="password"
              placeholder="Your Password"
              className="w-full p-2 bg-white border rounded-md"
            />
          </Form.Item>
          <Form.Item className="m-0">
            <Button type="primary" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default RegisterChatMember;
