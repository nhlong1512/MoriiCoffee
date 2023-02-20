import React from "react";
import {
  Avatar,
  Button,
  Col,
  Image,
  Input,
  Radio,
  Row,
  Upload,
  message,
} from "antd";
import Title from "antd/lib/typography/Title";
import { ChangePassWordUser } from "../../reducer/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
const ChangePassWord = () => {
  const dispatch = useDispatch();
const [isFirst, setIsFirst] = useState(true);
const { user, changePasswordStatus, isChangePasswordLoading } = useSelector(
  (state) => state.user
);
const [isSuccess, setIsSuccess] = useState(false);
const [confirmNewPassword, setConfirmNewPassword] = useState("");
const [userInfo, setUserInfo] = useState({
  email: user.email,
  role: "khachhang",
  password: "",
  newPassword: "",
});
const [isEqualNewPassword, setIsEqualNewPassword] = useState(false);
const handleChangeCfNewPassWord = (e) => {
  setConfirmNewPassword(e.target.value);

  console.log(userInfo);
};
const handleChangeForm = (e) => {
  setIsFirst(false);
  console.log(userInfo);
  setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
};

useEffect(() => {
  console.log(userInfo.newPassword);
  console.log(confirmNewPassword);
  console.log(isEqualNewPassword);
  if (userInfo.newPassword == confirmNewPassword) setIsEqualNewPassword(true);
  else setIsEqualNewPassword(false);
}, [confirmNewPassword, userInfo.newPassword]);

useEffect(() => {
  if (isFirst == false) {
    if (changePasswordStatus == true && isChangePasswordLoading == false)
      message.success("Cập nhật thông tin thành công");
    else if (
      changePasswordStatus == false &&
      isChangePasswordLoading == false
    ) {
      message.error("Cập nhật thông tin thất bại");
    }
  }
}, [isChangePasswordLoading]);

const handleSubmitUpdatePassWord = () => {
  setIsFirst(false);

  console.log(isEqualNewPassword);
  dispatch(ChangePassWordUser(userInfo, user.id));
  console.log(isSuccess);

  setConfirmNewPassword("");
  setUserInfo({
    email: user.email,
    role: "khachhang",
    password: "",
    newPassword: "",
  });
};
return (
  <div className="w-full h-[135vh] ">
    {isChangePasswordLoading && (
      <LoadingOutlined
        style={{
          fontSize: 20,
        }}
        spin
      />
    )}
    <div className="flex items-center mb-8 w-full ">
      <div className="w-full">
        <Title className=" " level={3}>
          PASSWORD
        </Title>
        {/* <input
            // className="hidden"
            type="file"
            name="myImage"
            onChange={(e) => onChangeImage(e)}
          /> */}
        <div className="flex w-full justify-between">
          <Title className=" " level={5}>
            Please never share or give out your password.
          </Title>
          <Button
            onClick={handleSubmitUpdatePassWord}
            className="w-24 h-8 rounded-lg text-white bg-[#146d4d] hover:bg-[#FF5A5F] flex items-center justify-center"
          >
            Lưu
          </Button>
        </div>
      </div>
    </div>
    <Row className="w-full mb-8 flex items-center ">
      <Col span={6} className="">
        <Title level={5}>Mật khẩu hiện tại</Title>
      </Col>
      <Col span={18}>
        <Input
          type="password"
          size="medium"
          name="password"
          placeholder="Mật khẩu hiện tại"
          className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
          onChange={(e) => handleChangeForm(e)}
          value={userInfo.password}
          required
        />
      </Col>
    </Row>
    <Row className="w-full mb-8 flex items-center ">
      <Col span={6} className="">
        <Title level={5}>Mậy khẩu mới</Title>
      </Col>
      <Col span={18}>
        <Input
          type="password"
          size="medium"
          name="newPassword"
          placeholder="Mật khẩu mới"
          className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
          onChange={(e) => handleChangeForm(e)}
          value={userInfo.newPassword}
          required
        />
      </Col>
    </Row>

    <Row className="w-full mb-8 flex items-center ">
      <Col span={6} className="">
        <Title level={5}>Xác nhận mật khẩu mới</Title>
      </Col>
      <Col span={18}>
        <Input
          type="password"
          size="medium"
          name="confirmNewPassword"
          placeholder="Xác nhận mật khẩu mới"
          className="rounded-md py-2 mb-3 placeholder:font-SignIn placeholder:font-semibold placeholder:text-[#595959] placeholder:text-[0.7rem] pl-4  "
          onChange={(e) => handleChangeCfNewPassWord(e)}
          value={confirmNewPassword}
          required
        />
      </Col>
    </Row>
  </div>
);
};

export default ChangePassWord;
