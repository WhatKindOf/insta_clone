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
                <Image src={require("./images/first.png")} alt="first" />
              </ImageDiv>
              <ImageDiv>
                <Image src={require("./images/second.png")} alt="second" />
              </ImageDiv>
              <ImageDiv>
                <Image src={require("./images/fourth.png")} alt="fourth" />
              </ImageDiv>
            </RowDiv>
            <RowDiv>
              <ImageDiv>
                <Image src={require("./images/first.png")} alt="first" />
              </ImageDiv>
              <ImageDiv>
                <Image src={require("./images/second.png")} alt="second" />
              </ImageDiv>
              <ImageDiv>
                <Image src={require("./images/fourth.png")} alt="fourth" />
              </ImageDiv>
            </RowDiv>
          </ContentDiv>
        </Main>
      </Fragment>
    );
  }
}

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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
`;

const ProfileDiv = styled.div`
  width: 950px;
  height: 200px;
  background-color: #fafafa;
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ProfileImgDiv = styled.div`
  width: 320px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const ProfileInfoDiv = styled.div`
  width: 600px;
  height: 200px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    }
  }}
`;

const A = styled.a`
  text-decoration: none;
`;

const Hr = styled.hr`
  width: 950px;
`;

const ContentDiv = styled.div`
  width: 950px;
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
