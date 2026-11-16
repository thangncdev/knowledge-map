# Knowledge Map — kế hoạch nội dung và đặc tả triển khai

> Bản đặc tả để giao Codex xây dựng một repository GitHub công khai gồm kiến thức và website học tập. Ngày chốt: 16/11/2026. Các quyết định trong tài liệu này ưu tiên hơn những đề xuất cũ trong hội thoại.

## 1. Mục tiêu và nguyên tắc

Xây một bản đồ kiến thức lập trình, xây dựng sản phẩm và sử dụng AI. Người mới có thể đi từ nền tảng; người đã có kinh nghiệm có thể lướt qua phần quen thuộc và đào sâu chỗ cần thiết. Nội dung phải súc tích, dễ hiểu, đủ rộng, có nguồn chọn lọc và nêu được khi nào một kiến thức có ích, các đánh đổi, điều dễ hiểu sai.

Sản phẩm là một **repo kiến thức công khai**: code web, nội dung, cấu trúc map, ảnh và hướng dẫn đóng góp cùng nằm trong GitHub. Website là cách đọc trực quan của repo. Ưu tiên hiểu bản chất, đặt câu hỏi đúng và đánh giá đầu ra của AI; không đặt trọng tâm vào thuộc cú pháp, lệnh hay bài code tự chấm.

**Quyết định đã chốt:**

- Chỉ có hai kiểu màn hình chính: **Map kiến thức** và **Trang chi tiết kiến thức**. Có thể có cấp và trạng thái con trong hai màn hình này.
- Map là cả điều hướng lẫn lộ trình cá nhân. Không có màn Khám phá hay trang Lộ trình riêng.
- Mốc có quan hệ tiên quyết; mốc khóa vẫn bấm được để giải thích lý do và dẫn tới bài cần học.
- Người dùng tự đánh dấu tiến độ. Không có quiz, trình chạy code hay chứng nhận năng lực.
- Hướng dẫn tự thực hành là phần nội dung tùy chọn trong bài học, thực hiện bên ngoài web.
- Trạng thái học lưu trong `localStorage`; không cần đăng nhập, backend hay database người dùng. Có thể xuất/nhập JSON để chuyển thiết bị và sao lưu.
- Nội dung và quan hệ map lưu trong source, sửa bằng commit/pull request; không cần CMS.
- Chưa triển khai web tại thời điểm viết tài liệu này. Tài liệu phục vụ lượt triển khai sau.

## 2. Đối tượng và cách học

1. Người mới: theo các mốc nền tảng, đọc theo thứ tự và được giải thích tiền đề khi bị khóa.
2. Người đã có kinh nghiệm: đi thẳng tới lĩnh vực cần học, đọc nhanh các mốc cơ bản, tự đánh dấu đã nắm và đi tiếp.
3. Developer muốn mở rộng vai trò: đi ngang qua Backend, DevOps, Architecture, BA, Product, UX và AI bằng các liên kết giữa lĩnh vực.

Tiến độ `đã nắm` là **tự đánh giá**, không phải xác nhận khách quan. Bài học phải đủ tốt để người đọc tự trả lời: khái niệm là gì, khi nào dùng, vì sao chọn phương án này, rủi ro và giới hạn ở đâu.

## 3. Phạm vi bản đồ kiến thức

Taxonomy sau là khung mở rộng. Mỗi dòng là một lĩnh vực/cụm, không phải một bài duy nhất. Cần phân rã thành các chặng và mốc nhỏ trước khi viết nội dung hàng loạt.

