import {
  Avatar,
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  Space,
  TreeSelect,
} from "antd";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useAsync } from "../../../hooks/useAsync";
import {
  fetchLayThongTinCumRapTheoHeThong,
  fetchLayThongTinLichChieuHeThongRap,
  fetchManagerCreateChedule,
} from "../../../services/lichChieu";
import { useFormik } from "formik";
import { useParams } from "react-router";
import moment from "moment";
export default function ShowtimeManager() {
  const params = useParams();
  const formik = useFormik({
    initialValues: {
      maPhim: params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },
    onSubmit: async (value) => {
      // console.log(value);
      const result = await fetchManagerCreateChedule(value);
      alert(result.data.content);
    },
  });
  const [state, setState] = useState([
    {
      heThongRapChieu: [],
      cumRapChieu: [],
    },
  ]);

  let filmsparam = {};
  if (localStorage.getItem("FilmsParams")) {
    filmsparam = JSON.parse(localStorage.getItem("FilmsParams"));
  }
  const { state: thongTinLichChieuHeThongRap } = useAsync({
    dependancies: [],
    service: () => fetchLayThongTinLichChieuHeThongRap(),
  });
  useEffect(() => {
    setState({
      ...state,
      heThongRapChieu: thongTinLichChieuHeThongRap,
    });
  }, [thongTinLichChieuHeThongRap]);
  // console.log(state.heThongRapChieu);

  const handleChangeNgayGioChieu = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log(moment(value).format("DD/MM/YYYY hh:mm:ss"));
  };

  const onOk = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log(moment(value).format("DD/MM/YYYY hh:mm:ss"));
  };

  const handleChangeRap = async (value) => {
    let result = await fetchLayThongTinCumRapTheoHeThong(value);
    setState({
      ...state,
      cumRapChieu: result.data.content,
    });
  };
  const handleChangeCumRap = (value) => {
    console.log(value);
    formik.setFieldValue("maRap", value);
  };
  const handleChangeGiaVe = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  return (
    <div className="flex justify-between">
      <div className="w-2/4">
        <h3 className="text-center">{params.tenphim}</h3>
        <img className="mx-auto" src={filmsparam.hinhAnh} alt={filmsparam.tenPhim} />
      </div>

      <Form
        className="w-full"
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
      >
        <h3 className="pl-60 pt-10">T???o l???ch chi???u</h3>
        <Form.Item label="H??? th???ng r???p">
          <Select
            options={state.heThongRapChieu?.map((ele, index) => {
              return {
                label: ele.tenHeThongRap,
                value: ele.maHeThongRap,
              };
            })}
            onChange={handleChangeRap}
            placeholder="Ch???n r???p"
          />
        </Form.Item>
        <Form.Item label="C???m r???p">
          <Select
            options={state.cumRapChieu?.map((ele, index) => {
              return {
                label: ele.tenCumRap,
                value: ele.maCumRap,
              };
            })}
            onChange={handleChangeCumRap}
            placeholder="Ch???n c???m r???p"
          />
        </Form.Item>
        <Form.Item label="Ng??y gi??? chi???u">
          <Space direction="vertical" size={12}>
            <DatePicker
              showTime
              format="DD/MM/YYYY hh:mm:ss"
              onChange={handleChangeNgayGioChieu}
              onOk={onOk}
            />
          </Space>
        </Form.Item>
        <Form.Item label="Gi?? v??">
          <InputNumber onChange={handleChangeGiaVe} />
        </Form.Item>
        <Form.Item label="Ch???c n??ng">
          <Button htmlType="submit" type="primary">
            T???o L???ch Chi???u
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
