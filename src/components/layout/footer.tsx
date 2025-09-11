export default function Footer() {
    return (
        <footer
            style={{
                marginTop: "2rem",
                padding: "1rem",
                textAlign: "center",
                borderTop: "1px solid #ddd",
                background: "#f5f5f5",
            }}
        >
            <p>© {new Date().getFullYear()} My Blog App. All rights reserved.</p>
        </footer>
    );
}
