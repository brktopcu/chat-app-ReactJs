import React, {Component} from "react";
import {connect} from "react-redux";
import {setDataAction} from "../actions";
import {Button, Form, Grid, Image, Item, Radio} from "semantic-ui-react";

export class Login extends Component {
  state = {
    name: "",
    chatRoom: "",
    avatar: "",
    avatarOptions: [
      "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
      "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
      "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
      "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
    ],
  };

  handleName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleChatRoom = (e) => {
    this.setState({ chatRoom: e.target.value });
  };
  handleRadioChange = (e, { value }) => {
    this.setState({ avatar: value });
  };

  handleConnect = async () => {
    const { name, chatRoom, avatar } = this.state;
    if (name && chatRoom && avatar) {
      await this.props.setDataAction({ name, chatRoom, avatar });
      this.props.history.push("/chat");
    }
  };

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column width={6}>
              <Form className="loginForm">
                <Form.Input
                  fluid
                  label="Name"
                  placeholder="Enter your name"
                  value={this.state.name}
                  onChange={this.handleName}
                />
                <Form.Input
                  fluid
                  label="Chat Room"
                  placeholder="Enter the chat room you want to connect to"
                  value={this.state.chatRoom}
                  onChange={this.handleChatRoom}
                />
                <Item.Group divided>
                  <h5>Choose Avatar</h5>
                  {this.state.avatarOptions.map((option) => (
                    <Item>
                      <Item.Image size="mini">
                        <Image src={option} size="mini" circular />
                      </Item.Image>
                      <Item.Content verticalAlign="middle">
                        <Form.Field>
                          <Radio
                            name="radioGroup"
                            value={option}
                            checked={this.state.avatar === option}
                            onChange={this.handleRadioChange}
                          />
                        </Form.Field>
                      </Item.Content>
                    </Item>
                  ))}
                </Item.Group>
                <Button primary onClick={this.handleConnect}>
                  Connect
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Column width={5}></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userDetails: state.userDetails };
};

export default connect(mapStateToProps, { setDataAction })(Login);
