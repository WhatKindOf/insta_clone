import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { post } from "axios";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  between: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  left: {
    color: "red",
    fontSize: 12,
    fontWeight: 600
  }
});

class Home extends React.Component {
  state = {
    open: "none",
    contentImg: "",
    content: "",
    profileImg: "",
    nickname: "",
    contentDate: "",
    email: "",
    deleteReply: false,
    contentID: "",
    contentEmail: "",
    replyNickname: "",
    replyImg: "",
    replyContent: "",
    replyDate: ""
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

  // removeDuplicates = objectArray => {
  //   let temp = {};

  //   for (let i = objectArray.length - 1; i >= 0; i--) {
  //     let so = JSON.stringify(objectArray[i]);

  //     if (temp[so]) {
  //       objectArray.splice(i, 1);
  //     } else {
  //       temp[so] = true;
  //     }
  //   }
  //   return objectArray;
  // };

  getReply = (contentID, email) => {
    this.getReplyAction(contentID, email)
      .then(res => {
        //const arr = this.removeDuplicates(res.data);
        this.props.setReply(res.data);
      })
      .catch(err => console.log("err : " + err));
  };

  getReplyAction = (contentID, email) => {
    const url = "/api/getReply";
    const data = {
      contentEmail: email,
      contentID: contentID
    };
    return post(url, data);
  };

  getCurrentDate = () => {
    const date = new Date();
    const DayOfWeek = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일"
    ];
    const currentDate =
      date.getFullYear() +
      "년 " +
      (date.getMonth() + 1) +
      "월 " +
      date.getDate() +
      "일 " +
      DayOfWeek[date.getDay()] +
      " " +
      date.getHours() +
      "시";

    return currentDate;
  };

