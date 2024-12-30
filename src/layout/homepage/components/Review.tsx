import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import { layReviewSachByMa } from "../../../api/SachApi";
import Review from "../../../models/Review";
import { jwtDecode } from "jwt-decode";

const DanhGia: React.FC = () => {
  const { maSach } = useParams();
  const bookId = maSach ? parseInt(maSach) : null; // Đảm bảo bookId hợp lệ
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Review>({
    username: '',
    rating: 0,
    content: ''
  });
  const [stompClient, setStompClient] = useState<any>(null);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const decodedToken: any = jwtDecode(jwt);
      const username = decodedToken.sub;
      setNewReview({ ...newReview, username})
    }
    if (bookId === null) return; // Nếu không có bookId, không thực hiện kết nối WebSocket.

    const socket = new SockJS('http://localhost:8000/ws');
    const client = Stomp.over(socket);
    client.connect({}, () => {
      setStompClient(client);
      client.subscribe(`/topic/sach-danhgia/${bookId}`, (message) => {
        const review: Review = JSON.parse(message.body);
        setReviews((prevReviews) => [...prevReviews, review]);
      });
    });

    // Dọn dẹp kết nối WebSocket khi component unmounts hoặc bookId thay đổi
    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, [bookId]);

  useEffect(() => {
    if (bookId === null) return; // Kiểm tra bookId hợp lệ

    layReviewSachByMa(bookId)
      .then((reviewData) => {
        console.log("review data", reviewData);
        console.log("book id data", bookId);
        if (reviewData && reviewData.KetquaReview) {
          // Trích xuất KetquaReview và cập nhật mảng reviews
          setReviews((prevReviews) => [...prevReviews, ...reviewData.KetquaReview]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bookId]);


  const submitReview = async () => {
    if (newReview.rating < 1 || newReview.rating > 5) {
      alert("Xếp hạng phải nằm trong khoảng từ 1 đến 5.");
      return;
    }
    if (!newReview.username || !newReview.content) {
      alert("Vui lòng cung cấp tên và nội dung đánh giá.");
      return;
    }

    const reviewData: Review = { ...newReview };
    if (stompClient && bookId !== null) {
      try {
        stompClient.publish({
          destination: `/app/danhgia/${bookId}`,
          body: JSON.stringify(reviewData),
        });
        setNewReview({ username: '', rating: 0, content: '' });
      } catch (error) {
        console.error("Lỗi khi gửi đánh giá:", error);
        alert("Đã xảy ra lỗi khi gửi đánh giá của bạn.");
      }
    }
  };

  return (
    <div className="review-container">
      <h3 className="review-title">Đánh giá Sản Phẩm</h3>
      <ul className="review-list">
        {reviews.map((review, index) => (
          <li key={index} className="review-item">
            <strong className="review-username">{review.username}</strong>: {review.content} ({review.rating}/5)
          </li>
        ))}
      </ul>
      <div className="input-group">
        <input
          type="number"
          placeholder="Xếp hạng (1-5)"
          min={1}
          max={5}
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({
              ...newReview,
              rating: Math.max(1, Math.min(5, parseInt(e.target.value))),
            })
          }
          className="input-field"
        />
      </div>
      <div className="input-group">
        <textarea
          placeholder="Nội dung đánh giá"
          value={newReview.content}
          onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
          className="textarea-field"
        />
      </div>
      <button onClick={submitReview} className="submit-button">Submit</button>
      <style>
        {`
          .review-container {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            background: #ffe6f0;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .review-title {
            text-align: center;
            color: #ff4081;
            font-size: 1.8em;
            font-weight: bold;
          }
          .review-list {
            list-style: none;
            padding: 0;
            margin: 20px 0;
          }
          .review-item {
            padding: 10px;
            border-bottom: 1px solid #ff99c8;
            color: #333;
          }
          .review-username {
            font-size: 1.2em;
            color: #ff4081;
            font-weight: bold;
          }
          .input-group {
            margin: 15px 0;
          }
          .input-field, .textarea-field {
            width: 100%;
            padding: 10px;
            border: 1px solid #ff99c8;
            border-radius: 4px;
            margin-top: 5px;
            font-size: 1em;
            color: #333;
            background: #fffafc;
          }
          .textarea-field {
            height: 100px;
          }
          .submit-button {
            background-color: #ff4081;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            font-size: 1em;
            cursor: pointer;
            display: block;
            width: 100%;
            text-align: center;
          }
          .submit-button:hover {
            background-color: #e83775;
          }
        `}
      </style>
    </div>
  );

};

export default DanhGia;
