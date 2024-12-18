import UserModel from "../models/UserModel";
import myRequest from "./Request";


export async function layUser(duongDan: string): Promise<UserModel[]> {
  try {
    const response = await myRequest(duongDan); // Gọi API
    console.log("Dữ liệu từ API:", response);

    // Kiểm tra nếu response là một mảng
    if (Array.isArray(response)) {
      return response.map((item: any) => ({
        avatar: item.avatar, // Trích xuất thuộc tính avatar
      }));
    }

    // Nếu response là một đối tượng (API không trả về mảng)
    if (response && typeof response === "object") {
      const ketQua: UserModel[] = [];
      // Kiểm tra cấu trúc bên trong đối tượng
      if (response.avatar) {
        ketQua.push({ avatar: response.avatar });
      } else {
        for (const key in response) {
          if (response[key]?.avatar) {
            ketQua.push({ avatar: response[key].avatar });
          }
        }
      }
      return ketQua;
    }

    // Nếu không phải mảng hoặc đối tượng
    console.error("Phản hồi không hợp lệ:", response);
    return [];
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    return [];
  }
}

export async function layAvatar(userName: string): Promise<UserModel[]> {
  const duongDan = `http://localhost:8000/nguoi-dung/search/findByUsername?tenDangNhap=${userName}`;
  return await layUser(duongDan);
}
