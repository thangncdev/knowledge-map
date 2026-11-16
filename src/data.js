import { cleanCodeLessons } from './clean-code.js';
import { securityLessons } from './security.js';
import { designPatternLessons } from './design-patterns.js';

export const domains = [
  { id: 'security', icon: '◇', eyebrow: 'NỀN TẢNG', title: 'Bảo mật', description: 'Nhận diện rủi ro và bảo vệ dữ liệu, quyền truy cập.', color: 'mint', stage: 'Bảo vệ từ thiết kế' },
  { id: 'clean_code', icon: '⌁', eyebrow: 'NỀN TẢNG', title: 'Clean Code', description: 'Viết mã rõ ý định, dễ sửa và kiểm chứng.', color: 'blue', stage: 'Làm rõ ý định' },
  { id: 'design_patterns', icon: '▣', eyebrow: 'NỀN TẢNG', title: 'Design Patterns', description: 'Nhận diện giải pháp lặp lại và đánh đổi của chúng.', color: 'peach', stage: 'Chọn cấu trúc phù hợp' },
  { id: 'backend', icon: '⌘', eyebrow: 'XÂY DỰNG HỆ THỐNG', title: 'Backend & API', description: 'Từ một request đến một hệ thống đáng tin cậy.', color: 'blue', stage: 'Kết nối các hệ thống' },
  { id: 'data', icon: '▤', eyebrow: 'XÂY DỰNG HỆ THỐNG', title: 'Dữ liệu', description: 'Mô hình, truy vấn, bảo toàn và khôi phục dữ liệu.', color: 'mint', stage: 'Dữ liệu có ý nghĩa' },
  { id: 'devops', icon: '☁', eyebrow: 'XÂY DỰNG HỆ THỐNG', title: 'DevOps & Cloud', description: 'Triển khai, quan sát và vận hành dịch vụ.', color: 'lavender', stage: 'Vận hành tin cậy' },
  { id: 'system_design', icon: '◎', eyebrow: 'XÂY DỰNG HỆ THỐNG', title: 'System Design', description: 'Thiết kế cho tải, lỗi và thay đổi.', color: 'peach', stage: 'Giải quyết ràng buộc' },
  { id: 'architecture', icon: '▥', eyebrow: 'XÂY DỰNG HỆ THỐNG', title: 'Software Architecture', description: 'Định ranh giới và quyết định chất lượng hệ thống.', color: 'blue', stage: 'Ra quyết định' },
  { id: 'ba', icon: '✳', eyebrow: 'XÂY DỰNG SẢN PHẨM', title: 'Business Analysis (BA)', description: 'Làm rõ vấn đề, quy trình và yêu cầu.', color: 'peach', stage: 'Hiểu vấn đề' },
  { id: 'po', icon: '◈', eyebrow: 'XÂY DỰNG SẢN PHẨM', title: 'Product Ownership (PO)', description: 'Định mục tiêu và sắp xếp backlog có giá trị.', color: 'mint', stage: 'Ưu tiên cùng team' },
  { id: 'product', icon: '✳', eyebrow: 'XÂY DỰNG SẢN PHẨM', title: 'Product Management', description: 'Tìm cơ hội và đánh giá outcome sản phẩm.', color: 'peach', stage: 'Hiểu người dùng' },
  { id: 'project', icon: '▧', eyebrow: 'XÂY DỰNG SẢN PHẨM', title: 'Project Management', description: 'Quản lý phạm vi, nguồn lực, rủi ro và tiến độ.', color: 'blue', stage: 'Điều phối thực hiện' },
  { id: 'ux', icon: '◌', eyebrow: 'XÂY DỰNG SẢN PHẨM', title: 'UX', description: 'Thiết kế luồng tác vụ từ nhu cầu người dùng.', color: 'lavender', stage: 'Thiết kế trải nghiệm' },
  { id: 'ui', icon: '◐', eyebrow: 'XÂY DỰNG SẢN PHẨM', title: 'UI', description: 'Tạo giao diện rõ ràng, nhất quán và thích ứng.', color: 'peach', stage: 'Thiết kế giao diện' },
  { id: 'ai', icon: '✦', eyebrow: 'AI TRONG CÔNG VIỆC', title: 'Nền tảng và vận hành AI', description: 'Dùng AI có ngữ cảnh và biết kiểm chứng.', color: 'lavender', stage: 'Sử dụng có chủ đích' },
  { id: 'ai_roles', icon: '✧', eyebrow: 'AI TRONG CÔNG VIỆC', title: 'AI theo vai trò', description: 'Ứng dụng AI theo trách nhiệm và rủi ro từng vai trò.', color: 'mint', stage: 'Áp dụng vào công việc' },
  { id: 'senior', icon: '✶', eyebrow: 'NĂNG LỰC PHỐI HỢP', title: 'Năng lực senior', description: 'Làm rõ, quyết định, dẫn dắt và xử lý sự cố.', color: 'blue', stage: 'Dẫn dắt hiệu quả' },
];

