import express from 'express';
import taskRoute from './routes/taskRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Định vị chính xác tuyệt đối thư mục chứa file server.js (Luôn là ToDoApp/backend/src)
const __filename = fileURLToPath(import.meta.url);
const __srcDir = path.dirname(__filename); 

// 2. Đi tìm file .env bằng đường dẫn tuyệt đối từ file server
// Đi từ src -> lùi 1 cấp ra backend -> lùi 1 cấp ra ToDoApp -> gặp .env
const sharedEnvPath = path.resolve(__srcDir, '../../.env');
dotenv.config({ path: sharedEnvPath });

console.log("🔍 Đang nạp file .env từ đường dẫn thực tế:", sharedEnvPath);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: "http://localhost:5173" }));
}

app.use("/api/tasks", taskRoute);

// 3. 🔥 ĐƯỜNG DẪN DIST TUYỆT ĐỐI (ÉP CHUẨN 100%, KHÔNG PHỤ THUỘC terminal ĐANG ĐỨNG ĐÂU)
// Đi từ src -> lùi 2 cấp ra ToDoApp -> đi vào frontend/dist
const distPath = path.resolve(__srcDir, '../../frontend/dist');

console.log("📂 Server đang phục vụ file tĩnh tại:", distPath);

// Để test local mượt mà, tụi mình mở cho nó chạy luôn ở cả môi trường local
app.use(express.static(distPath));
app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});