| Khối | Lĩnh vực | Các cụm chủ đề ban đầu |
| --- | --- | --- |
| Nền tảng | Nhập môn lập trình | Chương trình chạy thế nào; dữ liệu và kiểu; điều khiển luồng; hàm; debug; terminal; Git |
| Nền tảng | Khoa học máy tính | Cấu trúc dữ liệu; thuật toán và độ phức tạp; bộ nhớ; hệ điều hành; tiến trình/luồng; mạng; HTTP/DNS/TLS |
| Nền tảng | Kỹ nghệ phần mềm | Thiết kế module; refactoring; testing; code review; quản lý phụ thuộc; tài liệu; cộng tác |
| Nền tảng | Bảo mật | Threat modeling; phân quyền; secret; bảo mật ứng dụng/API; chuỗi cung ứng; nguyên lý mật mã cần thiết |
| Xây dựng hệ thống | Web/frontend | HTML/CSS; JavaScript/TypeScript; trình duyệt; React; state; accessibility; hiệu năng |
| Xây dựng hệ thống | Mobile | Android/iOS; lifecycle; React Native; Flutter; kiến trúc; state/navigation; offline; performance; native integration; test; phát hành |
| Xây dựng hệ thống | Backend/API | Thiết kế API; auth; xử lý đồng thời; cache; queue; background jobs; rate limit; observability; performance |
| Xây dựng hệ thống | Dữ liệu | Mô hình dữ liệu; SQL; index; transaction; migration; PostgreSQL; NoSQL; tìm kiếm; backup/restore |
| Xây dựng hệ thống | DevOps/cloud | Linux; shell; network; container; CI/CD; triển khai; IaC; cloud; Kubernetes; logging/metrics; incident; chi phí |
| Xây dựng hệ thống | System design | Yêu cầu; ước lượng; scale; consistency; reliability; giao tiếp dịch vụ; failure modes; trade-offs |
| Xây dựng hệ thống | Software Architecture | Ranh giới hệ thống; mô hình hóa; patterns; C4; ADR; chất lượng hệ thống; đánh đổi và ra quyết định |
| Xây dựng sản phẩm | Business Analysis (BA) | Stakeholder; khám phá vấn đề; elicitation; quy trình; yêu cầu; mô hình hóa; xác nhận; thay đổi |
| Xây dựng sản phẩm | Product Ownership (PO) | Product Goal; backlog; giá trị; ưu tiên; chia nhỏ; acceptance criteria; phối hợp với team |
| Xây dựng sản phẩm | Product Management | Người dùng/thị trường; discovery; chiến lược; định vị; roadmap; chỉ số; đánh giá outcome |
| Xây dựng sản phẩm | Project Management | Phạm vi; kế hoạch; phụ thuộc; nguồn lực; rủi ro; giao tiếp; theo dõi và điều chỉnh |
| Xây dựng sản phẩm | UX | Nghiên cứu người dùng; luồng tác vụ; kiến trúc thông tin; interaction; prototype; usability; accessibility |
| Xây dựng sản phẩm | UI | Phân cấp thị giác; bố cục; typography; màu; trạng thái; responsive; component; design system |
| AI trong công việc | Nền tảng và vận hành AI | LLM/token/context; model so với sản phẩm; giới hạn; chọn công cụ; cấp ngữ cảnh; tài liệu/RAG/memory; agent; nhiều agent; plugin/app/MCP/skill; workflow/automation; đánh giá; bảo mật/chi phí |
| AI trong công việc | AI theo vai trò | Developer; BA; PO; Product/Project Manager; UI/UX; QA; DevOps; Software Architect |
| Năng lực phối hợp | Năng lực senior | Làm rõ vấn đề mơ hồ; viết và giao tiếp; phản biện; ra quyết định; mentoring; dẫn dắt thay đổi; xử lý sự cố |

`PM` phải được ghi rõ là **Product Manager** hoặc **Project Manager**; không gom chung. Các lĩnh vực có thể mở rộng sau này mà không đổi cấu trúc dữ liệu.

### Riêng nhánh AI

Chia tối thiểu thành: (1) AI hoạt động và giới hạn; (2) chọn, so sánh và sử dụng công cụ cụ thể; (3) prompt/context engineering; (4) tài liệu và tri thức riêng; (5) AI coding; (6) agent và multi-agent; (7) plugin/app/connector, MCP, skill; (8) workflow/automation; (9) đánh giá kết quả; (10) dữ liệu, quyền, chi phí và rủi ro; (11) ứng dụng theo vai trò.

Giải thích bằng tình huống: lúc nào một agent đủ, lúc nào có thể chia các việc độc lập cho nhiều agent, cách phối hợp nếu sửa cùng repo, cách kiểm tra đầu ra và xử lý mâu thuẫn. Phân biệt kiến thức bền vững với hướng dẫn thao tác theo phiên bản sản phẩm; phần thao tác cần ngày rà soát. Không biến chương AI thành bộ sưu tập prompt mẫu.

## 4. Chiến lược biên tập và chất lượng

**Không viết toàn bộ bài học trong một lượt.** Làm tuần tự:

1. Xây taxonomy đầy đủ đến cấp chặng/mốc; rà lỗ hổng và mục trùng.
2. Gắn `prerequisites`, liên kết liên quan, độ sâu, ưu tiên và nguồn gốc cho từng mốc.
3. Viết một lát cắt mẫu hoàn chỉnh gồm nền tảng, một chủ đề kỹ thuật, một chủ đề sản phẩm và AI.
4. Review chất lượng mẫu, chỉnh template và schema, rồi mở rộng từng cụm.
5. Rà định kỳ liên kết, kiến thức dễ thay đổi và các bài bị phản hồi.