const legacyNodes = [
  { id: 'foundation.program', domain: 'foundation', order: 1, title: 'Chương trình chạy thế nào?', duration: '6 phút', level: 'Nền tảng', summary: 'Từ mã nguồn đến những bước máy tính thực hiện.', prerequisites: [], related: ['foundation.data', 'backend.http'], sections: [
    ['Hiểu nhanh', 'Một chương trình là tập hợp chỉ dẫn được thực thi trong một môi trường. Mã nguồn cần được diễn giải hoặc chuyển đổi trước khi máy tính có thể chạy. Dữ liệu đi vào, được xử lý, rồi tạo ra kết quả.'],
    ['Vì sao cần hiểu?', 'Khi một tính năng không hoạt động, hãy lần theo ba điểm: đầu vào là gì, bước xử lý nào đã diễn ra, và kết quả thực tế khác mong đợi ở đâu. Cách nghĩ này hữu ích hơn việc đoán lỗi từ giao diện.'],
    ['Dễ hiểu sai', 'Ngôn ngữ lập trình không tự quyết định chương trình nhanh hay chậm. Thuật toán, cách dùng bộ nhớ, I/O và môi trường chạy đều ảnh hưởng đến kết quả.']
  ], takeaway: 'Bạn có thể giải thích đường đi của một dữ liệu từ đầu vào đến đầu ra.' },
  { id: 'foundation.data', domain: 'foundation', order: 2, title: 'Dữ liệu & kiểu dữ liệu', duration: '8 phút', level: 'Nền tảng', summary: 'Biểu diễn thông tin đúng để xử lý đúng.', prerequisites: ['foundation.program'], related: ['foundation.functions', 'backend.api'], sections: [
    ['Hiểu nhanh', 'Kiểu dữ liệu mô tả dạng giá trị và các phép xử lý hợp lệ. Một con số, một đoạn chữ hay một trạng thái đúng/sai phục vụ các mục đích khác nhau.'],
    ['Khi nào cần?', 'Hãy chọn cách biểu diễn dựa trên ý nghĩa của dữ liệu. Mã bưu chính nhìn giống số nhưng thường nên là văn bản: bạn không cộng trừ nó và số 0 ở đầu có thể quan trọng.'],
    ['Dễ hiểu sai', 'Dữ liệu “có vẻ đúng” trên màn hình chưa chắc đúng trong chương trình. Kiểm tra cả kiểu, giá trị thiếu và giới hạn hợp lệ.']
  ], takeaway: 'Bạn biết hỏi một giá trị đại diện cho điều gì trước khi chọn kiểu.' },
  { id: 'foundation.functions', domain: 'foundation', order: 3, title: 'Hàm & chia nhỏ vấn đề', duration: '9 phút', level: 'Nền tảng', summary: 'Tách công việc thành những phần có tên và trách nhiệm rõ.', prerequisites: ['foundation.data'], related: ['backend.api'], sections: [
    ['Hiểu nhanh', 'Hàm gom một phần xử lý có đầu vào và đầu ra rõ ràng. Một tên tốt giúp người khác hiểu ý định mà không phải đọc mọi dòng bên trong.'],
    ['Đánh đổi', 'Tách quá ít khiến logic khó kiểm tra; tách quá nhiều khiến người đọc phải nhảy liên tục giữa các hàm. Tách tại nơi có một trách nhiệm hoặc quy tắc có thể gọi tên.'],
    ['Tự kiểm tra', 'Bạn có thể mô tả một hàm bằng một câu ngắn, nêu được đầu vào, đầu ra và trường hợp lỗi?']
  ], takeaway: 'Bạn biết khi nào nên tách một bước xử lý thành hàm riêng.' },
  { id: 'backend.http', domain: 'backend', order: 1, title: 'Một request HTTP đi đâu?', duration: '7 phút', level: 'Nền tảng', summary: 'Hiểu cuộc trao đổi cơ bản giữa client và server.', prerequisites: ['foundation.program'], related: ['backend.api'], sections: [
    ['Hiểu nhanh', 'Client gửi request gồm phương thức, địa chỉ, header và đôi khi có body. Server xử lý rồi trả response gồm mã trạng thái, header và dữ liệu.'],
    ['Khi nào cần?', 'Khi giao diện báo lỗi, hãy kiểm tra request đã gửi, status trả về và dữ liệu phản hồi. Đây là điểm bắt đầu để phân biệt lỗi kết nối, quyền truy cập và logic nghiệp vụ.'],
    ['Dễ hiểu sai', 'HTTP thành công về mặt kết nối không đồng nghĩa thao tác nghiệp vụ thành công. Cần đọc cả status và nội dung response.']
  ], takeaway: 'Bạn có thể kể lại hành trình của một request và xác định chỗ cần kiểm tra.' },
  { id: 'backend.api', domain: 'backend', order: 2, title: 'Thiết kế một API dễ dùng', duration: '10 phút', level: 'Ứng dụng', summary: 'Biến một nhu cầu thành hợp đồng rõ ràng giữa các hệ thống.', prerequisites: ['backend.http', 'foundation.data'], related: ['product.problem'], sections: [
    ['Hiểu nhanh', 'API là hợp đồng về những thao tác có thể gọi, dữ liệu cần gửi, kết quả nhận được và cách báo lỗi. Người dùng API cần hiểu hợp đồng mà không phải đoán cách server được viết.'],
    ['Đánh đổi', 'Một API quá chung có thể linh hoạt nhưng khó dự đoán. Một API quá đặc thù dễ dùng cho một màn hình nhưng khó tái sử dụng. Bắt đầu từ tác vụ và dữ liệu thật của người dùng.'],
    ['Dễ hiểu sai', 'Tên endpoint đẹp chưa đủ. Trường hợp lỗi, phân trang, quyền truy cập và thay đổi phiên bản cũng là một phần của trải nghiệm API.']
  ], takeaway: 'Bạn có thể nêu đầu vào, đầu ra và lỗi của một thao tác trước khi code.' },
  { id: 'backend.auth', domain: 'backend', order: 3, title: 'Xác thực & phân quyền', duration: '11 phút', level: 'Ứng dụng', summary: 'Biết ai đang gọi và người đó được phép làm gì.', prerequisites: ['backend.api'], related: ['product.needs'], sections: [
    ['Hiểu nhanh', 'Xác thực trả lời “bạn là ai?”. Phân quyền trả lời “bạn được làm gì với tài nguyên này?”. Hai câu hỏi liên quan nhưng cần kiểm tra riêng.'],
    ['Khi nào cần?', 'Mọi thao tác đọc hoặc sửa dữ liệu riêng cần kiểm tra quyền ở phía server. Giao diện ẩn nút chỉ cải thiện trải nghiệm, không bảo vệ dữ liệu.'],
    ['Dễ hiểu sai', 'Đăng nhập thành công không có nghĩa được xem tất cả bản ghi. Quyền có thể phụ thuộc vai trò, chủ sở hữu và ngữ cảnh.']
  ], takeaway: 'Bạn phân biệt được danh tính với quyền trên từng tài nguyên.' },
  { id: 'product.problem', domain: 'product', order: 1, title: 'Xác định đúng vấn đề', duration: '7 phút', level: 'Nền tảng', summary: 'Tách triệu chứng, nhu cầu và giải pháp được đề xuất.', prerequisites: [], related: ['product.needs', 'backend.api'], sections: [
    ['Hiểu nhanh', 'Một yêu cầu tính năng thường là giả thuyết về cách giải quyết vấn đề. Trước khi xây, hãy hỏi ai đang gặp khó khăn, họ cố hoàn thành việc gì và điều gì cản trở.'],
    ['Ví dụ', '“Thêm nút xuất Excel” là giải pháp. Nhu cầu có thể là chia sẻ báo cáo định kỳ với người không dùng hệ thống. Nếu hiểu nhu cầu, ta có thể cân nhắc lịch gửi, link chia sẻ hoặc file tải xuống.'],
    ['Dễ hiểu sai', 'Phỏng vấn không phải để thuyết phục người dùng đồng ý với ý tưởng sẵn có. Hỏi về hành vi gần đây và bằng chứng cụ thể.']
  ], takeaway: 'Bạn viết được vấn đề mà không nhét sẵn giải pháp vào câu.' },
  { id: 'product.needs', domain: 'product', order: 2, title: 'Hiểu nhu cầu người dùng', duration: '9 phút', level: 'Ứng dụng', summary: 'Tìm bằng chứng từ hành vi, ngữ cảnh và trở ngại.', prerequisites: ['product.problem'], related: ['product.priority'], sections: [
    ['Hiểu nhanh', 'Nhu cầu có thể khác điều người dùng yêu cầu trực tiếp. Quan sát công việc thật, hỏi về lần gần nhất họ gặp khó và kiểm tra các cách xoay xở hiện tại.'],
    ['Khi nào cần?', 'Đặc biệt hữu ích khi nhiều bên đưa ra các yêu cầu mâu thuẫn. Bằng chứng về tác vụ và tác động giúp nhóm chọn hướng đi.'],
    ['Dễ hiểu sai', 'Một ý kiến mạnh không đại diện cho mọi người dùng. Ghi rõ bạn đã nghe ai và chỗ nào còn chưa chắc.']
  ], takeaway: 'Bạn biết phân biệt lời nói, hành vi và suy luận của nhóm.' },
  { id: 'product.priority', domain: 'product', order: 3, title: 'Ưu tiên theo giá trị', duration: '8 phút', level: 'Ứng dụng', summary: 'Chọn việc tiếp theo dựa trên tác động và chi phí cơ hội.', prerequisites: ['product.needs'], related: ['ai.evaluate'], sections: [
    ['Hiểu nhanh', 'Ưu tiên là quyết định dùng nguồn lực có giới hạn vào việc có tác động kỳ vọng cao nhất tại thời điểm này. Mỗi lựa chọn đồng thời là quyết định trì hoãn việc khác.'],
    ['Đánh đổi', 'Một việc rất có giá trị nhưng tốn nhiều thời gian có thể nên chia nhỏ để kiểm tra giả định sớm. Một việc dễ làm chưa chắc đáng làm.'],
    ['Tự kiểm tra', 'Bạn có thể giải thích vì sao việc này đứng trên việc khác bằng tác động, độ chắc chắn và chi phí?']
  ], takeaway: 'Bạn đưa ra được lý do ưu tiên có thể kiểm chứng.' },
  { id: 'ai.llm', domain: 'ai', order: 1, title: 'LLM làm được gì, chưa làm được gì?', duration: '8 phút', level: 'Nền tảng', summary: 'Hiểu khả năng tạo câu trả lời và giới hạn cần kiểm chứng.', prerequisites: [], related: ['ai.context'], sections: [
    ['Hiểu nhanh', 'Mô hình ngôn ngữ tạo đầu ra dựa trên mẫu đã học và ngữ cảnh được cung cấp. Nó có thể tổng hợp, soạn thảo và hỗ trợ suy luận, nhưng câu trả lời trôi chảy không tự chứng minh là đúng.'],
    ['Khi nào cần?', 'Dùng AI để khám phá phương án, phác thảo và tăng tốc công việc có thể kiểm tra. Với quyết định quan trọng, cần nguồn đáng tin, tiêu chí đánh giá và người chịu trách nhiệm.'],
    ['Dễ hiểu sai', 'Model, ứng dụng và công cụ được nối vào ứng dụng là các lớp khác nhau. Tính năng của một sản phẩm không mặc nhiên là khả năng sẵn có của model.']
  ], takeaway: 'Bạn biết đặt mức tin cậy phù hợp với từng đầu ra AI.' },
  { id: 'ai.context', domain: 'ai', order: 2, title: 'Cấp ngữ cảnh cho AI', duration: '9 phút', level: 'Ứng dụng', summary: 'Đưa đúng thông tin, mục tiêu và giới hạn vào tác vụ.', prerequisites: ['ai.llm'], related: ['ai.evaluate', 'product.problem'], sections: [
    ['Hiểu nhanh', 'Ngữ cảnh hữu ích gồm mục tiêu, dữ liệu liên quan, ràng buộc, người đọc và tiêu chí hoàn thành. Thêm nhiều tài liệu không luôn tốt hơn; thông tin sai hoặc lạc đề làm kết quả kém đi.'],
    ['Ví dụ', 'Thay vì “viết API”, hãy nêu người gọi, hành vi cần hỗ trợ, dữ liệu mẫu, lỗi cần xử lý và cách bạn sẽ kiểm tra hợp đồng.'],
    ['Dễ hiểu sai', 'Một prompt dài không đảm bảo tốt. Chọn lọc và kiểm tra nguồn của ngữ cảnh quan trọng hơn độ dài.']
  ], takeaway: 'Bạn biết chuẩn bị đầu vào để AI giải đúng vấn đề.' },
  { id: 'ai.evaluate', domain: 'ai', order: 3, title: 'Đánh giá đầu ra AI', duration: '10 phút', level: 'Ứng dụng', summary: 'Kiểm tra kết quả theo tiêu chí, bằng chứng và rủi ro.', prerequisites: ['ai.context'], related: ['product.priority'], sections: [
    ['Hiểu nhanh', 'Đặt tiêu chí trước khi xem kết quả: đúng sự thật, phù hợp mục tiêu, đầy đủ trường hợp quan trọng và có thể kiểm chứng. Kiểm tra bằng nguồn gốc, ví dụ đối chứng hoặc chạy thử khi phù hợp.'],
    ['Đánh đổi', 'Không phải mọi đầu ra cần mức kiểm tra giống nhau. Bản nháp nội bộ có thể xem nhanh; nội dung công khai hay quyết định ảnh hưởng người dùng cần rà kỹ hơn.'],
    ['Tự kiểm tra', 'Nếu AI tự tin nhưng sai, bạn có cách nào phát hiện trước khi sử dụng kết quả?']
  ], takeaway: 'Bạn chọn được cách kiểm chứng tương xứng với rủi ro.' },
];

