import { Button, Image, message } from "antd";
import React, { useState } from "react";
import menu1 from "../images/menu/order1.png";
import icon_tea from "../images/menu/tea.jpg";
import SPLQ from "../images/blog/MoriiBlog1.jpeg";
import { Card, Col, Row, Typography, Breadcrumb } from "antd";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import styled from "styled-components";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import { addProductToCard } from "../reducer/product/productSlice";

const { Meta } = Card;
const Img = styled.img`
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  -ms-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
  &:hover {
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform-y: scale(1.2);
    overflow-y: hidden;
  }
`;
const Input_checkbox = styled.input`
  &:checked ~ label {
    background-color: #146d4d;
    color: #fff;
  }
`;
const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate1 = useNavigate();
  const navigate = useLocation();
  const { products, currentPage } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [sizeVuaActive, setSizeVuaActive] = useState(true);
  const [sizeLonActive, setSizeLonActive] = useState(false);
  const [listTopping, setListTopping] = useState([]);
  const dataProduct = navigate.state.infoProduct;
  const id = dataProduct.id;
  const [total, setTotal] = useState(0);

  const [itemAdded, setItemAdded] = useState({
    id: id,
    name: dataProduct.TenSP,
    price: dataProduct.Gia,
    size: "M",
    topping: [],
    total: dataProduct.Gia,
  });
  console.log(dataProduct);
  const handleChangeSize = (e) => {
    if (e.target.id === "sizeVua") {
      setSizeVuaActive(true);
      setSizeLonActive(false);
    } else if (e.target.id === "sizeLon") {
      setSizeVuaActive(false);
      setSizeLonActive(true);
    }
  };

  const handleClickTopping = (e) => {
    if (e.target.checked) {
      setListTopping([
        ...listTopping,
        { name: e.target.name, price: e.target.value, MaSP: e.target.id },
      ]);
      console.log(listTopping);
    } else {
      setListTopping(listTopping.filter((item) => item.name !== e.target.name));
      console.log(listTopping);
    }
  };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      var listItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const sizeProduct = sizeVuaActive ? "M" : "L";

      var item = listItems.find(
        (item) =>
          item.id === id &&
          item.size === sizeProduct &&
          _.isEqual(item.topping, listTopping)
      );

      if (item) {
        item.quantity += 1;
        const totalPriceTopping = item.topping.reduce(
          (total1, item) => total1 + parseInt(item.price),
          0
        );
        console.log(totalPriceTopping);

        item.total = total * item.quantity;
        console.log(item.quantity);
      } else {
        var item = {
          id: id,
          name: dataProduct.TenSP,
          price: dataProduct.Gia,
          size: sizeVuaActive ? "M" : "L",
          topping: listTopping,
          quantity: 1,
          total: total,
          MaPL: dataProduct.MaPL,
          HinhAnh: dataProduct.HinhAnh,
        };
        listItems.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(listItems));
      dispatch(addProductToCard(listItems.length));
      message.success("Thêm vào giỏ hàng thành công");
      setItemAdded(item);
      console.log(item);
    } else {
      message.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
      navigate1("/signin");
    }
    // window.location.reload();
  };

  useEffect(() => {
    let total = dataProduct.Gia;
    listTopping.forEach((item) => {
      total += parseInt(item.price);
    });
    if (sizeLonActive) total += 5000;
    setTotal(total);
  }, [listTopping, sizeLonActive, sizeVuaActive]);
  return (
    <div className="container mx-auto max-w-[1024px]">
      <div className="pt-20 mb-6">
        <Breadcrumb>
          <Breadcrumb.Item>Menu</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/sanpham">Đồ uống</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="">{dataProduct.TenSP}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="  items-center mx-auto ">
        <Row className="w-full pb-10" gutter={35}>
          <Col span={12}>
            <img
              className="h-[80vh] w-full bg-contain"
              src={dataProduct.HinhAnh}
            />
          </Col>
          <Col span={12}>
            <Title level={2}>{dataProduct.TenSP}</Title>
            <Text className="text-[1.8rem] text-[#146d4d]">
              {total.toLocaleString()}đ
            </Text>
            {dataProduct.MaPL === 1 && (
              <>
                <Text className="text-[1.2rem]  block">
                  Chọn size (bắt buộc)
                </Text>
                <div className="flex mt-2">
                  <div className="relative h-[2.4rem] w-[7rem] flex items-center border-[0.01rem] rounded-[0.3rem] border-solid  ">
                    <input
                      onClick={handleChangeSize}
                      className="hidden  "
                      id="sizeVua"
                      type="radio"
                      name="sizeTraSua"
                      value="0"
                    />
                    <label
                      for="sizeVua"
                      className={`cursor-pointer w-full h-full flex ${
                        sizeVuaActive ? "bg-[#146d4d]" : ""
                      }`}
                    >
                      <p
                        className={`text-[0.9rem] mx-auto text-center my-auto ${
                          sizeVuaActive
                            ? "bg-[#146d4d] text-[#fff]"
                            : "text-[#000]"
                        }`}
                      >
                        Vừa + 0đ
                      </p>
                    </label>
                  </div>
                  <div className="relative h-[2.4rem] w-[7rem] flex items-center border-[0.01rem] rounded-[0.3rem] border-solid ml-3  ">
                    <input
                      onClick={handleChangeSize}
                      className="hidden  "
                      id="sizeLon"
                      type="radio"
                      name="sizeTraSua"
                      value="5000"
                    />
                    <label
                      for="sizeLon"
                      className={`cursor-pointer w-full h-full flex ${
                        sizeLonActive ? "bg-[#146d4d]" : ""
                      } `}
                    >
                      <p
                        className={`text-[0.9rem] mx-auto text-center my-auto ${
                          sizeLonActive
                            ? "bg-[#146d4d] text-[#fff]"
                            : "text-[#000]"
                        }`}
                      >
                        Lớn + 5,000đ
                      </p>
                    </label>
                  </div>
                </div>
                <Text className="text-[1.2rem] mt-4 block">Topping</Text>
                <div className="flex flex-wrap ">
                  <div className="relative  flex items-center border-[0.01rem] rounded-[0.3rem] border-solid mr-3  mt-4 ">
                    <Input_checkbox
                      onClick={handleClickTopping}
                      className="hidden  "
                      id="6"
                      type="checkbox"
                      name="Kem chese"
                      value="10000"
                    />
                    <label
                      for="6"
                      className={`cursor-pointer w-full box-border	 block `}
                    >
                      <p
                        className={`text-[0.9rem] mx-auto text-center my-auto py-2  px-3 border-[0.01rem] rounded-[0.3rem] border-solid  `}
                      >
                        Kemchese + 10,000đ
                      </p>
                    </label>
                  </div>
                  <div className="relative  flex items-center border-[0.01rem] rounded-[0.3rem] border-solid mr-3  mt-4">
                    <Input_checkbox
                      onClick={handleClickTopping}
                      className="hidden  "
                      id="4"
                      type="checkbox"
                      name="Trân châu đen"
                      value="5000"
                    />
                    <label
                      for="4"
                      className={`cursor-pointer w-full box-border	 block `}
                    >
                      <p
                        className={`text-[0.9rem] mx-auto text-center my-auto py-2  px-3 border-[0.01rem] rounded-[0.3rem] border-solid `}
                      >
                        Trân châu đen + 5,000đ
                      </p>
                    </label>
                  </div>
                  <div className="relative  flex items-center border-[0.01rem] rounded-[0.3rem] border-solid mr-3 mt-4 ">
                    <Input_checkbox
                      onClick={handleClickTopping}
                      className="hidden  "
                      id="5"
                      type="checkbox"
                      name="Trân châu trắng"
                      value="5000"
                    />
                    <label
                      for="5"
                      className={`cursor-pointer w-full box-border	 block `}
                    >
                      <p
                        className={`text-[0.9rem] mx-auto text-center my-auto py-2  px-3 border-[0.01rem] rounded-[0.3rem] border-solid  
                    `}
                      >
                        Trân châu trắng + 5,000đ
                      </p>
                    </label>
                  </div>
                </div>
              </>
            )}
            <Button
              onClick={(id) => handleAddToCart(id)}
              className="bg-[#146d4d] w-full rounded-md py-[1.3rem] flex justify-center items-center text-[#fff] text-[0.7rem] mt-7 font-bold"
            >
              Thêm vào giỏ hàng
            </Button>
          </Col>
        </Row>
        <Row
          className="w-full border-y-[0.01rem] mx-auto  border-solid  h-[25vh] flex items-center"
          gutter={35}
        >
          <Title className="mb-0" level={3}>
            Mô tả sản phẩm
          </Title>
          <Text className="mt-[-2.5rem]">
            Bắt đầu ngày mới với xíu đắng nhẹ của cà phê phin truyền thống kết
            hợp Espresso Ý, kèm chút ngọt ngào từ kem sữa, thêm ấn tượng bởi vị
            dừa lá dứa thơm béo đậm chất Việt Nam. Đặc biệt, nhân đôi độ ngon
            với topping thạch cà phê giòn dai, cùng foam phô mai mềm mịn dễ
            ghiền.
          </Text>
        </Row>
        <Title className="mb-0 mt-4 block" level={3}>
          Sản phẩm liên quan
        </Title>
        <Row gutter={35} className="w-full  mx-auto    ">
          {products.map((product, index) => {
            if (product.MaPL == 3) return;
            if (index > 6) return;
            return (
              <Col
                key={product.id}
                id={product.id}
                // onClick={(e) => handleClickProduct(e)}
                span={6}
              >
                <Card
                  id={product.id}
                  size="large"
                  hoverable
                  className="  mx-0 my-5 rounded-lg h-[23rem]"
                  bordered={true}
                  cover={
                    <div className="h-[15rem] overflow-hidden ">
                      <Img
                        id={product.id}
                        className=" hover:overflow-hidden "
                        alt="example"
                        src={product.HinhAnh}
                      />
                    </div>
                  }
                >
                  <Meta
                    id={product.id}
                    title={
                      <p className="whitespace-normal mb-0">{product.TenSP}</p>
                    }
                    description={`${product.Gia.toLocaleString()} VND`}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default ProductDetail;
