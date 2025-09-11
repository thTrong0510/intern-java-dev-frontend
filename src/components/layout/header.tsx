import { Button, Space, Modal, Form, notification, Input } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLogoutAction } from "redux/slice/accountSlice";
import { useState } from "react";
import { callCreatePost } from "@/config/api";

type TFilterType = "all" | "mine";

interface IProps {
    setFilter: (v: TFilterType) => void;
}

export default function Header({ setFilter }: IProps) {
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.account);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // state cho modal Create
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [form] = Form.useForm();


    const handleCreateSubmit = async () => {
        try {
            const values = await form.validateFields();
            await callCreatePost(values.title, values.content);
            notification.success({ message: "Tạo bài viết thành công" });
            setIsCreateModalVisible(false);
            // fetchPosts();
        } catch (error) {
            notification.error({ message: "Không thể tạo bài viết" });
        }
    };


    const handleLogout = () => {
        dispatch(setLogoutAction(null));
        window.location.assign("/login");
    };

    const handleRequireLogin = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        window.location.assign("/login"); // redirect tới login
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <header
                style={{
                    padding: "1rem 2rem",
                    background: "#f5f5f5",
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Space size="middle">
                    <Button type="default" onClick={() => setFilter("all")}>
                        Tất cả bài viết
                    </Button>
                    <Button
                        type="default"
                        onClick={() =>
                            isAuthenticated ? setFilter("mine") : handleRequireLogin()
                        }
                    >
                        Bài viết của tôi
                    </Button>
                    <Button
                        type="primary"
                        onClick={() =>
                            isAuthenticated
                                ? setIsCreateModalVisible(true)
                                : handleRequireLogin()
                        }
                    >
                        Tạo mới bài viết
                    </Button>
                </Space>

                <div>
                    {isAuthenticated ? (
                        <>
                            <span style={{ marginRight: 16 }}>
                                Xin chào, <b>{user.name}</b>
                            </span>
                            <Button danger onClick={handleLogout}>
                                Đăng xuất
                            </Button>
                        </>
                    ) : (
                        <Button type="primary" onClick={() => { window.location.assign("/login") }}>
                            Đăng nhập
                        </Button>
                    )}
                </div>
            </header>

            <Modal
                title="Tạo mới bài viết"
                open={isCreateModalVisible}
                onCancel={() => setIsCreateModalVisible(false)}
                onOk={handleCreateSubmit}
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

            <Modal
                title="Yêu cầu đăng nhập"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Đăng nhập"
                cancelText="Hủy"
            >
                <p>Bạn cần đăng nhập để sử dụng chức năng này.</p>
            </Modal>
        </>
    );
}
