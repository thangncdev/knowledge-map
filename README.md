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

- 17 lĩnh vực, 133 mốc theo danh mục hiện hành. Hai mươi chín bài đã có bản chuyên sâu song ngữ: Clean Code, Bảo mật, Design Patterns, Backend & API, bài xác định vấn đề sản phẩm và bài nền tảng LLM. 104 mốc còn lại là dàn ý, được kiểm kê trong [danh mục biên tập](./curriculum.md).
- Roadmap phân nhánh theo phong cách terminal: mở/thu từng lĩnh vực, mở toàn bộ, lọc nhóm, kéo/zoom và minimap. Đường liền biểu thị phân nhánh chủ đề; đường nét đứt thể hiện thứ tự tiền đề.
- Chọn chủ đề để mở bảng xem nhanh, xem tiền đề và kiến thức liên quan, rồi đọc bài ngay trong web. Tiền đề được hiển thị như gợi ý; có thể đọc và tự đánh dấu phần đã biết.
- Mỗi mốc trên map có mức ưu tiên Cốt lõi / Nên học / Mở rộng để định hướng; đây là phân loại biên tập ban đầu và có thể khai báo riêng bằng `importance` trong dữ liệu mốc. Màu theo nhóm lĩnh vực, còn hình và nhãn thể hiện trạng thái học.
- Trong DOC_PREVIEW có thể đánh dấu Đã học, Bỏ qua hoặc bỏ đánh dấu; bấm ra ngoài để đóng và chọn mốc khác để mở lại. Tiến độ lưu bằng `localStorage`, có xuất / nhập JSON kèm bước xem trước.
- Tìm kiếm bằng Ctrl/Cmd + K, hỗ trợ tìm tiếng Việt không dấu và định vị chủ đề trên bản đồ. Quay lại từ bài học giữ vị trí và nhánh đang mở.
- Giao diện có menu mobile và điều khiển bản đồ bằng bàn phím. Bài học có mục lục, bài liên quan và gợi ý tự đào sâu. Bài API minh họa thêm luồng xử lý, request/response và tình huống thực hành.
- Giao diện và nội dung toàn cảnh có tiếng Việt, tiếng Anh; nút EN/VI ghi nhớ lựa chọn trên trình duyệt. Tiến độ dùng cùng ID ở cả hai ngôn ngữ.
- Thanh điều hướng có cây lĩnh vực và chủ đề mở theo từng cấp, có thể ẩn trên desktop. Trang bài học có dark/light mode, nút đánh dấu đã nắm và điều hướng bài trước/bài tiếp theo; các lựa chọn giao diện được ghi nhớ trên trình duyệt.

Dữ liệu map ở [`src/data.js`](./src/data.js); nội dung bài ở [`src/security.js`](./src/security.js), [`src/clean-code.js`](./src/clean-code.js), [`src/design-patterns.js`](./src/design-patterns.js), [`src/backend.js`](./src/backend.js), [`src/product-lessons.js`](./src/product-lessons.js) và [`src/ai-lessons.js`](./src/ai-lessons.js). Các lĩnh vực khác hiện là nội dung toàn cảnh. Danh mục và trạng thái biên tập ở [`curriculum.md`](./curriculum.md); bài viết cần tiếp tục mở rộng và review chuyên môn trước khi coi là bản tham chiếu senior.

## Chuẩn biên soạn bài chuyên sâu

Mỗi lĩnh vực bắt đầu từ các tài liệu gốc, tiêu chuẩn và hướng dẫn được sử dụng rộng rãi, với số nguồn tùy theo phạm vi. Lập danh mục các ý cốt lõi từ mục lục và nội dung nguồn trước khi viết. Roadmap chỉ chứa tên và mô tả ngắn; trang bài học giải thích đủ khái niệm, cơ chế, cách áp dụng và đánh đổi để hỗ trợ quyết định trong công việc senior. Số mốc mỗi lĩnh vực, cấu trúc bài và độ dài từng mục tùy thuộc kiến thức thực tế. Không sao chép nguyên văn tài liệu nguồn.

Với Clean Code, khung ý đối chiếu [*Clean Code*, ấn bản 2](https://www.oreilly.com/library/view/clean-code-a/9780135398586/toc.xhtml), [*Refactoring*, ấn bản 2](https://martinfowler.com/books/refactoring.html) và [Google Engineering Practices](https://google.github.io/eng-practices/review/reviewer/looking-for.html):

| Mốc | Ý cốt lõi |
| --- | --- |
| Tên và hàm | Tên bộc lộ ý định, từ vựng nhất quán, hợp đồng và trách nhiệm của hàm, tác dụng phụ, bình luận, định dạng. |
| Độ phức tạp và lỗi | Luồng quyết định, kết quả và lỗi có nghĩa, dữ liệu và đối tượng, ranh giới phụ thuộc, test theo hành vi. |
| Refactoring | Module có trọng tâm, thiết kế đủ dùng, trùng lặp theo quy tắc, code smell, các phép refactor nhỏ, giữ hành vi và biết khi nào dừng. |

Hai ngôn ngữ phải giữ cùng phạm vi ý, ví dụ và mức chính xác nhưng được biên tập độc lập để tự nhiên với người đọc. Bản tiếng Việt dùng câu rõ, thuật ngữ nhất quán và chỉ giữ từ tiếng Anh khi đó là thuật ngữ nghề nghiệp quen thuộc hoặc dịch ra dễ làm sai nghĩa; không dùng bản dịch máy làm nội dung cuối. Phần nguồn trong bài dẫn đến tài liệu gốc để người đọc có thể đào sâu.
