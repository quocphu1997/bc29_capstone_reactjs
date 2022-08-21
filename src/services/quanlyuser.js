import { request } from "../configs/axios";

const fetchUserApi = (data) => { // {"taiKhoan":"duyvo", "matKhau":"123456"}
  return request({
    url: `/QuanLyNguoiDung/DangNhap`,
    method: "POST",
    data: data
  });
};
export {fetchUserApi}