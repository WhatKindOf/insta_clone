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
  }
});

class Appbar extends React.Component {
  state = {
    showOutNotice: "none",
    open: false,
    password: "",
    errorMessage: false
  };

  blockOutNotice = () => {
    this.setState({
      showOutNotice: "block"
    });
  };

  noneOutNotice = () => {
    this.setState({
      showOutNotice: "none"
    });
  };

  showDialog = () => {
    this.setState({
      open: true
    });
  };

  closeDialog = () => {
    this.setState({
      password: "",
      open: false
    });
  };

  handleClickClose = () => {
    this.setState({
      password: "",
      errorMessage: false
    });
  };

  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  deleteUser = () => {
    if (this.state.password === this.props.account.password) {
      this.deleteUserAction()
        .then(response => {
          if (response.data.code === undefined) {
            this.closeDialog();
            this.props.showLogin();
          } else if (response.data !== null) {
            console.log(response.data.code);
            console.log("Error 발생!");
            this.setState({
              password: ""
            });
          }
        })
        .catch(err => console.log("err : " + err));
    } else {
      this.setState({
        errorMessage: true
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
              <StyledButton
                onClick={this.props.showUser}
                className={classes.marginRight}
              >
                <img src={require("./images/user.png")} alt="user_button" />
              </StyledButton>
              <div>
                <StyledButton
                  onMouseOver={this.blockOutNotice}
                  onMouseOut={this.noneOutNotice}
                  onClick={this.showDialog}
                >
                  <img src={require("./images/out.png")} alt="exit_button" />
                </StyledButton>
                <UpArrow display={this.state.showOutNotice} />
                <OutNotice display={this.state.showOutNotice}>
                  <OutNoticeSentence>회원 탈퇴</OutNoticeSentence>
                </OutNotice>
              </div>

              <StyledButton onClick={this.props.logoutAction}>
                <img src={require("./images/exit.png")} alt="exit_button" />
              </StyledButton>
            </Right>
          </NavigationContentDiv>
        </NavigationDiv>
        {this.props.homeOrUser === "default" ? (
          <Home
            setContents={this.props.setContents}
            account={this.props.account}
            contents={this.props.contents}
          />
        ) : (
          <User
            setContents={this.props.setContents}
            account={this.props.account}
            contents={this.props.contents}
            editProfileImg={this.props.editProfileImg}
          />
        )}
        <Dialog open={this.state.open}>
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
              onClick={this.closeDialog}
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
      </Fragment>
    );
  }
}

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
  z-index: 2;
  padding: 9px;
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
`;

export default withStyles(styles)(Appbar);
