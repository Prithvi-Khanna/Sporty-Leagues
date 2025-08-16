import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AllLeaguesResponse, League, LeagueSeasonsResponse } from "./Constants";
import LeagueCard from "./LeagueCard";
import LeagueModal from "./LeagueModal";
import "./App.css";

export default function SportsLeagues() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

  const imageCache = useRef<Record<string, string | null>>({});
  const [leagueImage, setLeagueImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const fetchLeagues = async () => {
    try {
      const res = await fetch(
        "https://www.thesportsdb.com/api/v1/json/3/all_leagues.php"
      );
      if (!res.ok) throw new Error("Failed to fetch leagues");
      const data: AllLeaguesResponse = await res.json();
      setLeagues(data.leagues || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagueImage = useCallback(async (leagueId: string) => {
    if (imageCache.current[leagueId]) {
      setLeagueImage(imageCache.current[leagueId]);
      return;
    }
    setImageLoading(true);
    try {
      const res = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`
      );
      if (!res.ok) throw new Error("Failed to fetch league image");
      const data: LeagueSeasonsResponse = await res.json();
      const badge = data.seasons?.[0]?.strBadge || null;
      imageCache.current[leagueId] = badge;
      setLeagueImage(badge);
    } catch {
      imageCache.current[leagueId] = null;
      setLeagueImage(null);
    } finally {
      setImageLoading(false);
    }
  }, []);

  const filteredLeagues = useMemo(
    () =>
      leagues.filter(
        (league) =>
          league.strLeague.toLowerCase().includes(search.toLowerCase()) &&
          (filter === "All" || league.strSport === filter)
      ),
    [leagues, search, filter]
  );

  const handleLeagueClick = useCallback(
    (league: League) => {
      setSelectedLeague(league);
      fetchLeagueImage(league.idLeague);
    },
    [fetchLeagueImage]
  );

  if (loading) {
    return <div className="center-screen">Loading leagues...</div>;
  }

  if (error) {
    return <div className="text-center text-red mt-10">{error}</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Sports Leagues</h1>
      </header>
      <div className="app-container">
        <main className="main-content">
          <div className="controls">
            <input
              type="text"
              placeholder="Search leagues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-box"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-box"
            >
              <option value="All">All Sports</option>
              {[...new Set(leagues.map((l) => l.strSport))].map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>
          <div className="grid">
            {filteredLeagues.map((league) => (
              <LeagueCard
                key={league.idLeague}
                league={league}
                onClick={handleLeagueClick}
              />
            ))}
          </div>
        </main>
        {selectedLeague && (
          <LeagueModal
            league={selectedLeague}
            leagueImage={leagueImage}
            loading={imageLoading}
            onClose={() => setSelectedLeague(null)}
          />
        )}
      </div>
    </div>
  );
}
