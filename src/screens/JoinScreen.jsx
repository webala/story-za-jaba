import { useState } from 'react'
import { useBeemiSDK } from '../providers/BeemiSDKProvider'
import { useGame } from '../providers/GameProvider'
import './JoinScreen.css'

export default function JoinScreen() {
  const {  isLeader, playerId, playerNames, maxPlayers } = useBeemiSDK()
  const {  joinGame } = useGame()
  const [isJoining, setIsJoining] = useState(false)
  const [playerName, setPlayerName] = useState('')

  const handleJoinGame = async () => {
    if (isJoining || !playerName.trim()) return
    setIsJoining(true)
    console.log('🎮 Attempting to join game with name:', playerName)
    try {
      const success = await joinGame(playerName.trim())
      if (success) {
        console.log('✅ Successfully joined game')
      } else {
        console.error('❌ Failed to join game: joinGame returned false')
      }
    } catch (error) {
      console.error('❌ Failed to join game:', error)
    }
    setIsJoining(false)
  }

  return (
    <div className="join-screen">
      <div className="join-container">
        {/* Header */}
        <div className="join-header">
          <h1 className="game-title">Jaba si Jaba</h1>
          <p className="game-subtitle">Live</p>
        </div>

        {/* Join Form */}
        <div className="join-form">
          <div className="input-group">
            <label htmlFor="playerName" className="input-label">Enter your name</label>
            <input
              id="playerName"
              type="text"
              className="name-input"
              placeholder="Your name..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && playerName.trim() && !isJoining) {
                  handleJoinGame()
                }
              }}
              disabled={isJoining}
            />
          </div>
          
          <button 
            className={`join-btn ${!playerName.trim() || isJoining ? 'btn-disabled' : ''}`}
            onClick={handleJoinGame}
            disabled={!playerName.trim() || isJoining}
          >
            <span className="btn-icon">🎮</span>
            <span className="btn-text">
              {isJoining ? 'Joining...' : 'Join Game'}
            </span>
          </button>
        </div>

        {/* How to Play Section */}
        <div className="how-to-play">
          <h2>How to Play</h2>
          
          <div className="gameplay-steps">
            <div className="step">
              <div className="step-icon">📚</div>
              <div className="step-content">
                <h3>Tell Stories</h3>
                <p>Share your most unbelievable tales</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-icon">🗳️</div>
              <div className="step-content">
                <h3>Vote</h3>
                <p>Viewers comment "jaba" or "si jaba" to vote</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-icon">🏆</div>
              <div className="step-content">
                <h3>Maintain engagement</h3>
                <p>Viewers earn points for correct votes!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Leaderboard */}
        {/* <div className="sample-leaderboard">
          <h3>🏆 Leaderboard</h3>
          
          <div className="leaderboard-header">
            <div className="header-rank">Rank</div>
            <div className="header-player">Player</div>
            <div className="header-stories">Stories Told</div>
            <div className="header-accuracy">Accuracy</div>
          </div>
          
          <div className="leaderboard-entries">
            <div className="leaderboard-entry top-three">
              <div className="entry-rank">
                <span className="rank-number">1st</span>
                <span className="rank-badge">🥇</span>
              </div>
              <div className="entry-player">
                <div className="player-avatar">
                  <div className="avatar-placeholder">S</div>
                </div>
                <div className="player-details">
                  <span className="player-name">@storyteller_mike</span>
                </div>
              </div>
              <div className="entry-stories">15</div>
              <div className="entry-accuracy">92%</div>
            </div>
            
            <div className="leaderboard-entry top-three">
              <div className="entry-rank">
                <span className="rank-number">2nd</span>
                <span className="rank-badge">🥈</span>
              </div>
              <div className="entry-player">
                <div className="player-avatar">
                  <div className="avatar-placeholder">T</div>
                </div>
                <div className="player-details">
                  <span className="player-name">@tales_queen</span>
                </div>
              </div>
              <div className="entry-stories">12</div>
              <div className="entry-accuracy">88%</div>
            </div>
            
            <div className="leaderboard-entry top-three">
              <div className="entry-rank">
                <span className="rank-number">3rd</span>
                <span className="rank-badge">🥉</span>
              </div>
              <div className="entry-player">
                <div className="player-avatar">
                  <div className="avatar-placeholder">F</div>
                </div>
                <div className="player-details">
                  <span className="player-name">@fact_checker</span>
                </div>
              </div>
              <div className="entry-stories">10</div>
              <div className="entry-accuracy">85%</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}