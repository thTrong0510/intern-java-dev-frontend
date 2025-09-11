import { Modal, Form, Input } from "antd";
import { useEffect } from "react";

interface IPostModalProps {
    open: boolean;
    onCancel: () => void;
    onOk: (values: { title: string; content: string }) => void;
    initialValues?: { title?: string; content?: string };
    title?: string; // tiêu đề modal: "Tạo mới bài viết" | "Chỉnh sửa bài viết"
}

export default function PostModal({
    open,
    onCancel,
    onOk,
    initialValues,
    title = "Tạo mới bài viết",
}: IPostModalProps) {
    const [form] = Form.useForm();

    // điền dữ liệu khi edit
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form, open]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onOk(values);
        } catch (err) {
            console.error("Validation error:", err);
        }
    };

    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            onOk={handleSubmit}
            okText="Lưu"
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
