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

- 4 lĩnh vực, 12 mốc minh họa: Nền tảng lập trình, Backend & API, Tư duy sản phẩm, Làm việc cùng AI.
- Mốc có tiền đề, trạng thái khóa / sẵn sàng / đang học / đã nắm. Bấm mốc khóa để xem tiền đề và đi đến mốc cần học, kể cả ở lĩnh vực khác.
- Tự đánh dấu tiến độ; các mốc phụ thuộc mở ngay khi đủ tiền đề. Tiến độ lưu bằng `localStorage`, có xuất / nhập JSON kèm bước xem trước.
- Roadmap có chế độ danh sách và giao diện mobile. Bài học có mục lục, bài liên quan và gợi ý tự đào sâu.

Dữ liệu mẫu ở [`src/data.js`](./src/data.js). Đây là nội dung phác thảo để duyệt bố cục và luồng, chưa qua quy trình biên tập, kiểm chứng nguồn hoặc mở rộng taxonomy trong plan. Prototype hiện dùng dữ liệu JavaScript tĩnh; bước sau khi duyệt sẽ tách bài ra file nội dung, bổ sung schema, validator và nguồn tham khảo.
