import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import TrackOverview from "@/pages/TrackOverview";
import TopicPage from "@/pages/TopicPage";
import TrophyPage from "@/pages/Trophy";
import SoundButton from "@/components/SoundButton";
import AnimatedBackground from "@/components/AnimatedBackground";

function App() {
  return (
    <div className="App relative">
      <AnimatedBackground type="default" />
      <SoundButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track/:trackId" element={<TrackOverview />} />
          <Route path="/topic/:trackId/:topicId" element={<TopicPage />} />
          <Route path="/trophy" element={<TrophyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
