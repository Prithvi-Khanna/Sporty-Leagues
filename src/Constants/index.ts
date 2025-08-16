export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
}

export interface AllLeaguesResponse {
  leagues: League[];
}

export interface Season {
  strSeason: string;
  strBadge?: string;
}

export interface LeagueSeasonsResponse {
  seasons: Season[];
}
