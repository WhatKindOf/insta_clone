import React from "react";
import styled, { css } from "styled-components";
import { post } from "axios";
import TextField from "@material-ui/core/TextField";

class Login extends React.Component {
  state = {
    email: "",
    name: "",
    nickname: "",
    password: ""
  };

  login = () => {
    const url = "/api/login";
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    return post(url, data);
  };

  loginAction = e => {
    e.preventDefault();
    this.login().then(response => {
      if (JSON.stringify(response.data[0]) === undefined) {
        console.log("된다고????");
      }
      if (JSON.stringify(response.data.length) === "0") {
        console.log("빈 값이다.");
      }
      console.log(JSON.stringify(response.data.length));
    });
    this.setState({
      email: "",
      password: ""
    });
  };

  getUser = () => {
    this.callApi()
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log("err : " + err));
  };

  callApi = async () => {
    const response = await fetch("/api/user");
    const body = await response.json();
    return body;
  };

  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  render() {
    return (
      <Div>
        <MainDiv>
          <LoginDiv>
            <Span color="Title">Insta_Clone</Span>
            <TextField
              variant="outlined"
              label="이메일"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleValueChange}
            />
            <TextField
              variant="outlined"
              label="비밀번호"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleValueChange}
            />
            <Button onClick={this.loginAction}>
              <Span color="LoginButton">로그인</Span>
            </Button>
          </LoginDiv>
          <JoinDiv>
            <Span color="JoinNotice">계정이 없으신가요?</Span>
            <A onClick={this.props.showJoin}>
              <Span color="Join">가입하기</Span>
            </A>
          </JoinDiv>
        </MainDiv>
        <Footer>
          <Span color="Footer">© 2019 INSTA_CLONE</Span>
          <Span color="Footer">Mady by Pyeon Ho Seong</Span>
        </Footer>
      </Div>
    );
  }
}

const A = styled.a`
  text-decoration: none;
  margin-left: 20px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 225px;
  height: 30px;
  border-radius: 5px;
  background-color: #3897f0;
  border: 1px solid #3897f0;
`;

const Span = styled.span`
  ${props => {
    if (props.color === "Title") {
      return css`
        color: rgba(38, 38, 38);
        font-size: 45px;
        font-weight: 700;
      `;
    } else if (props.color === "JoinNotice") {
      return css`
        color: #555555;
        font-weight: 600;
      `;
    } else if (props.color === "Footer") {
      return css`
        color: #1e4d7b;
        font-weight: 600;
      `;
    } else if (props.color === "LoginButton") {
      return css`
        color: white;
        font-weight: 600;
      `;
    } else if (props.color === "Join") {
      return css`
        color: rgba(56, 151, 240);
        font-weight: 700;
      `;
    }
  }}
`;

const Div = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  @media (max-height: 700px) {
    height: 700px;
  }
`;

const MainDiv = styled.div`
  height: 90%;
  width: 100%;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginDiv = styled.div`
  height: 380px;
  width: 350px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const JoinDiv = styled.div`
  height: 60px;
  width: 350px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.div`
  height: 10%;
  width: 100%;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Login;
