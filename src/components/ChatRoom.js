import React, {Component} from "react";
import SockJsClient from "react-stomp";
import {Button, Form, Grid, Header, Segment} from "semantic-ui-react";
import Messages from "./Messages";
import {connect} from "react-redux";
import axios from "axios";
import PrivateMessage from "./PrivateMessage";

export class ChatRoom extends Component {
  state = {
    typedMessage: "",
    allMessages: [],
  };

  componentDidMount() {
    axios
      .get(
        "http://localhost:8080/allMessages/" +
          this.props.userDetails.user.chatRoom
      )
      .then((response) => this.setState({ allMessages: response.data }))
      .catch((error) => console.log(error));
  }

  sendMessage = () => {
    this.clientRef.sendMessage(
      "/app/user-all",
      JSON.stringify({
        messageFrom: this.props.userDetails.user.name,
        messageText: this.state.typedMessage,
        messageTo: this.props.userDetails.user.chatRoom,
        userAvatar: this.props.userDetails.user.avatar,
      })
    );

    this.setState({ typedMessage: "" });
  };

  handleTypedMessage = (e) => {
    this.setState({ typedMessage: e.target.value });
  };

  roomClient = () => {
    return (
      <SockJsClient
        url="http://localhost:8080/websocket-chat/"
        topics={["/topic/" + this.props.userDetails.user.chatRoom]}
        onConnect={() => {
          console.log("Connected to room");
        }}
        onDisconnect={() => {
          console.log("Disconnected from room");
        }}
        onMessage={(msg) => {
          console.log(msg);
          this.setState({
            allMessages: [...this.state.allMessages, msg],
          });
        }}
        ref={(client) => {
          this.clientRef = client;
        }}
      />
    );
  };

  render() {
    return (
      <div className="chatRoom">
        {this.roomClient()}
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Button primary onClick={() => this.props.history.push("/")}>
                Back
              </Button>
              <Header>{this.props.userDetails.user.name}</Header>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header>
                Chat Room - {this.props.userDetails.user.chatRoom}
              </Header>
              <Segment color="teal" padded="very" className="messagesSegment">
                <Messages allMessages={this.state.allMessages} />
              </Segment>
            </Grid.Column>
            <Grid.Column width={7}>
              <PrivateMessage />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={7}>
              <Form onSubmit={this.sendMessage} reply>
                <Form.TextArea
                  value={this.state.typedMessage}
                  onChange={this.handleTypedMessage}
                />
                <Button
                  type="submit"
                  content="Send"
                  labelPosition="left"
                  icon="edit"
                  primary
                />
              </Form>
            </Grid.Column>
            <Grid.Column width={7}></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userDetails: state.userDetails };
};

export default connect(mapStateToProps)(ChatRoom);
