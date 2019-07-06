import React, { Fragment } from "react";
import styled, { css } from "styled-components";

class Home extends React.Component {
  state = {
    open: "none",
    date: new Date(),
    year: "",
    month: "",
    day: "",
    hour: "",
    contentImg: "",
    profileImg: "",
    nickname: ""
  };

  getContents = () => {
    this.callApi()
      .then(res => {
        this.props.setContents(res);
      })
      .catch(err => console.log("err : " + err));
  };

  callApi = async () => {
    const response = await fetch("/api/allContents");
    const body = await response.json();
    return body;
  };

  handleClickOpen = (contentImg, profileImg, nickname) => {
    this.setState({
      open: "flex",
      contentImg: contentImg,
      profileImg: profileImg,
      nickname: nickname
    });
  };

  handleClickClose = () => {
    this.setState({
      open: "none",
      contentImg: "",
      profileImg: "",
      nickname: ""
    });
  };

  componentDidMount() {
    this.getContents();
  }

  render() {
    return (
      <Fragment>
        <Div>
          <Main>
            {this.props.contents.length !== 0
              ? this.props.contents.map(c => {
                  return (
                    <Container>
                      <UpperSide>
                        <ImageDiv>
                          <Button
                            onClick={() =>
                              this.handleClickOpen(
                                c.contentImg,
                                c.profileImg,
                                c.nickname
                              )
                            }
                          >
                            {c.contentImg === null ? (
                              <Image
                                src={require("./images/basic.png")}
                                alt="first"
                              />
                            ) : (
                              <Image src={c.contentImg} alt="first" />
                            )}
                          </Button>
                        </ImageDiv>
                        <WhoWhen>
                          <Span kind="title">{c.nickname}</Span>
                          <Span size="replyDate">{c.contentDate}</Span>
                        </WhoWhen>
                      </UpperSide>
                      <LowerSide>
                        <Span size="replyID">{c.content}</Span>
                      </LowerSide>
                    </Container>
                  );
                })
              : ""}
          </Main>
        </Div>
        <StyledDialog display={this.state.open}>
          <CloseButton onClick={this.handleClickClose}>
            <img src={require("./images/close.png")} alt="close" />
          </CloseButton>
          <StyledDialogDiv>
            <StyledDialogImgDiv>
              {this.state.contentImg === null ? (
                <StyledDialogImg
                  src={require("./images/basic.png")}
                  alt="img"
                />
              ) : (
                <StyledDialogImg src={this.state.contentImg} alt="img" />
              )}
            </StyledDialogImgDiv>
            <StyledDialogContentDiv>
              <StyledDialogContentUpperDiv>
                <ProfileImgDiv size="small">
                  {this.state.profileImg === null ? (
                    <ProfileImg
                      size="small"
                      src={require("./images/default.png")}
                      alt="img"
                    />
                  ) : (
                    <ProfileImg
                      size="small"
                      src={this.state.profileImg}
                      alt="img"
                    />
                  )}
                </ProfileImgDiv>
                <ProfileInfoDiv size="small">
                  <Span size="small">{this.state.nickname}</Span>
                </ProfileInfoDiv>
              </StyledDialogContentUpperDiv>
              <StyledDialogContentMidDiv>
                <ReplyContainer>
                  <ProfileImgDiv size="small">
                    <ProfileImg
                      size="small"
                      src={require("./images/first.png")}
                      alt="img"
                    />
                  </ProfileImgDiv>
                  <ReplyDiv>
                    <Span size="replyID">dudumi</Span>
                    <Span size="reply">사진 맘에 들어요</Span>
                    <Span size="replyDate">
                      {`${this.state.date.getFullYear()}년 
          ${this.state.date.getMonth() + 1}월
          ${this.state.date.getDay()}일
          ${this.state.date.getHours()}시
          `}
                    </Span>
                  </ReplyDiv>
                </ReplyContainer>
              </StyledDialogContentMidDiv>
              <StyledDialogContentLowerDiv>
                <Input
                  type="text"
                  name="reply"
                  placeholder="댓글을 입력하세요."
                />
              </StyledDialogContentLowerDiv>
            </StyledDialogContentDiv>
          </StyledDialogDiv>
        </StyledDialog>
      </Fragment>
    );
  }
}

const ReplyContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ReplyDiv = styled.div`
  width: 66%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledDialog = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  ${props => {
    return css`
      display: ${props.display};
      background-color: rgba(125, 125, 125, 0.7);
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    `;
  }}
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const StyledDialogDiv = styled.div`
  width: 95%;
  height: 55%;
  max-height: 600px;
  max-width: 935px;
  display: flex;
`;

const StyledDialogImgDiv = styled.div`
  width: 64%;
  height: auto;
  max-width: 600px;
  background-color: #000000;
`;

const StyledDialogImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledDialogContentDiv = styled.div`
  width: 36%;
  max-width: 600px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledDialogContentUpperDiv = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  border-bottom: 1px solid rgba(230, 230, 230);
`;

const StyledDialogContentMidDiv = styled.div`
  width: 100%;
  height: 75%;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none !important;
  }
`;

const StyledDialogContentLowerDiv = styled.div`
  width: 100%;
  height: 10%;
`;

const Input = styled.input`
  height: 99%;
  width: 90%;
  padding: 0px 15px;
  border: none;
  border-top: 1px solid rgba(230, 230, 230);
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const ProfileImgDiv = styled.div`
  width: 34%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => {
    if (props.size === "small") {
      return css`
        height: 100%;
      `;
    }
  }}
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  ${props => {
    if (props.size === "small") {
      return css`
        height: 48px;
        width: 48px;
      `;
    }
  }}
`;

const ProfileInfoDiv = styled.div`
  width: 66%;
  height: 200px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${props => {
    if (props.size === "small") {
      return css`
        height: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
      `;
    }
  }}
`;

const Span = styled.div`
  ${props => {
    if (props.kind === "account") {
      return css`
        font-weight: 300;
        color: rgba(38, 38, 38);
        font-size: 28px;
        text-overflow: ellipsis;
      `;
    } else if (props.kind === "title") {
      return css`
        font-weight: 600;
        font-size: 16px;
        margin-top: 35px;
      `;
    } else if (props.kind === "nickname") {
      return css`
        font-weight: 400;
        font-size: 16px;
        margin-top: 3px;
      `;
    } else if (props.kind === "link") {
      return css`
        font-weight: 700;
        font-size: 16px;
        margin-top: 3px;
        color: #365f88;
      `;
    } else if (props.size === "small") {
      return css`
        font-weight: 700;
        font-size: 16px;
      `;
    } else if (props.size === "replyID") {
      return css`
        font-weight: bold;
        font-size: 14px;
      `;
    } else if (props.size === "reply") {
      return css`
        font-weight: 400;
        font-size: 14px;
      `;
    } else if (props.size === "replyDate") {
      return css`
        font-weight: 400;
        font-size: 12px;
        margin-top: 5px;
      `;
    }
  }}
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  jusify-content: center;
  align-items: center;
`;

const Main = styled.div`
  width: 95%;
  max-width: 1500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fafafa;
`;

const Container = styled.div`
  width: 470px;
  height: 260px;
  background-color: white;
  margin-top: 60px;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px rgba(200, 200, 200);
`;

const ImageDiv = styled.div`
  height: 200px;
  width: 300px;
  margin-top: -35px;
  margin-left: 10px;
`;

const Image = styled.img`
  height: 200px;
  width: 300px;
  background-color: #000000;
  border-radius: 10px;
  box-shadow: 0px 5px 5px 5px rgba(160, 160, 160);
`;

const UpperSide = styled.div`
  display: flex;
  justify-content: space-around;
`;

const WhoWhen = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  align-items: center;
`;

const LowerSide = styled.div`
  width: 100%;
  height: 70px;
  margin-top: 10px;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Home;