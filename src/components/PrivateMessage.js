import React, {Component} from "react";
import SockJsClient from "react-stomp";
import {connect} from "react-redux";
import {Button, Form, Header, Item, Modal, Segment} from "semantic-ui-react";
import axios from "axios";
import {Link} from "react-router-dom";

export class PrivateMessage extends Component {
  state = {
    privateMessages: [],
    modalOpen: false,
    typedMessage: "",
    userSent: "",
  };

  componentDidMount() {
    axios
      .get(
        "http://localhost:8080/privateMessages/" +
          this.props.userDetails.user.name
      )
      .then((response) => this.setState({ privateMessages: response.data }))
      .catch((error) => console.log(error));
  }

  privateClient = () => {
    return (
      <SockJsClient
        url="http://localhost:8080/websocket-chat/"
        topics={["/topic/" + this.props.userDetails.user.name]}
        onConnect={() => {
          console.log("Özel mesaj bağlantısı kuruldu");
        }}
        onDisconnect={() => {
          console.log("Özel mesaj bağlantısı kesildi");
        }}
        onMessage={(msg) => {
          console.log(msg);
          this.setState({
            privateMessages: [...this.state.privateMessages, msg],
          });
        }}
        ref={(client) => {
          this.clientRef = client;
        }}
      />
    );
  };

  sendMessage = async () => {
    await this.clientRef.sendMessage(
      "/app/user-all",
      JSON.stringify({
        messageFrom: this.props.userDetails.user.name,
        messageText: this.state.typedMessage,
        messageTo: this.state.userSent,
        userAvatar: this.props.userDetails.user.avatar,
      })
    );

    this.setState({ typedMessage: "", userSent: "" });
  };

  handleTypedMessage = (e) => {
    this.setState({ typedMessage: e.target.value });
  };

  handleUserSent = (e) => {
    this.setState({ userSent: e.target.value });
  };

  render() {
    return (
      <div>
        {this.privateClient()}
        <Segment raised className="privateSegment">
          <Header>Send Private Message</Header>
          <Modal
            open={this.state.modalOpen}
            onClose={() => this.setState({ modalOpen: false })}
            onOpen={() => this.setState({ modalOpen: true })}
            size="tiny"
          >
            <Modal.Header>My Messages</Modal.Header>
            <Modal.Content scrolling>
              <Item.Group divided>
                {this.state.privateMessages.map((msg) => (
                  <Item>
                    <Item.Image size="mini" src={msg.userAvatar} />
                    <Item.Content verticalAlign="middle">
                      <Item.Header>{msg.messageFrom}</Item.Header>
                      <Item.Description>{msg.messageText}</Item.Description>
                      <Item.Extra>{msg.messageTime}</Item.Extra>
                    </Item.Content>
                  </Item>
                ))}
              </Item.Group>
            </Modal.Content>
          </Modal>
          <Form>
            <Form.Input
              fluid
              label="To"
              placeholder="Enter receiver's username"
              value={this.state.userSent}
              onChange={this.handleUserSent}
            />
            <Form.TextArea
              placeholder="Enter the message"
              value={this.state.typedMessage}
              onChange={this.handleTypedMessage}
            />
            <Button primary onClick={this.sendMessage}>
              Send
            </Button>
          </Form>
        </Segment>
        <span>
          <Button
            secondary
            floated="left"
            onClick={() => this.setState({ modalOpen: true })}
          >
            My Private Messages ({this.state.privateMessages.length})
          </Button>
          <Link to={`/search/${this.props.userDetails.user.name}`}>
            <Button
                secondary
                floated="left"
            >
            Search
          </Button>
          </Link>
          <Link to={`/statistics/${this.props.userDetails.user.name}`}>
            <Button
                secondary
                floated="left"
            >
            Statistics
          </Button>
          </Link>

        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userDetails: state.userDetails };
};

export default connect(mapStateToProps)(PrivateMessage);
