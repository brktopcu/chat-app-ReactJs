import React, { Component } from "react";
import SockJsClient from "react-stomp";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import Messages from "./Messages";
import { connect } from "react-redux";
import axios from "axios";

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

  render() {
    return (
      <div className="chatRoom">
        <SockJsClient
          url="http://localhost:8080/websocket-chat/"
          topics={["/topic/" + this.props.userDetails.user.chatRoom]}
          onConnect={() => {
            console.log("connected");
          }}
          onDisconnect={() => {
            console.log("Disconnected");
          }}
          onMessage={(msg) => {
            console.log(msg);
            this.setState({ allMessages: [...this.state.allMessages, msg] });
          }}
          ref={(client) => {
            this.clientRef = client;
          }}
        />

        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <Button primary onClick={() => this.props.history.push("/")}>
                Geri Dön
              </Button>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment color="teal" padded="very" className="messagesSegment">
                <Messages allMessages={this.state.allMessages} />
              </Segment>
            </Grid.Column>
            <Grid.Column width={5}></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column width={6}>
              <Form onSubmit={this.sendMessage} reply>
                <Form.TextArea
                  value={this.state.typedMessage}
                  onChange={this.handleTypedMessage}
                />
                <Button
                  type="submit"
                  content="Gönder"
                  labelPosition="left"
                  icon="edit"
                  primary
                />
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

export default connect(mapStateToProps)(ChatRoom);
