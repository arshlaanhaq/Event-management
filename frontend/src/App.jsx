import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import EventDetails from "./pages/EventDetail"
import Dashboard from "./pages/Dashboard"
import CreateEvent from "./pages/CreateEvent"
import UpdateEvent from "./pages/UpdateEvent"

const AppRouter = () => {
    return (

            <Router>

                <Routes>

                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/event/:id" element={<EventDetails/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/create-event" element={<CreateEvent/>}/>
                    <Route path="/update-event/:id" element={<UpdateEvent />} />
                </Routes>
            </Router>

    );
};

export default AppRouter;
