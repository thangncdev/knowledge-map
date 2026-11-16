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

- 17 lĩnh vực, 60 mốc theo danh mục hiện hành; tám bài Bảo mật, ba bài Clean Code và bảy bài Design Patterns đã có nội dung chuyên sâu bằng tiếng Việt và tiếng Anh. Các mốc còn lại ở mức định hướng, được kiểm kê trong [danh mục biên tập](./curriculum.md).
- Roadmap phân nhánh theo phong cách terminal: mở/thu từng lĩnh vực, mở toàn bộ, lọc nhóm, kéo/zoom và minimap. Đường liền biểu thị phân nhánh chủ đề; đường nét đứt thể hiện thứ tự tiền đề.
- Chọn chủ đề để mở bảng xem nhanh, xem tiền đề và kiến thức liên quan, rồi đọc bài ngay trong web. Tiền đề được hiển thị như gợi ý; có thể đọc và tự đánh dấu phần đã biết.
- Mỗi mốc trên map có mức ưu tiên Cốt lõi / Nên học / Mở rộng để định hướng; đây là phân loại biên tập ban đầu và có thể khai báo riêng bằng `importance` trong dữ liệu mốc. Màu theo nhóm lĩnh vực, còn hình và nhãn thể hiện trạng thái học.
- Trong DOC_PREVIEW có thể đánh dấu Đã học, Bỏ qua hoặc bỏ đánh dấu; bấm ra ngoài để đóng và chọn mốc khác để mở lại. Tiến độ lưu bằng `localStorage`, có xuất / nhập JSON kèm bước xem trước.
- Tìm kiếm bằng Ctrl/Cmd + K, hỗ trợ tìm tiếng Việt không dấu và định vị chủ đề trên bản đồ. Quay lại từ bài học giữ vị trí và nhánh đang mở.
- Giao diện có menu mobile và điều khiển bản đồ bằng bàn phím. Bài học có mục lục, bài liên quan và gợi ý tự đào sâu. Bài API minh họa thêm luồng xử lý, request/response và tình huống thực hành.
- Giao diện và nội dung toàn cảnh có tiếng Việt, tiếng Anh; nút EN/VI ghi nhớ lựa chọn trên trình duyệt. Tiến độ dùng cùng ID ở cả hai ngôn ngữ.

Dữ liệu map ở [`src/data.js`](./src/data.js); bài chuyên sâu ở [`src/security.js`](./src/security.js), [`src/clean-code.js`](./src/clean-code.js) và [`src/design-patterns.js`](./src/design-patterns.js). Các lĩnh vực khác hiện là nội dung toàn cảnh. Danh mục và trạng thái biên tập ở [`curriculum.md`](./curriculum.md); bài viết vẫn cần review của người có chuyên môn trước khi coi là bản tham chiếu cuối.

## Chuẩn biên soạn bài chuyên sâu

Mỗi lĩnh vực bắt đầu từ các tài liệu gốc, tiêu chuẩn và hướng dẫn được sử dụng rộng rãi, với số nguồn tùy theo phạm vi. Lập danh mục các ý cốt lõi từ mục lục và nội dung nguồn trước khi viết. Roadmap chỉ chứa tên và mô tả ngắn; trang bài học giải thích đủ khái niệm, cơ chế, cách áp dụng và đánh đổi để hỗ trợ quyết định trong công việc senior. Số mốc mỗi lĩnh vực, cấu trúc bài và độ dài từng mục tùy thuộc kiến thức thực tế. Không sao chép nguyên văn tài liệu nguồn.

Với Clean Code, khung ý đối chiếu [*Clean Code*, ấn bản 2](https://www.oreilly.com/library/view/clean-code-a/9780135398586/toc.xhtml), [*Refactoring*, ấn bản 2](https://martinfowler.com/books/refactoring.html) và [Google Engineering Practices](https://google.github.io/eng-practices/review/reviewer/looking-for.html):

| Mốc | Ý cốt lõi |
| --- | --- |
| Tên và hàm | Tên bộc lộ ý định, từ vựng nhất quán, hợp đồng và trách nhiệm của hàm, tác dụng phụ, bình luận, định dạng. |
| Độ phức tạp và lỗi | Luồng quyết định, kết quả và lỗi có nghĩa, dữ liệu và đối tượng, ranh giới phụ thuộc, test theo hành vi. |
| Refactoring | Module có trọng tâm, thiết kế đủ dùng, trùng lặp theo quy tắc, code smell, các phép refactor nhỏ, giữ hành vi và biết khi nào dừng. |

Mỗi bản dịch tiếng Anh phải giữ cùng phạm vi ý và ví dụ với bản tiếng Việt. Phần nguồn trong bài dẫn đến tài liệu gốc để người đọc có thể đào sâu.
