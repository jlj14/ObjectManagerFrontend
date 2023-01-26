import "./styles/App.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import SidebarMenu from "./components/Layout/SidebarMenu";
import RouterConfig from "./components/Layout/RouterConfig";

function App() {
  return (
    <div className="App" style={({ height: "100vh" }, { display: "flex" })}>
      <ToastContainer />
      <SidebarMenu />
      <div className="App-main">
        <RouterConfig />
      </div>
    </div>
  );
}

export default App;
