📝 Dự án Frontend Blog App
📖 Giới thiệu

Đây là ứng dụng Blog (frontend) cho phép người dùng đăng ký, đăng nhập, tạo bài viết, chỉnh sửa và xóa bài viết của mình.
Dự án được xây dựng với React + TypeScript và sử dụng Ant Design để phát triển giao diện người dùng.

Ứng dụng hỗ trợ:

Quản lý tài khoản (đăng ký, đăng nhập, đăng xuất).

CRUD bài viết (Create, Read, Update, Delete).

Phân quyền: chỉ tác giả mới có thể chỉnh sửa hoặc xóa bài viết của mình.

Lazy Loading (Infinite Scroll): tải dần danh sách bài viết khi cuộn xuống cuối trang.

Thông báo (toast) khi thao tác thành công hoặc thất bại.

🚀 Công nghệ sử dụng

React + TypeScript – framework chính.

Redux Toolkit – quản lý state (user, bài viết).

React Router DOM – điều hướng giữa các trang.

Ant Design (antd) – UI components.

React Hot Toast – hiển thị thông báo nhanh, đẹp.

Axios – gọi API backend.

Vite – công cụ build & dev server.

✨ Tính năng chính
🧑 Quản lý tài khoản

Đăng ký tài khoản với validate (email hợp lệ, mật khẩu ≥ 6 ký tự).

Đăng nhập / đăng xuất.

Lưu trạng thái đăng nhập với Redux.

📚 Quản lý bài viết

Xem danh sách tất cả bài viết.

Lọc “Bài viết của tôi” sau khi đăng nhập.

Tạo bài viết mới (yêu cầu đăng nhập).

Chỉnh sửa và xóa bài viết (chỉ tác giả).

Lazy loading (tải thêm bài viết khi cuộn xuống cuối trang).

🎨 UI/UX

Responsive (hiển thị tốt trên mobile & desktop).

Header + Footer rõ ràng.

Modal xác nhận đăng nhập, modal tạo/chỉnh sửa bài viết.

Thông báo toast khi thao tác thành công/thất bại.

Ứng dụng frontend kết nối với backend API (Spring Boot) qua các endpoint:

POST /api/auth/register – Đăng ký

POST /api/auth/login – Đăng nhập

GET /api/posts – Lấy danh sách bài viết (có phân trang)

GET /api/user/posts – Lấy danh sách bài viết của user đang đăng nhập(có phân trang)

POST /api/posts – Tạo bài viết mới

PUT /api/posts – Cập nhật bài viết

DELETE /api/posts/{id} – Xóa bài viết