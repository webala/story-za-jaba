import { useGame } from '../providers/GameProvider'
import './PersistentLeaderboard.css'

export default function PersistentLeaderboard() {
  const { viewerLeaderboard } = useGame()

  // Get top 5 leaderboard entries
  const leaderboardEntries = Array.from(viewerLeaderboard.entries())
    .map(([username, data]) => ({ username, ...data }))
    .sort((a, b) => {
      // Sort by points (descending), then by accuracy (descending)
      if (b.points !== a.points) return b.points - a.points
      const aAccuracy = a.totalVotes > 0 ? a.correctVotes / a.totalVotes : 0
      const bAccuracy = b.totalVotes > 0 ? b.correctVotes / b.totalVotes : 0
      return bAccuracy - aAccuracy
    })
    .slice(0, 5) // Top 5

    console.log('leaderboardEntries', leaderboardEntries)

  if (leaderboardEntries.length === 0) {
    return null // Don't show leaderboard if no votes yet
  }

  return (
    <div className="persistent-leaderboard">
      <h3>
        🏆 Leaderboard
      </h3>
      
      <div className="leaderboard-header">
        <div className="header-rank">Rank</div>
        <div className="header-player">Player</div>
        <div className="header-points">Points</div>
        <div className="header-accuracy">Accuracy</div>
      </div>
      
      <div className="leaderboard-entries">
        {leaderboardEntries.map((entry, index) => {
          const accuracy = entry.totalVotes > 0 ? Math.round((entry.correctVotes / entry.totalVotes) * 100) : 0
          return (
            <div key={entry.username} className={`leaderboard-entry ${index < 3 ? 'top-three' : ''}`}>
              <div className="entry-rank">
                <span className="rank-number">{index + 1}</span>
                {index === 0 && <span className="rank-badge">🥇</span>}
                {index === 1 && <span className="rank-badge">🥈</span>}
                {index === 2 && <span className="rank-badge">🥉</span>}
              </div>
              
              <div className="entry-player">
                <div className="player-avatar">
                  {entry.imageUrl ? (
                    <img src={entry.imageUrl} alt={entry.displayName} />
                  ) : (
                    <div className="avatar-placeholder">
                      {entry.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="player-details">
                  <span className="player-name">{entry.displayName}</span>
                  <span className="player-platform">{entry.platform}</span>
                </div>
              </div>
              
              <div className="entry-points">
                <span className="points">{entry.points}</span>
              </div>
              
              <div className="entry-accuracy">
                <span className="accuracy">{accuracy}%</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