Ba mức biên tập: **bản đồ** (metadata/mô tả một câu), **nắm vững** (giải thích đủ ra quyết định), **đào sâu** (cơ chế, so sánh, đánh đổi, tình huống). Không ép mọi mốc có độ dài như nhau.

Template bài học:

1. Mục tiêu: đọc xong cần hiểu và quyết định được gì.
2. Hiểu nhanh: định nghĩa dễ hiểu và ví dụ trong vài phút.
3. Giải thích: nguyên lý và mối liên hệ với tiền đề.
4. Khi nào cần, khi nào không; các lựa chọn và đánh đổi.
5. Hiểu lầm thường gặp; dấu hiệu người đọc thực sự hiểu.
6. Ứng dụng với AI trong công việc, nếu phù hợp.
7. Tự đào sâu/tự thực hành bên ngoài web, **tùy chọn**.
8. Nguồn gốc chọn lọc và bài liên quan.

Quy tắc review: câu chữ tự viết; nguồn trực tiếp hỗ trợ luận điểm; phân biệt sự kiện với nhận định; ví dụ không xuyên tạc; có cấp độ cho người mới; chỗ quan trọng đủ sâu; không dạy thuộc cú pháp; ưu tiên tài liệu chính thức/chuẩn/tác giả gốc; nguồn blog cá nhân ghi rõ là góc nhìn thực tế. Không sao chép dài nội dung bên thứ ba.

## 5. Trải nghiệm web: chỉ hai kiểu màn hình

### A. Map kiến thức

- Trang chính là map kiểu hành trình game, các mốc và đường đi rõ ràng, thiết kế gọn, không cần hiệu ứng phức tạp.
- Cấp toàn cảnh: các vùng lĩnh vực. Bấm vùng để chuyển tới map lĩnh vực; vẫn là cùng loại màn hình map.
- Cấp lĩnh vực: các chặng và mốc theo thứ tự. Hiển thị một vùng/chặng vừa đủ trên viewport, tránh canvas khổng lồ.
- Trạng thái mốc: `locked`, `available`, `in_progress`, `mastered`. Mốc đã nắm có dấu rõ; mốc đang học nổi bật; đường mở khóa phản ánh tiến độ.
- Bấm mốc khóa hiện panel giải thích **tên và lý do của từng tiền đề chưa đạt**, có nút đi tới mốc đó. Đường dẫn qua lĩnh vực khác cũng hoạt động.
- Chỉ tiền đề thật sự bắt buộc mới khóa. Kiến thức đọc thêm nằm ở `related`, không khóa.
- Map chính là lộ trình cá nhân; không có trang tiến độ riêng. Cho phép quay lại mốc cũ và nhìn thấy chặng tiếp theo.
- Mobile: đường đi dọc/cuộn, nút đủ lớn; desktop: map theo chặng. Có phương án danh sách điều hướng tương đương cho accessibility và khi map khó xem.

### B. Trang chi tiết kiến thức

- Tập trung đọc, hiển thị breadcrumb, trạng thái, tiền đề, nội dung và nguồn.
- Mục lục nhỏ cho bài dài; phần đào sâu có thể thu gọn. Không chôn nội dung thiết yếu trong phần thu gọn.
- Hành động chính: `Bắt đầu/Đang học`, `Đánh dấu đã nắm`, `Mốc tiếp theo`, `Quay về map`.
- Link bài liên quan và nguồn học ở cuối hoặc bên cạnh; tự thực hành chỉ là gợi ý văn bản.
- Khi mốc được đánh dấu đã nắm, các mốc phụ thuộc lập tức được mở khóa trong trạng thái cục bộ.

Không tạo màn Khám phá, Lộ trình riêng, quiz, code runner, bài nộp, hệ thống điểm/xếp hạng. Có thể có các thành phần con như panel khóa, mục lục bài, hộp xuất/nhập tiến độ trong hai màn chính.

## 6. Mô hình dữ liệu cho source

Nội dung độc lập với hình vẽ. Gợi ý cấu trúc một repository:

```text
knowledge-map/
├── content/             # Bài Markdown/MDX theo lĩnh vực
├── maps/                # Cấu trúc vùng/chặng, thứ tự, đường nối và layout
├── public/assets/       # Ảnh và minh họa được phép dùng
├── src/                 # Giao diện hai màn hình và logic tiến độ
├── scripts/             # Kiểm tra schema, graph, liên kết
├── README.md
├── CONTRIBUTING.md
└── LICENSE*             # Quyền sử dụng code/nội dung rõ ràng
```