const outlines = {
  security: ['Mô hình đe dọa và ranh giới tin cậy', 'Danh tính, xác thực và phiên đăng nhập', 'Phân quyền theo hành động và bản ghi', 'Đầu vào, đầu ra và bề mặt tấn công API', 'Secret, mật mã và vòng đời khóa', 'Chuỗi cung ứng và phát triển an toàn', 'Ghi nhận, phát hiện và ứng phó sự cố', 'Kiểm chứng bảo mật và quản trị rủi ro'],
  clean_code: ['Tên, ý định và hàm có trách nhiệm rõ', 'Kiểm soát độ phức tạp và xử lý lỗi', 'Refactoring và đánh đổi của Clean Code'],
  design_patterns: ['Pattern là lời giải cho lực thiết kế', 'Dependency Injection và Strategy', 'Factory, Builder và kiểm soát khởi tạo', 'Adapter, Facade, Decorator và Proxy', 'Observer, Command và State', 'Pattern tại ranh giới hệ thống', 'Chọn pattern và nhận diện áp dụng sai'],
  data: ['Mô hình dữ liệu; SQL; PostgreSQL', 'Index; transaction; migration', 'NoSQL; tìm kiếm; backup và restore'],
  devops: ['Linux; shell; network; container', 'CI/CD; triển khai; IaC; cloud; Kubernetes', 'Logging; metrics; incident; chi phí'],
  system_design: ['Yêu cầu; ước lượng; scale', 'Consistency; reliability; giao tiếp dịch vụ', 'Failure modes và trade-offs'],
  architecture: ['Ranh giới hệ thống; mô hình hóa; patterns', 'C4 và Architecture Decision Records', 'Chất lượng hệ thống; đánh đổi và ra quyết định'],
  ba: ['Stakeholder và khám phá vấn đề', 'Elicitation; quy trình; yêu cầu; mô hình hóa', 'Xác nhận và quản lý thay đổi'],
  po: ['Product Goal và backlog', 'Giá trị; ưu tiên; chia nhỏ công việc', 'Acceptance criteria và phối hợp với team'],
  project: ['Phạm vi; kế hoạch; phụ thuộc', 'Nguồn lực; rủi ro; giao tiếp', 'Theo dõi và điều chỉnh dự án'],
  ux: ['Nghiên cứu người dùng và luồng tác vụ', 'Kiến trúc thông tin; interaction; prototype', 'Usability và accessibility'],
  ui: ['Phân cấp thị giác; bố cục; typography', 'Màu sắc; trạng thái; responsive', 'Component và design system'],
  ai_roles: ['AI cho Developer, BA và PO', 'AI cho Product Manager, Project Manager, UI/UX và QA', 'AI cho DevOps và Software Architect'],
  senior: ['Làm rõ vấn đề mơ hồ; viết và giao tiếp', 'Phản biện; ra quyết định; mentoring', 'Dẫn dắt thay đổi và xử lý sự cố'],
};

