import { League } from "./Constants";

export default function LeagueModal({
  league,
  leagueImage,
  loading,
  onClose,
}: {
  league: League;
  leagueImage: string | null;
  loading: boolean;
  onClose: () => void;
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="modal-close">
          ✕
        </button>
        <h2>{league.strLeague}</h2>
        {loading ? (
          <div className="text-center py-6">Loading image...</div>
        ) : leagueImage ? (
          <img
            src={leagueImage}
            alt={league.strLeague}
            className="league-img"
          />
        ) : (
          <p className="text-gray-500 text-center">No image available</p>
        )}
        <p className="text-gray mt-2 text-center">{league.strSport}</p>
      </div>
    </div>
  );
}