Ví dụ metadata của một mốc (tên trường có thể tinh chỉnh khi triển khai nhưng giữ ngữ nghĩa):

```yaml
id: ai.context-window
slug: context-window
title: Context window là gì?
domain: ai
stage: foundations
level: foundation
depth: deep
summary: Lượng ngữ cảnh model có thể dùng trong một lượt làm việc.
prerequisites: [ai.tokens]
related: [ai.memory, ai.rag, ai.context-engineering]
order: 20
status: reviewed
reviewed_at: 2026-11-16
sources:
  - title: Tài liệu chính thức
    url: https://example.org/reference
    kind: official
```

- `id` ổn định và không phụ thuộc tên file, vị trí map hoặc tiêu đề. Không đổi ID khi sửa tên bài; nếu buộc đổi, có migration/alias cho tiến độ cũ.
- `domain`, `stage`, `order` và dữ liệu trong `maps/` quyết định điều hướng, không dựa duy nhất vào thứ tự folder.
- `prerequisites` là điều kiện khóa; `related` chỉ là gợi ý. Kiểm tra graph không có vòng lặp tiên quyết, ID lạ hoặc mốc không thể tiếp cận.
- Một bài gốc có thể được liên kết từ nhiều lĩnh vực/lộ trình, tránh nhân bản nội dung.
- Nguồn có URL, loại, ghi chú chọn lọc và ngày kiểm tra khi cần; tránh URL có tracking parameter.
- Dữ liệu bài có schema và được validate khi build. Tài liệu có thể dựng trang tĩnh bằng Astro hoặc công cụ tương đương; quyết định framework khi triển khai, không để framework quyết định taxonomy.

### Tiến độ trong trình duyệt

Lưu một object phiên bản hóa trong `localStorage`, ví dụ:

```json
{
  "schemaVersion": 1,
  "nodes": {
    "ai.tokens": { "status": "mastered", "updatedAt": "2026-11-16T00:00:00.000Z" },
    "ai.context-window": { "status": "in_progress", "updatedAt": "2026-11-16T00:00:00.000Z" }
  }
}
```

`locked` và `available` nên **tính từ graph và các mốc `mastered`**, không lưu thành trạng thái riêng để tránh dữ liệu lệch. Tiến độ phải chịu được mốc mới thêm, ID lạ trong bản xuất cũ và dữ liệu lưu bị lỗi. Có chức năng xuất/nhập JSON, xem trước số mốc trước khi nhập và cách xử lý xung đột rõ ràng. Không có tự đồng bộ giữa thiết bị. Không lưu dữ liệu nhạy cảm.

## 7. GitHub và xuất bản

Một repo public là nguồn duy nhất cho code, bài học, metadata và assets. Pull request dùng để sửa/đóng góp. CI kiểm tra schema, graph, link nội bộ và build; sau khi merge vào nhánh chính, GitHub Actions xuất bản site tĩnh lên GitHub Pages. Có `README` giải thích mục đích, cách chạy, cách thêm mốc và cấu trúc; `CONTRIBUTING` nêu tiêu chuẩn bài viết và quy trình review. Chọn giấy phép phù hợp và rõ ràng cho code cũng như nội dung; tài liệu ngoài chỉ dẫn nguồn và tóm tắt bằng lời của dự án.

## 8. Trình tự giao Codex triển khai

### Giai đoạn 1 — nền dữ liệu và thiết kế nội dung

- Tạo taxonomy đến cấp chặng/mốc, schema, template bài, nguồn ban đầu và graph tiền đề.
- Viết một lát cắt bài mẫu đủ tiêu biểu; review nội dung trước khi mở rộng số lượng.
- Tạo validator cho ID, tiền đề, chu trình, nguồn và liên kết nội bộ.

### Giai đoạn 2 — web tối giản nhưng hoàn chỉnh

- Dựng map toàn cảnh/map lĩnh vực và trang chi tiết từ chính dữ liệu trên.
- Thực hiện khóa, panel giải thích, điều hướng tới tiền đề, đánh dấu đã nắm, tự mở khóa.
- Lưu tiến độ `localStorage`, xuất/nhập JSON, giao diện desktop/mobile và điều hướng bàn phím.
- Kiểm tra trực tiếp các luồng bấm, quay lại, reload, mốc khóa, nhập dữ liệu lỗi; build và publish thử.

### Giai đoạn 3 — mở rộng nội dung theo cụm

