import { useBeemiSDK } from '../providers/BeemiSDKProvider'
import { useGame, MIN_PLAYERS, MAX_PLAYERS } from '../providers/GameProvider'
import PersistentLeaderboard from '../components/PersistentLeaderboard'
import './LobbyScreen.css'

export default function LobbyScreen() {
  const { isLeader, maxPlayers, minPlayers } = useBeemiSDK()
  const { playerNames, gamePlayerCount, leaveGame, startGame, startStoryTime, gameStarted, storytellerId, playerId, setResult } = useGame()

  // Debug logging
  console.log('🏠 [LobbyScreen] Render - playerNames:', Array.from(playerNames.entries()))
  console.log('🏠 [LobbyScreen] Render - gamePlayerCount:', gamePlayerCount)
  console.log('🏠 [LobbyScreen] Render - playerId:', playerId)
  console.log('🏠 [LobbyScreen] Render - isLeader:', isLeader)

  const handleBack = () => {
    leaveGame()
  }

  const handleStart = () => {
    startGame()
  }

  const handleJaba = () => {
    setResult("jaba")
    startStoryTime()
  }

  const handleSiJaba = () => {
    setResult("si jaba")
    startStoryTime()
  }

  const renderPlayerCards = () => {
    const cards = []
    const players = Array.from(playerNames.entries())
    
    console.log('🃏 [renderPlayerCards] Players array:', players)
    console.log('🃏 [renderPlayerCards] MAX_PLAYERS:', MAX_PLAYERS)
    
    for (let i = 0; i < MAX_PLAYERS; i++) {
      const [currentPlayerId, name] = players[i] || []
      
      console.log(`🃏 [renderPlayerCards] Card ${i}: playerId=${currentPlayerId}, name=${name}`)
      
      cards.push(
        <div key={i} className={`player-card ${name ? 'filled' : 'empty'}`}>
          {name ? (
            <>
              <div className="player-avatar">
                <div className="avatar-placeholder">
                  {name.charAt(0).toUpperCase()}
                </div>
              </div>
              <span className="player-name">{name}</span>
              <span className="player-number">#{i + 1}</span>
            </>
          ) : (
            <div className="empty-slot">
              <div className="empty-icon">👤</div>
              <span className="waiting-text">Waiting for player...</span>
            </div>
          )}
        </div>
      )
    }
    
    console.log('🃏 [renderPlayerCards] Generated', cards.length, 'cards')
    return cards
  }

  if (gameStarted === false) {
    return (
      <div className="lobby-screen">
        <div className="screen-container">
          {/* Header */}
          <div className="screen-header">
            <h1 className="screen-title">Truth or Tales</h1>
            <p className="screen-subtitle">Jaba, si Jaba</p>
          </div>

          {/* Main Content */}
          <div className="screen-content">
            <div className="lobby-main">
              <div className="lobby-card">
                <div className="card-header">
                  <h2 className="card-title">Game Lobby</h2>
                  <p className="card-subtitle">
                    {gamePlayerCount}/{MAX_PLAYERS} players joined
                  </p>
                </div>

                <div className="players-section">
                  <div className="players-grid">
                    {renderPlayerCards()}
                  </div>
                </div>

                <div className="lobby-actions">
                  <div className="action-buttons">
                    <button onClick={handleBack} className="btn-secondary back-btn">
                      ← Back to Menu
                    </button>
                    
                    {isLeader && (
                      <span className="leader-badge">
                        👑 Leader
                      </span>
                    )}
                  </div>

                  <div className="start-section">
                    {isLeader ? (
                      <button
                        onClick={handleStart}
                        className={`btn-primary start-btn ${gamePlayerCount < MIN_PLAYERS ? 'btn-disabled' : ''}`}
                        disabled={gamePlayerCount < MIN_PLAYERS}
                      >
                        {gamePlayerCount < MIN_PLAYERS
                          ? `Need ${MIN_PLAYERS - gamePlayerCount} more player${MIN_PLAYERS - gamePlayerCount === 1 ? '' : 's'}`
                          : 'Start Game'
                        }
                      </button>
                    ) : (
                      <div className="waiting-section">
                        <div className="waiting-indicator">
                          <div className="pulse-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                        <p className="waiting-text">Waiting for leader to start...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Persistent Leaderboard */}
            <PersistentLeaderboard />
          </div>
        </div>
      </div>
    )
  }

  if (playerId === storytellerId) {
    return (
      <div className="lobby-screen">
        <div className="screen-container">
          {/* Header */}
          <div className="screen-header">
            <h1 className="screen-title">Truth or Tales</h1>
            <p className="screen-subtitle">Jaba, si Jaba</p>
          </div>

          {/* Main Content */}
          <div className="screen-content">
            <div className="storyteller-selection">
              <div className="selection-card">
                <div className="card-header">
                  <h2 className="card-title">You are the Storyteller!</h2>
                  <p className="card-subtitle">
                    Choose what type of story you will tell on stream:
                  </p>
                </div>

                <div className="choice-buttons">
                  <button onClick={handleJaba} className="choice-btn fiction-btn">
                    <div className="choice-icon">🎭</div>
                    <div className="choice-content">
                      <div className="choice-title">Jaba</div>
                      <div className="choice-subtitle">Fiction Story</div>
                    </div>
                  </button>
                  
                  <button onClick={handleSiJaba} className="choice-btn fact-btn">
                    <div className="choice-icon">✅</div>
                    <div className="choice-content">
                      <div className="choice-title">Si Jaba</div>
                      <div className="choice-subtitle">True Story</div>
                    </div>
                  </button>
                </div>

                <p className="stream-instruction">
                  After choosing, tell your story on stream and let viewers vote!
                </p>
              </div>
            </div>

            {/* Persistent Leaderboard */}
            <PersistentLeaderboard />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="lobby-screen">
      <div className="screen-container">
        {/* Header */}
        <div className="screen-header">
          <h1 className="screen-title">Truth or Tales</h1>
          <p className="screen-subtitle">Jaba, si Jaba</p>
        </div>

        {/* Main Content */}
        <div className="screen-content">
          <div className="waiting-for-storyteller">
            <div className="waiting-card">
              <div className="card-header">
                <h2 className="card-title">Waiting for Storyteller</h2>
                <p className="card-subtitle">The storyteller is choosing their story type...</p>
              </div>

              <div className="waiting-animation">
                <div className="story-icons">
                  <div className="story-icon">🎭</div>
                  <div className="story-icon">✅</div>
                </div>
                <div className="pulse-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Persistent Leaderboard */}
          <PersistentLeaderboard />
        </div>
      </div>
    </div>
  )
}