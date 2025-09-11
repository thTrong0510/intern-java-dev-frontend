import { Button, Space } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLogoutAction } from "redux/slice/accountSlice";

type TFilterType = "all" | "mine";

interface IProps {
    setFilter: (v: TFilterType) => void;
}

export default function Header({ setFilter }: IProps) {
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.account);

    const handleLogout = () => {
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
                        <Button danger onClick={handleLogout}>
                            Đăng xuất
                        </Button>
                    </>
                ) : (
                    <Button type="primary" onClick={() => window.location.assign("/login")}>
                        Đăng nhập
                    </Button>
                )}
            </div>
        </header>
    );
}
