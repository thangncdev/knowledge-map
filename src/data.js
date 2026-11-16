export const domains = [
  { id: 'foundation', icon: '◇', eyebrow: '01 / NỀN TẢNG', title: 'Nền tảng lập trình', description: 'Hiểu chương trình, dữ liệu và cách chia nhỏ vấn đề.', color: 'mint', stage: 'Bắt đầu từ bản chất' },
  { id: 'backend', icon: '⌘', eyebrow: '02 / XÂY DỰNG HỆ THỐNG', title: 'Backend & API', description: 'Từ một request đến một hệ thống đáng tin cậy.', color: 'blue', stage: 'Kết nối các hệ thống' },
  { id: 'product', icon: '✳', eyebrow: '03 / XÂY DỰNG SẢN PHẨM', title: 'Tư duy sản phẩm', description: 'Tìm đúng vấn đề trước khi chọn giải pháp.', color: 'peach', stage: 'Hiểu người dùng' },
  { id: 'ai', icon: '✦', eyebrow: '04 / AI TRONG CÔNG VIỆC', title: 'Làm việc cùng AI', description: 'Dùng AI có mục đích, có ngữ cảnh và biết kiểm chứng.', color: 'lavender', stage: 'Sử dụng có chủ đích' },
];

export const nodes = [
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

export const nodeById = Object.fromEntries(nodes.map(node => [node.id, node]));
export const domainById = Object.fromEntries(domains.map(domain => [domain.id, domain]));
