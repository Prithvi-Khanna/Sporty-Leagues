import React from "react";
import { League } from "./Constants";
import "./App.css";

function LeagueCard({
  league,
  onClick,
}: {
  league: League;
  onClick: (league: League) => void;
}) {
  return (
    <div className="league-card" onClick={() => onClick(league)}>
      <h2>{league.strLeague}</h2>
      <p>{league.strSport}</p>
      <h3>{league.strLeagueAlternate}</h3>
    </div>
  );
};

export default React.memo(LeagueCard);