const outlineNodes = Object.entries(outlines).flatMap(([domain, stages]) => stages.map((title, index) => ({
  id: `${domain}.${index + 1}`, domain, order: index + 1, title, duration: '5 phút', level: 'Toàn cảnh',
  summary: `Nhận diện các khái niệm chính của ${title.toLowerCase()} và khi nào chúng hữu ích.`,
  prerequisites: index ? [`${domain}.${index}`] : [], related: [],
  sections: [
    ['Hiểu nhanh', `Chặng này giới thiệu ${title.toLowerCase()}. Hãy xác định vấn đề cần giải quyết, các lựa chọn thường gặp và thông tin còn thiếu trước khi đi sâu vào công cụ cụ thể.`],
    ['Khi nào cần?', `Bạn sẽ cần nhóm kiến thức này khi công việc liên quan tới ${domains.find(item => item.id === domain).description.toLowerCase()}`],
    ['Tự kiểm tra', 'Bạn có thể nêu một tình huống thực tế, quyết định cần đưa ra và cách kiểm chứng kết quả không?'],
  ],
  takeaway: `Bạn biết đặt câu hỏi đúng trước khi học sâu về ${title.toLowerCase()}.`,
})));

export const nodes = [...legacyNodes.filter(node => node.domain !== 'foundation').map(node => ({ ...node,
  prerequisites: node.prerequisites.filter(id => !id.startsWith('foundation.')),
  related: node.related.filter(id => !id.startsWith('foundation.')),
})), ...outlineNodes];

