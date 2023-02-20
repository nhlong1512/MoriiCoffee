import React from "react";
import { Card, Col, Row, Typography, Spin } from "antd";
import styled from "styled-components";
import Blog1 from "../../images/blog/MoriiBlog1.jpeg";
import Blog2 from "../../images/blog/MoriiBlog2.jpeg";
import Blog3 from "../../images/blog/MoriiBlog3.jpg";
import Blog4 from "../../images/blog/MoriiBlog4.jpg";
import Blog5 from "../../images/blog/MoriiBlog5.jpg";
import Blog6 from "../../images/blog/MoriiBlog6.jpg";
import { getBlogAction } from "../../reducer/admin/blog/blogAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
const { Title, Paragraph } = Typography;

export default function Blog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, isLoading } = useSelector((state) => state.blog_admin);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
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
  useEffect(() => {
    dispatch(getBlogAction());
    console.log("bb", blogs);
  }, []);

  const handleClickDetailBlog = (e) => {
    console.log(e.target.id);
    const id = e.target.id;

    navigate("/blog/blog-detail", {
      state: { id: id },
    });
  };
  return (
    <div className="container w-full max-w-[1100px] mx-auto h-[160vh]">
      <div className="flex-col py-8 ">
        <Title className="text-[#146d4d] w-[15rem] mb-0 mx-auto text-center">
          Morii Blog
        </Title>
        <Paragraph className=" w-[18rem] mb-0 mx-auto text-center text-[1.2rem]">
          Mỗi tách cà phê, mỗi câu chuyện
        </Paragraph>
      </div>

      <Row gutter={36}>
        {isLoading && <Spin indicator={antIcon} />}
        {blogs.map((item, index) => {
          if (index > 5) {
            return;
          }
          return (
            <Col id={item.id} className="mt-5 " span={8}>
              <Card
                onClick={(e) => handleClickDetailBlog(e)}
                id={item.id}
                size="small"
                hoverable
                className="  mx-5 my-5 h-[95%] rounded-lg"
                bordered={true}
                cover={
                  <div id={item.id} className="h-[12rem] overflow-hidden ">
                    <Img
                      id={item.id}
                      className=" hover:overflow-hidden "
                      alt="example"
                      src={item.UrlImage}
                    />
                  </div>
                }
              >
                <Meta
                  id={item.id}
                  title={item.TieuDe}
                  description={
                    <p
                      id={item.id}
                      className=" text-ellipsis overflow-y-hidden line-clamp-3"
                    >
                      {item.MoTa}
                    </p>
                  }
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
