export const interfaceText = {
  'Điều hướng chính': 'Main navigation', 'Về roadmap tổng quan': 'Back to roadmap overview', 'Đóng menu': 'Close menu', 'Mở menu': 'Open menu',
  'Tiến độ lưu trên trình duyệt của bạn.': 'Progress is saved in this browser.', 'Tiến độ': 'Progress',
  'Khám phá 17 lĩnh vực về kỹ thuật, sản phẩm, AI và năng lực phối hợp. Chọn nhánh cần tìm hiểu rồi đi sâu theo nhu cầu của bạn.': 'Explore 17 domains across engineering, product, AI, and collaboration. Choose a path and go deeper where it matters to you.',
  'chọn lĩnh vực bên dưới để bắt đầu': 'choose a domain below to begin', 'lĩnh vực': 'domains', 'mốc kiến thức': 'knowledge milestones', 'đã nắm': 'mastered',
  'Mỗi mốc chỉ khóa khi có tiền đề thật sự bắt buộc.': 'A milestone is locked only when it has a required prerequisite.',
  'Chọn nhánh để khám phá': 'Choose a path to explore', 'Mở nhánh roadmap': 'Open roadmap path', 'Học theo nhịp của bạn.': 'Learn at your own pace.',
  'Đọc mốc đã mở, tự đánh dấu phần quen thuộc và quay lại bất cứ lúc nào.': 'Read unlocked milestones, mark what you already know, and return whenever you like.',
  'Ba mốc minh họa thứ tự học và những tiền đề cần thiết.': 'Three milestones show the suggested order and required prerequisites.',
  'GỢI Ý TIẾP THEO': 'SUGGESTED NEXT', 'Bạn đã hoàn thành chặng này': 'You have completed this stage',
  'Mốc này cần tiền đề từ lĩnh vực khác. Mở mốc để xem đường đi phù hợp.': 'This milestone needs a prerequisite from another domain. Open it to see the path.',
  'Bạn có thể quay lại các mốc bất cứ lúc nào.': 'You can revisit any milestone at any time.', 'Xem tiền đề': 'View prerequisites', 'Đi tới mốc': 'Go to milestone', 'Xem toàn cảnh': 'View overview',
  'Trạng thái mốc': 'Milestone status', 'Mốc chưa mở vẫn có thể bấm để xem tiền đề cần học.': 'You can open a locked milestone to see what to learn first.',
  'Chưa mở': 'Locked', 'Sẵn sàng': 'Available', 'Đang học': 'In progress', 'Đã nắm': 'Mastered',
  'SAU BÀI NÀY, BẠN CÓ THỂ': 'AFTER THIS LESSON, YOU CAN', 'Tự đào sâu': 'Explore further',
  'Thử giải thích khái niệm này cho một đồng nghiệp bằng ví dụ từ công việc của bạn. Ghi lại câu hỏi nào bạn chưa trả lời chắc chắn.': 'Explain this concept to a colleague using an example from your work. Note any question you cannot answer confidently yet.',
  'Xem tiền đề cần học': 'View prerequisites', 'Đã nắm · Bỏ đánh dấu': 'Mastered · Remove mark', 'Đánh dấu đã nắm': 'Mark as mastered', 'Bắt đầu học': 'Start learning', 'Quay về roadmap': 'Back to roadmap',
  'MỐC TIẾP THEO': 'NEXT MILESTONE', 'TRONG BÀI NÀY': 'IN THIS LESSON', 'TIỀN ĐỀ': 'PREREQUISITES', 'Mốc khởi đầu, không có tiền đề bắt buộc.': 'Starting milestone with no required prerequisites.', 'KHÁM PHÁ THÊM': 'EXPLORE MORE',
  'DỮ LIỆU CỦA BẠN': 'YOUR DATA', 'Tiến độ học tập': 'Learning progress',
  'Tiến độ chỉ lưu trên trình duyệt hiện tại. Xuất file JSON để sao lưu hoặc chuyển sang thiết bị khác.': 'Progress is stored only in this browser. Export a JSON file to back it up or move it to another device.',
  'Xuất JSON': 'Export JSON', 'Nhập JSON': 'Import JSON',
  'Khi nhập, trạng thái hợp lệ trong file sẽ thay thế tiến độ hiện tại. Mốc không còn tồn tại sẽ được bỏ qua.': 'Valid statuses in the file will replace current progress. Retired milestones will be ignored.',
  'MỐC CHƯA MỞ': 'LOCKED MILESTONE', 'Để bắt đầu mốc này, hãy đánh dấu đã nắm các tiền đề bắt buộc bên dưới.': 'To begin this milestone, mark the required prerequisites below as mastered.', 'TIỀN ĐỀ CẦN HỌC': 'PREREQUISITE TO LEARN',
  'Bạn có thể mở mốc tiền đề để học hoặc tự đánh dấu nếu đã nắm kiến thức đó.': 'Open a prerequisite to learn it, or mark it if you already know it.',
  'Tìm thấy': 'Found', 'mốc hợp lệ': 'valid milestones', 'mục không hợp lệ hoặc không còn trong bản đồ sẽ được bỏ qua': 'invalid or retired entries will be ignored',
  'Nhập sẽ thay thế tiến độ hiện tại.': 'Importing replaces current progress.', 'Xác nhận nhập': 'Confirm import',
  'File JSON không đúng định dạng tiến độ phiên bản 1.': 'This JSON file does not use progress schema version 1.', 'đọc': 'read',
};

const entries = Object.entries(interfaceText).sort((a, b) => b[0].length - a[0].length);
export function translateInterface(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    let value = node.nodeValue;
    for (const [vi, en] of entries) value = value.replaceAll(vi, en);
    node.nodeValue = value;
  }
  root.querySelectorAll('[aria-label]').forEach(element => {
    let value = element.getAttribute('aria-label');
    for (const [vi, en] of entries) value = value.replaceAll(vi, en);
    element.setAttribute('aria-label', value);
  });
}
