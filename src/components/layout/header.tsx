import { Button, Space, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLogoutAction } from "redux/slice/accountSlice";
import { useState } from "react";

type TFilterType = "all" | "mine";

interface IProps {
    setFilter: (v: TFilterType) => void;
}

export default function Header({ setFilter }: IProps) {
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.account);

    // State để điều khiển modal đăng xuất
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleConfirmLogout = () => {
        dispatch(setLogoutAction(null));
        window.location.assign("/login");
    };

    return (
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
                        isAuthenticated ? setFilter("mine") : window.location.assign("/login")
                    }
                >
                    Bài viết của tôi
                </Button>
            </Space>

            <div>
                {isAuthenticated ? (
                    <>
                        <span style={{ marginRight: 16 }}>
                            Xin chào, <b>{user.name}</b>
                        </span>
                        <Button danger onClick={() => setIsLogoutModalOpen(true)}>
                            Đăng xuất
                        </Button>
                    </>
                ) : (
                    <Button type="primary" onClick={() => window.location.assign("/login")}>
                        Đăng nhập
                    </Button>
                )}
            </div>

            {/* Modal xác nhận đăng xuất */}
            <Modal
                title="Xác nhận đăng xuất"
                open={isLogoutModalOpen}
                onOk={handleConfirmLogout}
                onCancel={() => setIsLogoutModalOpen(false)}
                okText="Đăng xuất"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
            >
                <p>Bạn có chắc chắn muốn đăng xuất không?</p>
            </Modal>
        </header>
    );
}
