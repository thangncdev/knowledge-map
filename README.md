# Knowledge Map — bản mẫu giao diện

Prototype để duyệt hướng thiết kế trước khi triển khai đầy đủ theo [kế hoạch](./knowledge-map-plan.md). Giao diện theo phong cách công cụ developer, với đúng hai kiểu màn hình chính: **Roadmap** (toàn cảnh và từng nhánh lĩnh vực) và **chi tiết mốc kiến thức**. Panel tiền đề và hộp xuất/nhập tiến độ là thành phần phụ trong hai màn hình này.

**Website:** https://thangncdev.github.io/knowledge-map/

## Triển khai bằng GitHub Pages

Workflow [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) kiểm tra ID, tham chiếu và vòng lặp tiền đề, dựng `dist/`, rồi deploy lên GitHub Pages khi push vào `main`. Pull request chỉ chạy kiểm tra và build, không xuất bản. Xem trạng thái tại [GitHub Actions](https://github.com/thangncdev/knowledge-map/actions).

Build thủ công: `node scripts/validate.mjs && node scripts/build.mjs`. Website dùng đường dẫn asset tương đối và hash route nên hoạt động dưới đường dẫn con của GitHub Pages.

## Xem trên máy

```sh
python3 -m http.server 4173
```

Mở `http://localhost:4173`. Không cần cài package hay chạy build.

## Nội dung và tương tác mẫu

- 17 lĩnh vực, 51 mốc theo danh mục hiện hành; ba mốc Clean Code đã có bài đầy đủ bằng tiếng Việt và tiếng Anh, các mốc còn lại ở mức toàn cảnh.
- Roadmap phân nhánh theo phong cách terminal: mở/thu từng lĩnh vực, mở toàn bộ, lọc nhóm, kéo/zoom và minimap. Đường liền biểu thị phân nhánh chủ đề; đường nét đứt thể hiện thứ tự tiền đề.
- Chọn chủ đề để mở bảng xem nhanh, xem tiền đề và kiến thức liên quan, rồi đọc bài ngay trong web. Tiền đề được hiển thị như gợi ý; có thể đọc và tự đánh dấu phần đã biết.
- Tự đánh dấu tiến độ đang học / đã nắm. Tiến độ lưu bằng `localStorage`, có xuất / nhập JSON kèm bước xem trước.
- Tìm kiếm bằng Ctrl/Cmd + K, hỗ trợ tìm tiếng Việt không dấu và định vị chủ đề trên bản đồ. Quay lại từ bài học giữ vị trí và nhánh đang mở.
- Giao diện có menu mobile và điều khiển bản đồ bằng bàn phím. Bài học có mục lục, bài liên quan và gợi ý tự đào sâu. Bài API minh họa thêm luồng xử lý, request/response và tình huống thực hành.
- Giao diện và nội dung toàn cảnh có tiếng Việt, tiếng Anh; nút EN/VI ghi nhớ lựa chọn trên trình duyệt. Tiến độ dùng cùng ID ở cả hai ngôn ngữ.

Dữ liệu map ở [`src/data.js`](./src/data.js); bài mẫu Clean Code ở [`src/clean-code.js`](./src/clean-code.js). Các lĩnh vực khác hiện là nội dung toàn cảnh để chọn hướng đào sâu. Bài Clean Code đã gắn nguồn chọn lọc, nhưng vẫn cần review biên tập trước khi coi là bản cuối.
