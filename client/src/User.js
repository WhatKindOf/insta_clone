import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { post } from "axios";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
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
  hidden: {
    display: "none"
  },
  left: {
    color: "red",
    fontSize: 12,
    fontWeight: 600
  }
});

class User extends React.Component {
  state = {
    open: "none",
    contentImg: "",
    nickname: "",
    content: "",
    contentDate: "",
    delete: false,
    edit: "none",
    editOpen: false,
    file: "",
    fileName: "",
    imgSrc: "",
    email: "",
    deleteReply: false,
    contentID: "",
    contentEmail: "",
    replyNickname: "",
    replyImg: "",
    replyContent: "",
    replyDate: ""
  };

  handleFileChange = e => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
      imgSrc: URL.createObjectURL(e.target.files[0]) // 불러온 이미지 미리보기하기 위한 url
    });
  };

  getContents = () => {
    this.callApi()
      .then(res => {
        this.props.setContents(res.data);
      })
      .catch(err => console.log("err : " + err));
  };

  callApi = () => {
    const url = "/api/contents";
    const data = {
      email: this.props.account.email
    };
    return post(url, data);
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

  getReply = contentID => {
    this.getReplyAction(contentID)
      .then(res => {
        //const arr = this.removeDuplicates(res.data);
        this.props.setReply(res.data);
      })
      .catch(err => console.log("err : " + err));
  };

  getReplyAction = contentID => {
    const url = "/api/getReply";
    const data = {
      contentEmail: this.props.account.email,
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
      replyNickname: this.props.account.nickname,
      replyImg: this.props.account.profileImg,
      replyContent: replyContent,
      replyDate: currentDate
    };

    this.props.inputNewReply(data);

    return post(url, data);
  };

  handleClickOpen = (contentImg, content, contentDate, contentID, email) => {
    this.setState({
      open: "flex",
      contentImg: contentImg,
      content: content,
      contentDate: contentDate,
      contentID: contentID,
      email: email
    });
    this.getReply(contentID);
  };

  handleClickClose = () => {
    this.setState({
      open: "none",
      contentImg: "",
      nickname: "",
      content: "",
      contentDate: ""
    });
    this.props.resetReply();
  };

  showEdit = () => {
    this.setState({
      edit: "block"
    });
  };

  closeEdit = () => {
    this.setState({
      edit: "none"
    });
  };

  showDialog = contentID => {
    this.setState({
      delete: true,
      contentID: contentID
    });
  };

  closeDialog = () => {
    this.setState({
      delete: false,
      deleteReply: false
    });
  };

  showEditDialog = () => {
    this.setState({
      editOpen: true
    });
  };

  closeEditDialog = () => {
    this.setState({
      file: null,
      fileName: "",
      editOpen: false,
      imgSrc: ""
    });
  };

  deleteContent = () => {
    this.deleteContentAction()
      .then(response => {
        if (response.data.code === undefined) {
          this.closeDialog();
          this.getContents();
        }
      })
      .catch(err => console.log("err : " + err));
  };

  deleteContentAction = () => {
    const url = "/api/deleteContent";
    const data = {
      contentID: this.state.contentID,
      email: this.props.account.email
    };
    return post(url, data);
  };

  refreshAccountAction = () => {
    const url = "/api/login";
    const data = {
      email: this.props.account.email,
      password: this.props.account.password
    };

    return post(url, data);
  };

  refreshAccount = () => {
    this.refreshAccountAction().then(response => {
      const account = {
        email: response.data[0].email,
        name: response.data[0].name,
        nickname: response.data[0].nickname,
        password: response.data[0].password,
        title: response.data[0].title,
        profileImg: response.data[0].profileImg
      };
      this.props.editProfileImg(account);
    });
  };

  editProfileImg = () => {
    const url = "/api/editProfileImg";
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("email", this.props.account.email);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.editProfileImg().then(response => {
      this.refreshAccount();
      this.closeEditDialog();
    });
    this.setState({
      file: null,
      fileName: "",
      editOpen: false
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

  componentWillMount() {
    this.getContents();
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Div>
          <Main>
            <ProfileBackDiv>
              <ProfileBackImg
                src={require("./images/profileBackground.png")}
                alt="profile_backImg"
              />
            </ProfileBackDiv>
            <ProfileDiv>
              <ProfileImgDiv>
                <EditImgButton
                  onMouseOver={this.showEdit}
                  onMouseOut={this.closeEdit}
                  onClick={this.showEditDialog}
                >
                  <EditImg
                    display={this.state.edit}
                    src={require("./images/edit.png")}
                    alt="edit_img"
                  />
                </EditImgButton>
                {this.props.account.profileImg ? (
                  <ProfileImg
                    src={this.props.account.profileImg}
                    alt="profile_img"
                  />
                ) : (
                  <ProfileImg
                    src={require("./images/default.png")}
                    alt="profile_img"
                  />
                )}
              </ProfileImgDiv>
              <ProfileInfoDiv>
                <Span kind="account">{this.props.account.nickname}</Span>
                <Span kind="name">{this.props.account.name}</Span>
              </ProfileInfoDiv>
            </ProfileDiv>
            <Hr />
            <ContentDiv>
              {this.props.contents.length !== 0
                ? this.props.contents.map(c => {
                    return (
                      <ImageDiv>
                        <StyledButton
                          onClick={() => this.showDialog(c.contentID)}
                          what="delete"
                        >
                          <img
                            src={require("./images/delete.png")}
                            alt="delete_button"
                          />
                        </StyledButton>
                        <StyledButton
                          onClick={() =>
                            this.handleClickOpen(
                              c.contentImg,
                              c.content,
                              c.contentDate,
                              c.contentID,
                              c.email
                            )
                          }
                        >
                          {c.contentImg ? (
                            <Image src={c.contentImg} alt="content_img" />
                          ) : (
                            <Image
                              src={require("./images/basic.png")}
                              alt="content_img"
                            />
                          )}
                        </StyledButton>
                      </ImageDiv>
                    );
                  })
                : ""}
            </ContentDiv>
          </Main>
        </Div>

        <StyledDialog display={this.state.open}>
          <CloseButton onClick={this.handleClickClose}>
            <img src={require("./images/close.png")} alt="close" />
          </CloseButton>
          <DialogDiv>
            <DialogImgDiv>
              {this.state.contentImg ? (
                <DialogImg src={this.state.contentImg} alt="content_img" />
              ) : (
                <DialogImg
                  src={require("./images/basic.png")}
                  alt="content_img"
                />
              )}
            </DialogImgDiv>
            <DialogContentDiv>
              <DialogContentUpperDiv>
                <UpperAccountDiv>
                  <ProfileImgDiv size="small">
                    {this.props.account.profileImg !== null ? (
                      <ProfileImg
                        size="small"
                        src={this.props.account.profileImg}
                        alt="profile_img"
                      />
                    ) : (
                      <ProfileImg
                        size="small"
                        src={require("./images/default.png")}
                        alt="profile_img"
                      />
                    )}
                  </ProfileImgDiv>
                  <ProfileInfoDiv size="small">
                    <Span size="small">{this.props.account.nickname}</Span>
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
              </DialogContentUpperDiv>
              <DialogContentMidDiv>
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
              </DialogContentMidDiv>
              <DialogContentLowerDiv>
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
              </DialogContentLowerDiv>
            </DialogContentDiv>
          </DialogDiv>
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

        <Dialog open={this.state.delete}>
          <DialogTitle className={classes.center}>
            게시물을 삭제하시겠습니까?
          </DialogTitle>
          <DialogActions className={classes.between}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.deleteContent}
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

        <Dialog open={this.state.editOpen}>
          <DialogTitle className={classes.center}>변경할 사진 선택</DialogTitle>
          <DialogContent>
            <input
              className={classes.hidden}
              accept="image/*"
              id="raised-button-file"
              type="file"
              file={this.state.file}
              value={this.state.fileName}
              onChange={this.handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                name="file"
              >
                {this.state.fileName === ""
                  ? "프로필 이미지 선택"
                  : this.state.fileName}
              </Button>
            </label>
            <ProfileImgDiv>
              {this.state.file ? (
                <ProfileImg
                  src={this.state.imgSrc}
                  size="preview"
                  alt="img_preview"
                />
              ) : (
                ""
              )}
            </ProfileImgDiv>
          </DialogContent>
          <DialogActions className={classes.between}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              변경
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.closeEditDialog}
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
  margin-top: 25px;
  margin-bottom: 25px;
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
  &:focus {
    outline: none;
  }
`;

const DialogDiv = styled.div`
  width: 95%;
  height: 55%;
  max-height: 600px;
  max-width: 935px;
  display: flex;
`;

const DialogImgDiv = styled.div`
  width: 64%;
  height: auto;
  max-width: 600px;
  background-color: #000000;
`;

const DialogImg = styled.img`
  width: 100%;
  height: 100%;
`;

const DialogContentDiv = styled.div`
  width: 36%;
  height: auto;
  max-width: 335px;
  max-height: 600px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DialogContentUpperDiv = styled.div`
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

const DialogContentMidDiv = styled.div`
  width: 100%;
  height: 60%;
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

const DialogContentLowerDiv = styled.div`
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
  ${props => {
    if (props.what === "delete") {
      return css`
        position: absolute;
        margin-top: -130px;
        margin-left: 130px;
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
  max-width: 950px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
`;

const ProfileBackDiv = styled.div`
  height: 400px;
  width: 100%;
`;

const ProfileBackImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ProfileDiv = styled.div`
  margin-top: -400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
`;

const ProfileImgDiv = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => {
    if (props.size === "small") {
      return css`
        width: 36%;
        height: 100%;
      `;
    }
  }}
`;

const ProfileImg = styled.img`
  width: 190px;
  height: 190px;
  border-radius: 50%;
  border: 7px solid white;
  ${props => {
    if (props.size === "small") {
      return css`
        height: 48px;
        width: 48px;
      `;
    } else if (props.size === "preview") {
      return css`
        border: 7px solid gray;
        margin: 15px 0px;
      `;
    }
  }}
`;

const EditImgButton = styled.button`
  position: absolute;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const EditImg = styled.img`
  ${props => {
    return css`
      display: ${props.display};
    `;
  }}
`;

const ProfileInfoDiv = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  ${props => {
    if (props.size === "small") {
      return css`
        width: 64%;
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
        font-weight: 700;
        color: white;
        font-size: 46px;
        margin-bottom: 15px;
        text-overflow: ellipsis;
      `;
    } else if (props.kind === "title") {
      return css`
        font-weight: 600;
        font-size: 20x;
        margin-top: 30px;
      `;
    } else if (props.kind === "name") {
      return css`
        font-weight: 400;
        font-size: 24px;
        color: white;
        margin-top: 3px;
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

const Hr = styled.hr`
  width: 98%;
  max-width: 950px;
`;

const ContentDiv = styled.div`
  width: 100%;
  background-color: #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ImageDiv = styled.div`
  width: 300px;
  height: 300px;
  border: 2px solid gray;
  border-radius: 10px;
  box-shadow: 0px 5px 5px 5px gray;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

export default withStyles(styles)(User);
