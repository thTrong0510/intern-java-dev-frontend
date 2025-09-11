import { useEffect, useState } from "react";
import { callFetchPost, callFetchUserPost, callDeletePost, callUpdatePost } from "config/api";
import { notification, Modal, Button, Form, Input } from "antd";
import type { IPost } from "types/backend";
import { useAppSelector } from "@/redux/hooks";

interface HomePageProps {
    filterType: "all" | "mine";
}

export default function HomePage({ filterType }: HomePageProps) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // state cho modal edit
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingPost, setEditingPost] = useState<IPost | null>(null);

    // modal delete
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletePostId, setDeletePostId] = useState<string | number | null>(null);

    const { user, isAuthenticated } = useAppSelector((state) => state.account);
    const [form] = Form.useForm();

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            if (filterType === "all") {
                const res = await callFetchPost("page=1&pageSize=10");
                setPosts(res.data?.data?.result || []);
            } else if (filterType === "mine") {
                const res = await callFetchUserPost("page=1&pageSize=10");
                setPosts(res.data?.data?.result || []);
            }
        } catch (err) {
            notification.error({ message: "Không thể tải bài viết" });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [filterType]);

    const handleOpenDeleteModal = (id: string | number) => {
        setDeletePostId(id);
        setIsDeleteModalOpen(true);
    };

    const openEditModal = (post: IPost) => {
        setEditingPost(post);
        form.setFieldsValue({
            title: post.title,
            content: post.content,
        });
        setIsEditModalVisible(true);
    };

    const handleEditSubmit = async () => {
        try {
            const values = await form.validateFields();
            await callUpdatePost(String(editingPost?.id), values.title, values.content);
            notification.success({ message: "Cập nhật bài viết thành công" });
            setIsEditModalVisible(false);
            setEditingPost(null);
            fetchPosts();
        } catch (error) {
            notification.error({ message: "Không thể cập nhật bài viết" });
        }
    };

    const handleConfirmDelete = async () => {
        if (!deletePostId) return;
        try {
            await callDeletePost(String(deletePostId));
            notification.success({ message: "Xóa bài viết thành công" });
            fetchPosts();
        } catch {
            notification.error({ message: "Không thể xóa bài viết" });
        } finally {
            setIsDeleteModalOpen(false);
            setDeletePostId(null);
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h1>Danh sách bài viết</h1>
            {isLoading ? (
                <p>Đang tải...</p>
            ) : posts.length === 0 ? (
                <p>Chưa có bài viết nào.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {posts.map((post) => (
                        <li
                            key={post.id}
                            style={{
                                border: "1px solid #ddd",
                                padding: "1rem",
                                marginBottom: "1rem",
                                borderRadius: "5px",
                            }}
                        >
                            <h3>{post.title}</h3>
                            <p>{post.content}...</p>
                            <p style={{ fontStyle: "italic" }}>
                                Tác giả: {post.user?.name || "Không rõ"}
                            </p>
                            {isAuthenticated && user.id === post.user?.id && (
                                <div style={{ marginTop: "0.5rem" }}>
                                    <Button
                                        type="primary"
                                        style={{ marginRight: 8 }}
                                        onClick={() => openEditModal(post)}
                                    >
                                        Edit
                                    </Button>
                                    <Button danger onClick={() => handleOpenDeleteModal(post.id!)}>
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            <Modal
                title="Chỉnh sửa bài viết"
                open={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                onOk={handleEditSubmit}
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
                title="Xác nhận xóa"
                open={isDeleteModalOpen}
                onOk={handleConfirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
                okText="Xóa"
                okType="danger"
                cancelText="Hủy"
            >
                <p>Bạn có chắc muốn xóa bài viết này không?</p>
            </Modal>
        </div>
    );
}