export const nodeById = Object.fromEntries(nodes.map(node => [node.id, node]));
export const domainById = Object.fromEntries(domains.map(domain => [domain.id, domain]));

const englishDomains = {
  security: ['Security', 'Identify risks and protect data and access.'], clean_code: ['Clean Code', 'Write code with clear intent that is easy to change.'], design_patterns: ['Design Patterns', 'Recognize recurring solutions and their trade-offs.'], backend: ['Backend & APIs', 'From one request to a reliable system.'], data: ['Data', 'Model, query, preserve, and recover data.'], devops: ['DevOps & Cloud', 'Deploy, observe, and operate services.'], system_design: ['System Design', 'Design for load, failure, and change.'], architecture: ['Software Architecture', 'Define boundaries and system quality decisions.'], ba: ['Business Analysis (BA)', 'Clarify problems, processes, and requirements.'], po: ['Product Ownership (PO)', 'Set goals and prioritize a valuable backlog.'], product: ['Product Management', 'Find opportunities and evaluate outcomes.'], project: ['Project Management', 'Manage scope, resources, risks, and delivery.'], ux: ['UX', 'Design task flows around user needs.'], ui: ['UI', 'Create clear, consistent, adaptable interfaces.'], ai: ['AI Foundations & Operations', 'Use AI with context and verification.'], ai_roles: ['AI by Role', 'Apply AI to the responsibilities of each role.'], senior: ['Senior Skills', 'Clarify, decide, lead, and respond to incidents.'],
};
const englishOutlines = {
  security: ['Threat modeling and trust boundaries', 'Identity, authentication, and sessions', 'Authorization by action and object', 'Inputs, outputs, and API attack surface', 'Secrets, cryptography, and key lifecycle', 'Software supply chain and secure development', 'Logging, detection, and incident response', 'Security verification and risk decisions'],
  clean_code: ['Names, intent, and focused functions', 'Managing complexity and errors', 'Refactoring and Clean Code trade-offs'],
  design_patterns: ['Patterns as responses to design forces', 'Dependency Injection and Strategy', 'Factory, Builder, and object creation', 'Adapter, Facade, Decorator, and Proxy', 'Observer, Command, and State', 'Patterns at system boundaries', 'Choosing patterns and spotting misuse'],
  backend: ['How does an HTTP request travel?', 'Design an API that is easy to use', 'Authentication and authorization'],
  data: ['Data modeling; SQL; PostgreSQL', 'Indexes; transactions; migrations', 'NoSQL; search; backup and restore'],
  devops: ['Linux; shell; networking; containers', 'CI/CD; deployment; IaC; cloud; Kubernetes', 'Logs; metrics; incidents; cost'],
  system_design: ['Requirements; estimation; scale', 'Consistency; reliability; service communication', 'Failure modes and trade-offs'],
  architecture: ['System boundaries; modeling; patterns', 'C4 and Architecture Decision Records', 'System quality, trade-offs, and decisions'],
  ba: ['Stakeholders and problem discovery', 'Elicitation; processes; requirements; modeling', 'Validation and change management'],
  po: ['Product Goal and backlog', 'Value, prioritization, and splitting work', 'Acceptance criteria and team collaboration'],
  product: ['Define the right problem', 'Understand user needs', 'Prioritize by value'],
  project: ['Scope; plans; dependencies', 'Resources; risks; communication', 'Project tracking and adjustment'],
  ux: ['User research and task flows', 'Information architecture; interaction; prototypes', 'Usability and accessibility'],
  ui: ['Visual hierarchy; layout; typography', 'Color; states; responsive design', 'Components and design systems'],
  ai: ['What can an LLM do and where are its limits?', 'Provide useful context to AI', 'Evaluate AI output'],
  ai_roles: ['AI for Developers, BA, and PO', 'AI for Product and Project Managers, UI/UX, and QA', 'AI for DevOps and Software Architects'],
  senior: ['Clarifying ambiguity; writing and communication', 'Critical thinking; decisions; mentoring', 'Leading change and responding to incidents'],
};
const vietnameseDomains = domains.map(domain => ({ ...domain }));
const vietnameseNodes = nodes.map(node => ({ ...node }));
export function setContentLanguage(language) {
  domains.forEach((domain, index) => {
    const original = vietnameseDomains[index];
    Object.assign(domain, original);
    if (language === 'en') {
      domain.title = englishDomains[domain.id][0];
      domain.description = englishDomains[domain.id][1];
      domain.eyebrow = ({ security: 'FOUNDATIONS', clean_code: 'FOUNDATIONS', design_patterns: 'FOUNDATIONS', backend: 'BUILDING SYSTEMS', data: 'BUILDING SYSTEMS', devops: 'BUILDING SYSTEMS', system_design: 'BUILDING SYSTEMS', architecture: 'BUILDING SYSTEMS', ba: 'BUILDING PRODUCTS', po: 'BUILDING PRODUCTS', product: 'BUILDING PRODUCTS', project: 'BUILDING PRODUCTS', ux: 'BUILDING PRODUCTS', ui: 'BUILDING PRODUCTS', ai: 'AI AT WORK', ai_roles: 'AI AT WORK', senior: 'COLLABORATION' })[domain.id];
      domain.stage = 'Explore the essentials';
    }
  });
  nodes.forEach((node, index) => {
    const original = vietnameseNodes[index];
    Object.assign(node, original);
    if (language === 'en') {
      const title = englishOutlines[node.domain][node.order - 1];
      node.title = title;
      node.duration = '5 min';
      node.level = 'Overview';
      node.summary = `Understand the core ideas behind ${title.toLowerCase()} and when they matter.`;
      node.sections = [
        ['In brief', `This stage introduces ${title.toLowerCase()}. Start with the problem it solves, the common choices, and the information you need before selecting a tool.`],
        ['When is it useful?', `Use these ideas when working on ${domainById[node.domain].title}.`],
        ['Check yourself', 'Can you describe a real situation, the decision to make, and how you would verify the result?'],
      ];
      node.takeaway = `You know what to ask before studying ${title.toLowerCase()} in depth.`;
    }
    const lesson = cleanCodeLessons[node.id]?.[language] ?? securityLessons[node.id]?.[language] ?? designPatternLessons[node.id]?.[language];
    if (lesson) Object.assign(node, lesson);
    node.contentStatus = lesson ? 'full' : 'outline';
  });
}
