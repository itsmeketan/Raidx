import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PlayerSelection from "./pages/PlayerSelection";
import Scorer from "./pages/Scorer";
import Viewer from "./pages/Viewer";
import AllMatches from "./pages/AllMatches";
import StartScore from "./pages/StartScore";
import Matches from "./pages/Matches";
import CreateTeam from "./pages/CreateTeam";
import MatchesType from "./pages/MatchesType";
import PlayerProfile from "./pages/PlayerProfile";
import Requests from "./pages/Requests";
import SelectTeams from "./pages/SelectTeams";
import HomeAuthenticated from "./pages/HomeAuthenticated";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/startscore" element={<StartScore />} />
        <Route path="/playerselection/:playerId" element={<PlayerSelection />} />
        <Route path="/scorer" element={<Scorer />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/match/:matchId" element={<AllMatches />} />
        <Route path="/createteam" element={<CreateTeam />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/requests" element={<Requests />} />
        {/* <Route path="/matches/:matchId" element={<MatchResult />} /> */}
        <Route path="/matchestype/:id" element={<MatchesType />} />
        <Route path="/createteam/:id" element={<CreateTeam />} />
        <Route path="/player/:playerId" element={<PlayerProfile />} />
        <Route path="/selectTeams/:id" element={<SelectTeams />} />
        <Route path="/home" element={<HomeAuthenticated />} />

      </Routes>

      <Footer />
    </>
  );
}
