import { useBeemiSDK } from '../providers/BeemiSDKProvider'
import { useGame } from '../providers/GameProvider'
import PersistentLeaderboard from '../components/PersistentLeaderboard'
import './ResultsScreen.css'

export default function ResultsScreen() {
  const { playerId, isLeader } = useBeemiSDK()
  const { 
    storytellerId, 
    playerNames, 
    result, 
    playerRotation, 
    currentStorytellerIndex,
    viewerLeaderboard,
    currentRoundVotes,
    nextStoryteller,
    endGame,
    removeAllPlayers,
    resetGame 
  } = useGame()

  const storytellerName = playerNames.get(storytellerId)
  const isStoryteller = playerId === storytellerId

  // Calculate voting results from current round votes
  const votingResults = {
    jaba: 0,
    siJaba: 0
  }

  currentRoundVotes.forEach((voteData) => {
    if (voteData.choice === 'jaba') {
      votingResults.jaba++
    } else if (voteData.choice === 'siJaba') {
      votingResults.siJaba++
    }
  })

  const totalVotes = votingResults.jaba + votingResults.siJaba
  const winningChoice = votingResults.jaba > votingResults.siJaba ? 'jaba' : 'siJaba'
  const actualChoice = result
  const wasCorrect = winningChoice === actualChoice

  // Get top 10 leaderboard entries
  const leaderboardEntries = Array.from(viewerLeaderboard.entries())
    .map(([username, data]) => ({ username, ...data }))
    .sort((a, b) => {
      // Sort by points (descending), then by accuracy (descending)
      if (b.points !== a.points) return b.points - a.points
      const aAccuracy = a.totalVotes > 0 ? a.correctVotes / a.totalVotes : 0
      const bAccuracy = b.totalVotes > 0 ? b.correctVotes / b.totalVotes : 0
      return bAccuracy - aAccuracy
    })
    .slice(0, 10) // Top 10

  const handleNextStoryteller = () => {
    nextStoryteller()
  }

  const handleEndGame = () => {
    endGame()
  }

  const handleRemoveAllPlayers = () => {
    removeAllPlayers()
  }

  // Get next storyteller info
  const nextIndex = (currentStorytellerIndex + 1) % playerRotation.length
  const nextStorytellerID = playerRotation[nextIndex]
  const nextStorytellerName = playerNames.get(nextStorytellerID)

  return (
    <div className="results-screen">
      <div className="screen-container">
        {/* Header */}
        <div className="screen-header">
          <h1 className="screen-title">Truth or Tales</h1>
          <p className="screen-subtitle">Jaba, si Jaba</p>
        </div>

        {/* Main Content */}
        <div className="screen-content">
          <div className="results-main">
            <div className="results-card">
              <div className="card-header">
                <h2 className="card-title">{result === 'jaba' ? 'Jaba' : 'Si Jaba'}</h2>
                <p className="card-subtitle">
                  <span className="storyteller-name">{storytellerName}</span> told a <strong>{result === 'jaba' ? 'Fiction' : 'True'}</strong> story
                </p>
              </div>

              {/* Reveal Section */}
              

              {/* Voting Results */}
              

              {/* Game Stats */}
              <div className="game-stats">
                <div className="stat-item">
                  <div className="stat-icon">👤</div>
                  <div className="stat-content">
                    <div className="stat-number">{storytellerName}</div>
                    <div className="stat-label">Storyteller</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">{result === 'jaba' ? '🎭' : '✅'}</div>
                  <div className="stat-content">
                    <div className="stat-number">{result === 'jaba' ? 'Fiction' : 'Fact'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Game Controls */}
          {isLeader && (
            <div className="game-controls-card">
              <div className="card-header">
                <h3>Game Controls</h3>
              </div>

              <div className="next-storyteller-section">
                <div className="next-storyteller-info">
                  <div className="next-avatar">
                    <div className="avatar-placeholder">
                      {nextStorytellerName?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="next-details">
                    <span className="next-label">Next Storyteller</span>
                    <span className="next-name">{nextStorytellerName}</span>
                  </div>
                </div>
                
                <button 
                  className="btn-primary continue-btn"
                  onClick={handleNextStoryteller}
                >
                  Continue with {nextStorytellerName}
                </button>
              </div>
              
              <div className="control-buttons">
                <button 
                  className="btn-secondary end-game-btn"
                  onClick={handleEndGame}
                >
                  🏁 End Game (Keep Players)
                </button>
                <button 
                  className="btn-secondary remove-all-btn"
                  onClick={handleRemoveAllPlayers}
                >
                  🧹 Remove All Players
                </button>
              </div>
            </div>
          )}

          {!isLeader && (
            <div className="waiting-controls-card">
              <div className="card-header">
                <h3>Waiting for Moderator</h3>
              </div>
              
              <div className="waiting-content">
                <div className="waiting-animation">
                  <div className="pulse-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <p className="waiting-text">Moderator is deciding what to do next...</p>
                <div className="next-storyteller-preview">
                  <span>Next storyteller: </span>
                  <strong>{nextStorytellerName}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Persistent Leaderboard */}
          <PersistentLeaderboard />
        </div>
      </div>
    </div>
  )
}