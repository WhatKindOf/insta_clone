import React, { Fragment } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade, withStyles } from "@material-ui/core/styles";
import styled, { css } from "styled-components";
import { post } from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Home from "./Home";
import User from "./User";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  marginRight: {
    marginRight: 15
  },
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
  }
});

class Appbar extends React.Component {
  state = {
    showOutNotice: "none",
    showWriteNotice: "none",
    showMyPage: "none",
    showLogoutNotice: "none",
    out: false,
    write: false,
    password: "",
    errorMessage: false,
    file: null,
    fileName: "",
    imgSrc: "",
    countOfText: 0,
    contentText: "",
    backSpace: false,
    contentID: ""
  };

  reset = () => {
    this.setState({
      file: null,
      fileName: "",
      imgSrc: ""
    });
  };

  handleFileChange = e => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
      imgSrc: URL.createObjectURL(e.target.files[0]) // 불러온 이미지 미리보기하기 위한 url
    });
  };

  showWriteDialog = () => {
    this.getContentID();
    this.setState({
      write: true
    });
  };

  closeWriteDialog = () => {
    this.setState({
      file: null,
      fileName: "",
      write: false,
      imgSrc: "",
      contentText: "",
      countOfText: 0
    });
  };

  blockNotice = value => {
    if (value === "write") {
      this.setState({
        showWriteNotice: "block"
      });
    } else if (value === "out") {
      this.setState({
        showOutNotice: "block"
      });
    } else if (value === "mypage") {
      this.setState({
        showMyPage: "block"
      });
    } else if (value === "logout") {
      this.setState({
        showLogoutNotice: "block"
      });
    }
  };

  noneNotice = value => {
    if (value === "write") {
      this.setState({
        showWriteNotice: "none"
      });
    } else if (value === "out") {
      this.setState({
        showOutNotice: "none"
      });
    } else if (value === "mypage") {
      this.setState({
        showMyPage: "none"
      });
    } else if (value === "logout") {
      this.setState({
        showLogoutNotice: "none"
      });
    }
  };

  showOutDialog = () => {
    this.setState({
      out: true
    });
  };

  closeOutDialog = () => {
    this.setState({
      password: "",
      out: false,
      countOfText: 0
    });
  };

  handleClickClose = () => {
    this.setState({
      password: "",
      errorMessage: false
    });
  };

  handleValueChange = e => {
    if (this.state.backSpace || e.target.textLength <= 50) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
      this.setState({
        countOfText: e.target.textLength
      });
    }
  };

  getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear() + "";
    const currentDate =
      year.substr(2, 2) +
      "년 " +
      (date.getMonth() + 1) +
      "월 " +
      date.getDate() +
      "일 " +
      date.getHours() +
      ":" +
      date.getMinutes();

    return currentDate;
  };

  writeContent = () => {
    this.writeContentAction()
      .then(response => {
        const newContent = {
          content: response.data[3],
          contentDate: response.data[4],
          contentID: response.data[0],
          contentImg: response.data[2],
          email: this.props.account.email,
          nickname: this.props.account.nickname,
          profileImg: this.props.account.profileImg
        };
        this.closeWriteDialog();
        this.props.inputNewContent(newContent);
      })
      .catch(err => console.log("err : " + err));
  };

  initContentID = () => {
    this.setState({
      contentID: 1
    });
  };

  plusContentID = plus => {
    this.setState({
      contentID: plus + 1
    });
  };

  getContentID = async () => {
    this.getContentIDAction().then(response => {
      if (response.data[0].contentID === null) {
        this.initContentID();
      } else {
        this.plusContentID(response.data[0].contentID);
      }
    });
  };

  getContentIDAction = () => {
    const url = "/api/getContentID";
    const data = {
      email: this.props.account.email
    };
    return post(url, data);
  };

  writeContentAction = async () => {
    const currentDate = await this.getCurrentDate();

    const url = "/api/writeContent";
    const formData = new FormData();
    formData.append("contentID", this.state.contentID);
    formData.append("email", this.props.account.email);
    formData.append("contentImg", this.state.file);
    formData.append("content", this.state.contentText);
    formData.append("contentDate", currentDate);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  };

  deleteUser = () => {
    if (this.state.password === this.props.account.password) {
      this.deleteUserAction()
        .then(response => {
          if (response.data.code === undefined) {
            this.closeOutDialog();
            this.props.showLogin();
          } else if (response.data !== null) {
            console.log(response.data.code);
            console.log("Error 발생!");
            this.setState({
              password: "",
              countOfText: 0
            });
          }
        })
        .catch(err => console.log("err : " + err));
    } else {
      this.setState({
        errorMessage: true,
        countOfText: 0
      });
    }
  };

  deleteUserAction = () => {
    const url = "/api/deleteUser";
    const data = {
      email: this.props.account.email,
      password: this.state.password
    };
    return post(url, data);
  };

  search = value => {
    this.callApi(value)
      .then(res => {
        this.props.setContents(res.data);
      })
      .catch(err => console.log("err : " + err));
  };

  callApi = async value => {
    const url = "/api/search";
    const data = {
      value: "%" + value + "%"
    };
    return post(url, data);
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NavigationDiv>
          <NavigationContentDiv>
            <Left>
              <StyledButton onClick={this.props.showHome}>
                <img src={require("./images/insta.png")} alt="home_button" />
              </StyledButton>
              <Vl />
              <Span kind="home">InstaClone</Span>
            </Left>

            <Search
              homeOrUser={this.props.homeOrUser}
              className={classes.search}
            >
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "Search" }}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    this.search(e.target.value);
                  }
                }}
              />
            </Search>
            <Right>
              <div>
                <StyledButton
                  onMouseOver={() => this.blockNotice("mypage")}
                  onMouseOut={() => this.noneNotice("mypage")}
                  onClick={this.props.showUser}
                  className={classes.marginRight}
                >
                  <img src={require("./images/user.png")} alt="user_button" />
                </StyledButton>
                <UpArrow display={this.state.showMyPage} />
                <OutNotice display={this.state.showMyPage}>
                  <OutNoticeSentence>My Page</OutNoticeSentence>
                </OutNotice>
              </div>

              <div>
                <StyledButton
                  onMouseOver={() => this.blockNotice("write")}
                  onMouseOut={() => this.noneNotice("write")}
                  onClick={this.showWriteDialog}
                >
                  <img
                    src={require("./images/camera.png")}
                    alt="write_button"
                  />
                </StyledButton>
                <UpArrow display={this.state.showWriteNotice} />
                <OutNotice display={this.state.showWriteNotice}>
                  <OutNoticeSentence>타임라인 작성</OutNoticeSentence>
                </OutNotice>
              </div>

              <div>
                <StyledButton
                  onMouseOver={() => this.blockNotice("out")}
                  onMouseOut={() => this.noneNotice("out")}
                  onClick={this.showOutDialog}
                >
                  <img src={require("./images/out.png")} alt="exit_button" />
                </StyledButton>
                <UpArrow display={this.state.showOutNotice} />
                <OutNotice display={this.state.showOutNotice}>
                  <OutNoticeSentence>회원 탈퇴</OutNoticeSentence>
                </OutNotice>
              </div>

              <div>
                <StyledButton
                  onMouseOver={() => this.blockNotice("logout")}
                  onMouseOut={() => this.noneNotice("logout")}
                  onClick={this.props.logoutAction}
                >
                  <img src={require("./images/exit.png")} alt="exit_button" />
                </StyledButton>
                <UpArrow display={this.state.showLogoutNotice} />
                <OutNotice display={this.state.showLogoutNotice}>
                  <OutNoticeSentence>Logout</OutNoticeSentence>
                </OutNotice>
              </div>
            </Right>
          </NavigationContentDiv>
        </NavigationDiv>

        {this.props.homeOrUser === "default" ? (
          <Home
            setContents={this.props.setContents}
            account={this.props.account}
            contents={this.props.contents}
            setReply={this.props.setReply}
            reply={this.props.reply}
            resetReply={this.props.resetReply}
            inputNewReply={this.props.inputNewReply}
          />
        ) : (
          <User
            setContents={this.props.setContents}
            account={this.props.account}
            contents={this.props.contents}
            editProfileImg={this.props.editProfileImg}
            setReply={this.props.setReply}
            reply={this.props.reply}
            resetReply={this.props.resetReply}
            inputNewReply={this.props.inputNewReply}
          />
        )}

        <Dialog open={this.state.out}>
          <DialogTitle className={classes.center}>회원 탈퇴</DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              label="비밀번호 확인"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleValueChange}
            />
          </DialogContent>
          <DialogActions className={classes.between}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.deleteUser}
            >
              탈퇴
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.closeOutDialog}
            >
              취소
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.errorMessage} onClose={this.handleClickClose}>
          <DialogTitle className={classes.center}>
            비밀번호가 일치하지 않습니다!
          </DialogTitle>
        </Dialog>

        <Dialog open={this.state.write}>
          <DialogTitle className={classes.center}>타임라인 작성</DialogTitle>
          <DialogContent>
            <WriteImgDiv>
              {this.state.file ? (
                <Fragment>
                  <WriteImg src={this.state.imgSrc} alt="write_img" />
                  <StyledButton onClick={this.reset} what="delete">
                    <img
                      src={require("./images/delete.png")}
                      alt="delete_button"
                    />
                  </StyledButton>
                </Fragment>
              ) : (
                <Fragment>
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
                    <Button component="span" name="file">
                      <img
                        src={require("./images/plus.png")}
                        alt="add_img_button"
                      />
                    </Button>
                  </label>
                </Fragment>
              )}
            </WriteImgDiv>
            <WriteTextarea
              name="contentText"
              rows="3"
              placeholder="타임라인 작성"
              value={this.state.contentText}
              onKeyDown={e => {
                if (e.keyCode === 8) {
                  this.setState({
                    backSpace: true
                  });
                } else {
                  this.setState({
                    backSpace: false
                  });
                }
              }}
              onChange={this.handleValueChange}
            />
            <LimitDiv>
              <TextLimitDiv>
                <span>({this.state.countOfText} / 50)</span>
              </TextLimitDiv>
            </LimitDiv>
          </DialogContent>
          <DialogActions className={classes.between}>
            <Button
              onClick={this.writeContent}
              variant="contained"
              color="primary"
            >
              등록
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.closeWriteDialog}
            >
              취소
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const TextLimitDiv = styled.div`
  background-color: gray;
  padding: 5px;
  border: none;
  border-radius: 5px;
  color: white;
`;

const LimitDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 5px;
`;

const WriteTextarea = styled.textarea`
  width: 386px;
  resize: none;
  outline: none;
  padding: 0 9px;
  margin-top: 15px;
  line-height: 45px;
  border: 7px solid gray;
  border-radius: 5px;
  color: black;
  font-size: 18px;
  font-weight: 600;
  &::-webkit-input-placeholder {
    color: gray;
    font-size: 18px;
    font-weight: 600;
  }
`;

const WriteImg = styled.img`
  width: 100%;
  height: 100%;
`;

const WriteImgDiv = styled.div`
  width: 400px;
  height: 400px;
  border: 7px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UpArrow = styled.div`
  margin-left: 15px;
  margin-top: 4px;
  position: absolute;
  width: 0px;
  height: 0px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 9px solid black;
  ${props => {
    return css`
      display: ${props.display};
    `;
  }}
`;

const OutNotice = styled.div`
  border: 3px solid #000;
  position: absolute;
  margin-top: 13px;
  margin-left: -22px;
  border-radius: 9px;
  z-index: 10;
  padding: 3px;
  ${props => {
    return css`
      display: ${props.display};
    `;
  }}
`;

const OutNoticeSentence = styled.span`
  font-weight: bold;
  color: black;
`;

const Search = styled.div`
  ${props => {
    if (props.homeOrUser === "user") {
      return css`
        display: none;
      `;
    }
  }}
`;

const Span = styled.div`
  ${props => {
    if (props.kind === "home") {
      return css`
        font-weight: 700;
        font-size: 20px;
      `;
    }
  }}
`;

const Left = styled.div`
  display: flex;
`;

const Right = styled.div`
  display: flex;
`;

const NavigationDiv = styled.div`
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(230, 230, 230);
`;

const NavigationContentDiv = styled.div`
  width: 950px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Vl = styled.div`
  display: block;
  width: 1px;
  background-color: #000;
  height: 32px;
  margin-left: 14px;
  margin-right: 14px;
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
        margin-top: -180px;
        margin-left: 180px;
      `;
    }
  }}
`;

export default withStyles(styles)(Appbar);
