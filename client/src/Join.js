import React from "react";
import styled, { css } from "styled-components";
import TextField from "@material-ui/core/TextField";

class Join extends React.Component {
  render() {
    return (
      <Div>
        <MainDiv>
          <JoinDiv>
            <Span color="Title">Insta_Clone</Span>
            <Span color="SubTitle">
              친구들의 사진과 동영상을 보려면 가입하세요.
            </Span>
            <TextField
              variant="outlined"
              label="이메일 주소"
              type="text"
              name="Email"
            />
            <TextField
              variant="outlined"
              label="성명"
              type="text"
              name="Name"
            />
            <TextField
              variant="outlined"
              label="사용자 계정"
              type="text"
              name="Account"
            />
            <TextField
              variant="outlined"
              label="비밀번호"
              type="password"
              name="Password"
            />
            <Button>
              <Span color="JoinButton">가입</Span>
            </Button>
          </JoinDiv>
          <LoginDiv>
            <Span color="LoginNotice">계정이 있으신가요?</Span>
            <A onClick={this.props.showLogin}>
              <Span color="Login">로그인</Span>
            </A>
          </LoginDiv>
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
    } else if (props.color === "LoginNotice") {
      return css`
        color: #555555;
        font-weight: 600;
      `;
    } else if (props.color === "Footer") {
      return css`
        color: #1e4d7b;
        font-weight: 600;
      `;
    } else if (props.color === "JoinButton") {
      return css`
        color: white;
        font-weight: 600;
      `;
    } else if (props.color === "Login") {
      return css`
        color: rgba(56, 151, 240);
        font-weight: 700;
      `;
    } else if (props.color === "SubTitle") {
      return css`
        color: #a6a6a6;
        font-weight: 600;
        font-size: 20px;
        text-align: center;
        margin-left: 20px;
        margin-right: 20px;
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

const JoinDiv = styled.div`
  height: 560px;
  width: 350px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const LoginDiv = styled.div`
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

export default Join;