- Mở rộng từng lĩnh vực, ưu tiên phần nền tảng dùng chung và các đường học có đầu-cuối rõ.
- Mỗi cụm qua review nguồn, độ chính xác, dễ hiểu, trùng lặp, điều kiện tiên quyết, rồi mới merge.
- Rà định kỳ nội dung về công cụ AI và công nghệ thay đổi nhanh.

**Tiêu chí hoàn thành giai đoạn 2:** repo public có thể chạy và xuất bản; hai kiểu màn hình hoạt động; người mới thấy lối đi; người có kinh nghiệm bỏ qua mốc đã biết; mốc khóa giải thích và dẫn đúng tiền đề; reload giữ tiến độ; nội dung từ file trong repo hiển thị đúng; mobile dùng được; không có backend hoặc quiz.

## 9. Phân công ChatGPT và Codex cho phần nội dung

Không nên giao một lệnh “viết toàn bộ kiến thức” cho bên nào. Quy trình đề xuất:

- **ChatGPT trong hội thoại:** cùng người chủ dự án chốt taxonomy, độ sâu, giọng văn, tiêu chí bài học, nguồn và review các bài mẫu. Phù hợp với việc tranh luận, sửa góc nhìn và kiểm tra người mới có hiểu hay không.
- **Codex trong repo:** tạo file theo schema, dựng graph, biên tập theo template đã chốt, kiểm tra ID/link/trùng lặp, chạy build và quản lý pull request. Có thể giao từng cụm nhỏ với nguồn xác định và yêu cầu báo chỗ chưa chắc.
- **Người chủ dự án:** duyệt các quyết định biên tập quan trọng, mốc bắt buộc và các bài chuyên sâu. AI hỗ trợ soạn và rà, nhưng không tự chứng nhận tính đúng của toàn bộ chương trình học.

Quy trình cho mỗi cụm: chốt outline và nguồn → soạn vài bài → review sự chính xác/dễ hiểu → đưa vào repo → validate graph và build → mở rộng. Nội dung trong repo là bản chính sau khi được duyệt; trao đổi trong chat là nơi chuẩn bị và phản biện.

## 10. Nguồn khởi đầu đã thảo luận

Danh sách này là đầu vào để tuyển chọn theo từng mốc, không nhập nguyên một kho liên kết vào bài học:

- Tổng quan: [Bài tổng hợp của Caleb](https://devhub.vercel.app/blog/top-15-amazing-github-repos), [roadmap.sh](https://roadmap.sh/), [OSSU Computer Science](https://github.com/ossu/computer-science), [MDN Curriculum](https://developer.mozilla.org/en-US/curriculum/), [Build Your Own X](https://github.com/codecrafters-io/build-your-own-x).
- Mobile: [React Native docs](https://reactnative.dev/docs/getting-started), [Flutter architecture](https://docs.flutter.dev/app-architecture/guide), [Android app architecture](https://developer.android.com/topic/architecture).
- Backend/data/security: [PostgreSQL docs](https://www.postgresql.org/docs/current/), [OWASP API Security](https://api-security.owasp.org/).
- DevOps/architecture: [Docker Learn](https://docs.docker.com/learn/), [GitHub Actions](https://docs.github.com/en/actions), [Google SRE Workbook](https://sre.google/workbook/table-of-contents/), [AWS Well-Architected](https://aws.amazon.com/architecture/well-architected/), [C4](https://c4model.com/), [ADR](https://martinfowler.com/bliki/ArchitectureDecisionRecord.html), [System Design Primer](https://github.com/donnemartin/system-design-primer).
- BA/Product/UI/UX: [IIBA BABOK](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/), [Scrum Guide](https://scrumguides.org/scrum-guide.html), [PMI standards](https://www.pmi.org/standards), [NN/g UX](https://www.nngroup.com/articles/ux-basics-study-guide/), [W3C WAI](https://www.w3.org/WAI/tutorials/), [AI4BA](https://ai4ba.com/), [Hoàng Phan Blog](https://hoangphan.blog/).
- AI/agent: [Google LLM introduction](https://developers.google.com/machine-learning/crash-course/llm), [NIST Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence), [OpenAI agents](https://developers.openai.com/api/docs/guides/agents), [MCP](https://modelcontextprotocol.io/).

Đường dẫn gốc của bài Caleb (`caleb.is-a.dev/blog/amazing-github-repos`) chưa đọc được trong lượt khảo sát trước; bản DevHub ở trên có cùng tác giả và chủ đề, nhưng cần đối chiếu nếu dùng trích dẫn cụ thể. Mọi nguồn phải được kiểm tra lại tại thời điểm viết bài.
