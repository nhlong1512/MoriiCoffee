import {
  Avatar,
  Button,
  Col,
  Image,
  Input,
  Radio,
  Row,
  Upload,
  Spin,
  message,
} from "antd";
import axios from "axios";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../reducer/user/userAction";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../api/admin/Users";
import { getAllUserProfile } from "../../../reducer/admin/user/userAction";
// import {
//   getUserProfile,
//   updateUserProfile,
// } from "../../reducer/user/userAction";
const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  // console.log(user);
  const [isFirst, setIsFirst] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [userInfo, setUserInfo] = useState({
    hoten: "",
    email: "",
    role: "khachhang",
    password: "",
    password_confirmation: "",
    sdt: "",
    ngsinh: "",
    gioitinh: "",
    diachi: "",
    urlavt: "",
  });

  //validate date
  const isValidDate = (dateString) => {
    // First check for the pattern
    var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

    if (!regex_date.test(dateString)) {
      return false;
    }

    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
      return false;
    }

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  };

  // const [gender, setGender] = useState(0);
  const handleChangeForm = (e) => {
    setIsFirst(false);
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    console.log(userInfo);
  };

  const onChangeImage = async (e) => {
    console.log(e.target.files[0]);
    const urlImage = URL.createObjectURL(e.target.files[0]);
    setSelectedImage(urlImage);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "themorrii");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dql5y1xex/image/upload",
      formData
    );
    const url = res.data.secure_url;
    setUserInfo({ ...userInfo, urlavt: url });
    console.log(url);

    // setUserInfo({
    //   ...userInfo,
    //   urlavt: urlImage,
    // });
  };

  const handleChangeGender = (e) => {
    const gt = e.target.value == "nu" ? 1 : 0;
    setUserInfo({ ...userInfo, [e.target.name]: gt });
    console.log(userInfo);
  };
  const handleSubmitUpdateProfile = async () => {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    console.log(userInfo);
    if (vnf_regex.test(userInfo.sdt) == false) {
      message.error("Số điện thoại không hợp lệ");
    } else if (isValidDate(userInfo.ngsinh) == false) {
      message.error("Ngày sinh không hợp lệ");
    } else {
      // setIsFirst(false);
      console.log(userInfo);
      const res = await createUser(userInfo);
      console.log(res);
      if (res.status == true) {
        dispatch(getAllUserProfile());
        message.success("Thêm nhân viên thành công");
        navigate("/admin/user");
      }
    }
  };
  //   useEffect(() => {
  //     if (isFirst == false) {
  //       if (isChangeProfileLoading == false && updateStatus == true)
  //         message.success("Cập nhật thông tin thành công");
  //       else if (isChangeProfileLoading == false && updateStatus == false)
  //         message.error("Cập nhật thông tin thất bại");
  //     }
  //   }, [isChangeProfileLoading]);
  const handleChangeBirthDay = (e) => {
    setUserInfo({ ...userInfo, ngsinh: e.target.value });
  };

  //   useEffect(() => {
  //     setUserInfo(user);
  //   }, [status]);
  //   useEffect(() => {
  //     dispatch(getUserProfile());
  //   }, [isAuthenticated, status]);
  return (
    <div className="container mx-auto max-w-4xl h-[135vh]  ">
      {/* {isChangeProfileLoading && (
          <LoadingOutlined
            style={{
              fontSize: 20,
            }}
            spin
          />
        )} */}
      <div className="flex items-center mb-6 w-full  ">
        <Avatar
          src={
            <Image
              preview={false}
              className="w-36 h-36"
              src={selectedImage}
              alt="avatar"
            />
          }
          className="w-36 h-36 mr-8"
        />
        <div className="w-full">
          <Title className=" " level={3}>
            PROFILE
          </Title>

          {/* <input
                  // className="hidden"
                  type="file"
                  name="myImage"
                  onChange={(e) => onChangeImage(e)}
                /> */}

          <div className="flex w-full justify-between">
            <Title className=" " level={5}>
              Update your photo and personal details.
            </Title>

            <Button
              onClick={handleSubmitUpdateProfile}
              className="w-24 h-8 rounded-lg text-white bg-[#146d4d] hover:bg-[#FF5A5F] flex items-center justify-center"
            >
              Tạo
            </Button>
          </div>
        </div>
      </div>

      <Row className="w-full mb-8 flex items-center ">
        <Col span={6} className="">
          <Title level={5}>Họ và tên</Title>
        </Col>
        <Col span={18}>
          <Input
            type="text"
            size="medium"
            name="hoten"
            placeholder="Họ tên"
            className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
            onChange={(e) => handleChangeForm(e)}
            value={userInfo.hoten}
            required
          />
        </Col>
      </Row>
      <Row className="w-full mb-8 flex items-center ">
        <Col span={6} className="">
          <Title level={5}>Email</Title>
        </Col>
        <Col span={18}>
          <Input
            type="text"
            size="medium"
            name="email"
            placeholder="Email"
            className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
            onChange={(e) => handleChangeForm(e)}
            value={userInfo.email}
          />
        </Col>
      </Row>
      <Row className="w-full mb-8 flex items-center ">
        <Col span={6} className="">
          <Title level={5}>Mật khẩu</Title>
        </Col>
        <Col span={18}>
          <Input
            type="password"
            size="medium"
            name="password"
            placeholder="Mật khẩu"
            className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
            onChange={(e) => handleChangeForm(e)}
            value={userInfo.password}
            required
          />
        </Col>
      </Row>
      <Row className="w-full mb-8 flex items-center ">
        <Col span={6} className="">
          <Title level={5}>Xác nhận mật khẩu</Title>
        </Col>
        <Col span={18}>
          <Input
            type="password"
            size="medium"
            name="password_confirmation"
            placeholder="Xác nhận mật khẩu"
            className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
            onChange={(e) => handleChangeForm(e)}
            // value={userInfo.sdt}
            required
          />
        </Col>
      </Row>
      <Row className="w-full mb-8 flex items-center my-5">
        <Col span={6} className="">
          <Title className="w-full  my-auto " level={5}>
            Ảnh đại diện
          </Title>
        </Col>
        <Col span={18}>
          <div className="flex items-center w-full justify-between ">
            <Avatar
              src={
                <Image
                  preview={false}
                  className="w-16 h-16"
                  src={selectedImage}
                  alt="avatar"
                />
              }
              className="w-16 h-16 "
            />
            <p className="mb-0 w-[25rem]">
              This will be displayed on your profile.
            </p>
            <input
              className="w-[16rem] pl-5 "
              type="file"
              name="urlavt"
              onChange={(e) => onChangeImage(e)}
            />
          </div>
        </Col>
      </Row>
      <Row className="w-full mb-8 flex items-center ">
        <Col span={6} className="">
          <Title level={5}>Số điện thoại</Title>
        </Col>
        <Col span={18}>
          <Input
            type="text"
            size="medium"
            name="sdt"
            placeholder="Số điện thoại"
            className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
            onChange={(e) => handleChangeForm(e)}
            value={userInfo.sdt}
            required
          />
        </Col>
      </Row>

      <Row className="w-full mb-8 flex items-center  ">
        <Col span={6} className="">
          <Title level={5}>Giới tính</Title>
        </Col>
        <Col span={18}>
          <div className="flex items-center w-ful ">
            <input
              onClick={(e) => handleChangeGender(e)}
              id="nam"
              type="radio"
              name="gioitinh"
              value="nam"
              className=" mr-1 accent-[#146d4d] w-4 h-4  "
            />

            <label for="nam">Nam</label>
            <input
              onClick={(e) => handleChangeGender(e)}
              id="nu"
              type="radio"
              name="gioitinh"
              value="nu"
              className="ml-10 mr-1 accent-[#146d4d] w-4 h-4 "
            />

            <label for="nu">Nữ</label>
          </div>
        </Col>
      </Row>
      <Row className="w-full mb-8 flex items-center ">
        <Col span={6} className="">
          <Title level={5}>Ngày sinh</Title>
        </Col>
        <Col span={18}>
          <Input
            type="text"
            size="medium"
            name="ngsinh"
            placeholder="2003-12-27"
            className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
            onChange={(e) => handleChangeBirthDay(e)}
            value={userInfo?.ngsinh}
            required
          />
        </Col>
      </Row>
    </div>
  );
};

export default AddUser;
