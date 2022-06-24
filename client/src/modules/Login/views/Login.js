import React, { useEffect } from "react";
import { Form, Row, Col, Typography, Input, Space, Button } from "antd";
import { useQuery, useMutation, gql } from "@apollo/client";

const { Title } = Typography;

const Auth = gql`
  mutation Auth($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

const GetUsers = gql`
  query Login {
    users {
      id
    }
  }
`;

function Login() {
  const [login, { data, loading, error }] = useMutation(Auth);
  const { _, __, data: data2, refetch } = useQuery(GetUsers);

  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <Row gutter={[16, 16]} className="h-100 w-100">
      <Col style={{ backgroundColor: "#1DA57A" }} md={{ span: 12 }}></Col>
      <Col
        className="d-flex align-items-center justify-content-center"
        md={{ span: 12 }}
      >
        <Space className="w-50" direction="vertical">
          <Title className="text-bolder text-center" level={2}>
            Login to your account
          </Title>

          <Form size="large" layout="vertical">
            <Form.Item label="Email">
              <Input autoComplete="off" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={async () => {
                  let returned = await login({
                    variables: {
                      email: "ralp",
                      password: "ralp",
                    },
                  });
                  console.log(returned);
                  // let users = await refetch();
                  // console.log(users, " sfdsdf");
                }}
                className="w-100"
                type="primary"
              >
                Login
              </Button>
              <Button
                onClick={async () => {
                  // let returned = await login({
                  //   variables: {
                  //     email: "ralp",
                  //     password: "ralp",
                  //   },
                  // });
                  // console.log(returned);
                  let users = await refetch();
                  console.log(users, " sfdsdf");
                }}
                className="w-100"
                type="primary"
              >
                Login2
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Col>
    </Row>
  );
}

export default Login;
