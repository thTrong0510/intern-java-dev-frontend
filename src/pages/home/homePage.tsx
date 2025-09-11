import { useEffect, useState } from "react";
import {
    callFetchPost,
    callFetchUserPost,
    callDeletePost,
    callUpdatePost,
    callCreatePost,
} from "config/api";
import { Modal, Button } from "antd";
import type { IPost } from "types/backend";
import { useAppSelector } from "@/redux/hooks";
import PostModal from "@/components/modal/PostModal";
import toast from "react-hot-toast";

interface HomePageProps {
    filterType: "all" | "mine";
}

export default function HomePage({ filterType }: HomePageProps) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // lazy load state
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // state cho modal create
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

    // state cho modal edit
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingPost, setEditingPost] = useState<IPost | null>(null);

    // modal delete
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletePostId, setDeletePostId] = useState<string | number | null>(null);

    const { user, isAuthenticated } = useAppSelector((state) => state.account);

    const fetchPosts = async (pageNumber: number = 1, append: boolean = false) => {
        setIsLoading(true);
        try {
            let res;
            if (filterType === "all") {
                res = await callFetchPost(`page=${pageNumber}&pageSize=10`);
            } else {
                res = await callFetchUserPost(`page=${pageNumber}&pageSize=10`);
            }

            const newPosts = res.data?.data?.result || [];

            if (append) {
                setPosts((prev) => [...prev, ...newPosts]);
            } else {
                setPosts(newPosts);
            }

            if (newPosts.length < 10) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        } catch {
            toast.error("Không thể tải bài viết");
        } finally {
            setIsLoading(false);
        }
    };

    // reset khi filter thay đổi
    useEffect(() => {
        setPage(1);
        fetchPosts(1, false);
    }, [filterType]);

    // scroll event để load thêm
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 50 >=
                document.documentElement.scrollHeight
            ) {
                if (!isLoading && hasMore) {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    fetchPosts(nextPage, true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [page, isLoading, hasMore, filterType]);

    const handleOpenDeleteModal = (id: string | number) => {
        setDeletePostId(id);
        setIsDeleteModalOpen(true);
    };

    const openEditModal = (post: IPost) => {
        setEditingPost(post);
        setIsEditModalVisible(true);
    };

    const handleCreateSubmit = async (values: { title: string; content: string }) => {
        try {
            await callCreatePost(values.title, values.content);
            toast.success("Tạo bài viết thành công");
            setIsCreateModalVisible(false);
            setPage(1);
            fetchPosts(1, false); // reset list để thấy bài mới nhất
        } catch {
            toast.error("Không thể tạo bài viết");
        }
    };

    const handleEditSubmit = async (values: { title: string; content: string }) => {
        try {
            if (!editingPost) return;
            await callUpdatePost(String(editingPost.id), values.title, values.content);
            toast.success("Cập nhật bài viết thành công");
            setIsEditModalVisible(false);
            setEditingPost(null);
            setPage(1);
            fetchPosts(1, false);
        } catch {
            toast.error("Không thể cập nhật bài viết");
        }
    };

    const handleConfirmDelete = async () => {
        if (!deletePostId) return;
        try {
            await callDeletePost(String(deletePostId));
            toast.success("Xóa bài viết thành công");
            setPage(1);
            fetchPosts(1, false);
        } catch {
            toast.error("Không thể xóa bài viết");
        } finally {
            setIsDeleteModalOpen(false);
            setDeletePostId(null);
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                <h1>Danh sách bài viết</h1>
                {isAuthenticated && (
                    <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
                        Tạo mới bài viết
                    </Button>
                )}
            </div>

            {posts.length === 0 && !isLoading && <p>Chưa có bài viết nào.</p>}

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

            {isLoading && <p>Đang tải...</p>}
            {!hasMore && <p style={{ textAlign: "center" }}>Đã hết bài viết.</p>}

            {/* Modal Create */}
            <PostModal
                open={isCreateModalVisible}
                onCancel={() => setIsCreateModalVisible(false)}
                onOk={handleCreateSubmit}
                title="Tạo mới bài viết"
            />

            {/* Modal Edit */}
            <PostModal
                open={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                onOk={handleEditSubmit}
                initialValues={editingPost || undefined}
                title="Chỉnh sửa bài viết"
            />

            {/* Modal Delete */}
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
