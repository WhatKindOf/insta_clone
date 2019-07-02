import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade, withStyles } from "@material-ui/core/styles";

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
  }
});

class User extends React.Component {
  state = {
    open: "none",
    date: new Date(),
    year: "",
    month: "",
    day: "",
    hour: ""
  };

  handleClickOpen = () => {
    this.setState({
      open: "flex"
    });
  };

  handleClickClose = () => {
    this.setState({
      open: "none"
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NavigationDiv>
          <NavigationContentDiv>
            <Left>
              <Button>
                <img src={require("./images/insta.png")} alt="home_button" />
              </Button>
              <Vl />
              <Span kind="home">InstaClone</Span>
            </Left>

            <div className={classes.search}>
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
              />
            </div>
            <Button>
              <img src={require("./images/user.png")} alt="user_button" />
            </Button>
          </NavigationContentDiv>
        </NavigationDiv>
        <Div>
          <Main>
            <ProfileDiv>
              <ProfileImgDiv>
                <ProfileImg
                  src={require("./images/profile.png")}
                  alt="profile_img"
                />
              </ProfileImgDiv>
              <ProfileInfoDiv>
                <Span kind="account">Parkhyoshin_official</Span>
                <Span kind="title">LOVERS2019_PARK HYO SHIN</Span>
                <Span kind="nickname">박효신</Span>
                <A href="www.lovers2019.com" target="_blank">
                  <Span kind="link">WWW.LOVERS2019.COM</Span>
                </A>
              </ProfileInfoDiv>
            </ProfileDiv>
            <Hr />
            <ContentDiv>
              <RowDiv>
                <ImageDiv>
                  <Button onClick={this.handleClickOpen}>
                    <Image src={require("./images/first.png")} alt="first" />
                  </Button>
                </ImageDiv>
              </RowDiv>
            </ContentDiv>
          </Main>
        </Div>

        <Dialog display={this.state.open}>
          <CloseButton onClick={this.handleClickClose}>
            <img src={require("./images/close.png")} alt="close" />
          </CloseButton>
          <DialogDiv>
            <DialogImgDiv>
              <DialogImg src={require("./images/first.png")} alt="img" />
            </DialogImgDiv>
            <DialogContentDiv>
              <DialogContentUpperDiv>
                <ProfileImgDiv size="small">
                  <ProfileImg
                    size="small"
                    src={require("./images/profile.png")}
                    alt="img"
                  />
                </ProfileImgDiv>
                <ProfileInfoDiv size="small">
                  <Span size="small">Parkhyoshin_official</Span>
                </ProfileInfoDiv>
              </DialogContentUpperDiv>
              <DialogContentMidDiv>
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
              </DialogContentMidDiv>
              <DialogContentLowerDiv>
                <Input
                  type="text"
                  name="reply"
                  placeholder="댓글을 입력하세요."
                />
              </DialogContentLowerDiv>
            </DialogContentDiv>
          </DialogDiv>
        </Dialog>
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

const Dialog = styled.div`
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
`;

const DialogImg = styled.img`
  width: 100%;
  height: 100%;
`;

const DialogContentDiv = styled.div`
  width: 36%;
  max-width: 600px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DialogContentUpperDiv = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  border-bottom: 1px solid rgba(230, 230, 230);
`;

const DialogContentMidDiv = styled.div`
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

const Left = styled.div`
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

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Vl = styled.div`
  display: block;
  width: 1px;
  background-color: #000;
  height: 32px;
  margin-left: 14px;
  margin-right: 14px;
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

const ProfileDiv = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
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
    } else if (props.kind === "home") {
      return css`
        font-weight: 700;
        font-size: 20px;
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

const A = styled.a`
  text-decoration: none;
`;

const Hr = styled.hr`
  width: 98%;
  max-width: 950px;
`;

const ContentDiv = styled.div`
  width: 100%;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ImageDiv = styled.div`
  width: auto;
  height: auto;
  max-width: 300px;
  max-height: 300px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

export default withStyles(styles)(User);
