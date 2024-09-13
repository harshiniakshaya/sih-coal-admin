
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LBar from "./components/custom/SideNav/SideNav";
import Supervisors from "./pages/Supervisors/Supervisors";
import Operators from "./pages/Operators/Operators";
import Payroll from "./pages/Payroll/Payroll";
import Alerts from "./pages/Alerts/Alerts";
import Events from "./pages/Events/Events";
import Injuries from "./pages/Injuries/Injuries";
import Issues from "./pages/Issues/Issues";
import Tasks from "./pages/Tasks/Tasks";
// import Home from "./pages/Home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <LBar />
        <Routes>
          <Route path="/supervisors" element={<Supervisors />}/>
          <Route path="/operators" element={<Operators />}/>
          <Route path="/payroll" element={<Payroll /> }/>
          <Route path="/alerts" element={<Alerts /> }/>
          <Route path="/events" element={<Events /> }/>
          <Route path="/injuries" element={<Injuries /> }/>
          <Route path="/issues" element={<Issues /> }/>
          <Route path="/tasks" element={<Tasks /> }/>
          {/* <Route path="/" element={<Home />}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