  inputReply = replyContent => {
    this.inputReplyAction(replyContent)
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log("err : " + err));
  };

  inputReplyAction = async replyContent => {
    const currentDate = await this.getCurrentDate();

    const url = "/api/inputReply";
    const data = {
      contentID: this.state.contentID,
      contentEmail: this.state.email,
      replyID: this.props.account.email,
      replyNickname: this.props.account.nickname,
      replyImg: this.props.account.profileImg,
      replyContent: replyContent,
      replyDate: currentDate
    };

    this.props.inputNewReply(data);

    return post(url, data);
  };

  handleClickOpen = (
    contentImg,
    content,
    profileImg,
    nickname,
    contentDate,
    contentID,
    email
  ) => {
    this.setState({
      open: "flex",
      contentImg: contentImg,
      content: content,
      profileImg: profileImg,
      nickname: nickname,
      contentDate: contentDate,
      contentID: contentID,
      email: email
    });
    this.getReply(contentID, email);
  };

  handleClickClose = () => {
    this.setState({
      open: "none",
      contentImg: "",
      profileImg: "",
      nickname: "",
      content: "",
      contentDate: "",
      contentID: "",
      email: ""
    });
    this.props.resetReply();
  };

  closeDialog = () => {
    this.setState({
      deleteReply: false
    });
  };

  deleteReply = () => {
    this.deleteReplyAction()
      .then(response => {
        if (response.data.code === undefined) {
          this.closeDialog();
          this.getReply(this.state.contentID);
        }
      })
      .catch(err => console.log("err : " + err));
  };

  deleteReplyAction = () => {
    const url = "/api/deleteReply";
    const data = {
      contentID: this.state.contentID,
      contentEmail: this.state.contentEmail,
      replyNickname: this.state.replyNickname,
      replyImg: this.state.replyImg,
      replyContent: this.state.replyContent,
      replyDate: this.state.replyDate
    };

    return post(url, data);
  };

  openDeleteReply = (
    contentID,
    contentEmail,
    replyNickname,
    replyImg,
    replyContent,
    replyDate
  ) => {
    this.setState({
      deleteReply: true,
      contentID: contentID,
      contentEmail: contentEmail,
      replyNickname: replyNickname,
      replyImg: replyImg,
      replyContent: replyContent,
      replyDate: replyDate
    });
  };

  componentDidMount() {
    this.getContents();
  }

  render() {
    const { classes } = this.props;
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
                          <StyledButton
                            onClick={() =>
                              this.handleClickOpen(
                                c.contentImg,
                                c.content,
                                c.profileImg,
                                c.nickname,
                                c.contentDate,
                                c.contentID,
                                c.email
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
                          </StyledButton>
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
              {this.state.contentImg ? (
                <StyledDialogImg
                  src={this.state.contentImg}
                  alt="content_img"
                />
              ) : (
                <StyledDialogImg
                  src={require("./images/basic.png")}
                  alt="content_img"
                />
              )}
            </StyledDialogImgDiv>
            <StyledDialogContentDiv>
              <StyledDialogContentUpperDiv>
                <UpperAccountDiv>
                  <ProfileImgDiv size="small">
                    {this.state.profileImg === null ? (
                      <ProfileImg
                        size="small"
                        src={require("./images/default.png")}
                        alt="profile_img"
                      />
                    ) : (
                      <ProfileImg
                        size="small"
                        src={this.state.profileImg}
                        alt="profile_img"
                      />
                    )}
                  </ProfileImgDiv>
                  <ProfileInfoDiv size="small">
                    <Span size="small">{this.state.nickname}</Span>
                  </ProfileInfoDiv>
                </UpperAccountDiv>
                <UpperContentDiv>
                  <ContentsDiv>
                    <Span size="reply">{this.state.content}</Span>
                  </ContentsDiv>
                  <DateDiv>
                    <Span size="replyDate">{this.state.contentDate}</Span>
                  </DateDiv>
                </UpperContentDiv>
              </StyledDialogContentUpperDiv>
              <StyledDialogContentMidDiv>
                {this.props.reply.length !== 0
                  ? this.props.reply.map(r => {
                      return (
                        <ReplyContainer>
                          <ProfileImgDiv size="small">
                            {r.replyImg === null ? (
                              <ProfileImg
                                size="small"
                                src={require("./images/default.png")}
                                alt="img"
                              />
                            ) : (
                              <ProfileImg
                                size="small"
                                src={r.replyImg}
                                alt="img"
                              />
                            )}
                          </ProfileImgDiv>
                          <ReplyDiv>
                            <Span size="replyID">{r.replyNickname}</Span>
                            <Span size="reply">{r.replyContent}</Span>
                            <DateDeleteDiv>
                              <Span size="replyDate">{r.replyDate}</Span>
                              {r.replyID === this.props.account.email ? (
                                <StyledButton
                                  onClick={() =>
                                    this.openDeleteReply(
                                      r.contentID,
                                      r.contentEmail,
                                      r.replyNickname,
                                      r.replyImg,
                                      r.replyContent,
                                      r.replyDate
                                    )
                                  }
                                >
                                  <span className={classes.left}>삭제</span>
                                </StyledButton>
                              ) : (
                                ""
                              )}
                            </DateDeleteDiv>
                          </ReplyDiv>
                        </ReplyContainer>
                      );
                    })
                  : ""}
              </StyledDialogContentMidDiv>
              <StyledDialogContentLowerDiv>
                <Input
                  type="text"
                  name="reply"
                  placeholder="댓글을 입력하세요."
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      this.inputReply(e.target.value);
                    }
                  }}
                />
              </StyledDialogContentLowerDiv>
            </StyledDialogContentDiv>
          </StyledDialogDiv>
        </StyledDialog>

        <Dialog open={this.state.deleteReply}>
          <DialogTitle className={classes.center}>
            해당 댓글을 삭제하시겠습니까?
          </DialogTitle>
          <DialogActions className={classes.between}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.deleteReply}
            >
              삭제
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.closeDialog}
            >
              취소
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const DateDeleteDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
  height: 30%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(230, 230, 230);
`;

const UpperAccountDiv = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  border-bottom: 1px solid rgba(230, 230, 230);
`;

const UpperContentDiv = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
`;

const ContentsDiv = styled.div`
  width: 97%;
  height: 64%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateDiv = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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

const StyledButton = styled.button`
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

export default withStyles(styles)(Home);
