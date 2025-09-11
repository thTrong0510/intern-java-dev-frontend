import { Modal } from "antd";

interface IRequireLoginModalProps {
    open: boolean;
    onCancel: () => void;
    onOk: () => void;
}

export default function RequireLoginModal({
    open,
    onCancel,
    onOk,
}: IRequireLoginModalProps) {
    return (
        <Modal
            title="Yêu cầu đăng nhập"
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            okText="Đăng nhập"
            cancelText="Hủy"
        >
            <p>Bạn cần đăng nhập để sử dụng chức năng này.</p>
        </Modal>
    );
}
