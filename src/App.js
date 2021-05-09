import "./App.css";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/chat" component={ChatRoom} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
