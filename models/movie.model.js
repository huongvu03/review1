const mongoose = require('mongoose');

// Tạo schema cho Movie
const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true
  },
  screenNo: {
    type: Number,
    required: true
  },
  showTime: {
    type: String,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  actors: {
    type: String, // Chuỗi chứa danh sách tên diễn viên, có thể tách ra thành mảng nếu cần
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Action', 'Comedy', 'Drama'], // Giới hạn các giá trị cho category
    required: true
  }
});

// Xuất model Movie dựa trên schema
module.exports = mongoose.model('movie', movieSchema);