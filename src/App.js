import "./App.css";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import store from "./store";
import {Search} from "./components/Search";
import {Statistics} from "./components/Statistics";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/chat" component={ChatRoom} />
            <Route path="/search/:username" component={Search} />
            <Route path="/statistics/:username" component={Statistics} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
