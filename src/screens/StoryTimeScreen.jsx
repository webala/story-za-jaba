import { useBeemiSDK } from '../providers/BeemiSDKProvider'
import { useGame } from '../providers/GameProvider'
import PersistentLeaderboard from '../components/PersistentLeaderboard'
import './StoryTimeScreen.css'

export default function StoryTimeScreen() {
  const { playerId, isLeader } = useBeemiSDK()
  const { storytellerId, playerNames, result, startVoting } = useGame()

  const isStoryteller = playerId === storytellerId
  const storytellerName = playerNames.get(storytellerId)

  if (isStoryteller) {
    return (
      <div className="storytime-screen">
        <div className="screen-container">
          {/* Header */}
          <div className="screen-header">
            <h1 className="screen-title">Truth or Tales</h1>
            <p className="screen-subtitle">Jaba, si Jaba</p>
          </div>

          {/* Main Content */}
          <div className="screen-content">
            <div className="storyteller-main">
              <div className="story-card">
                <div className="card-header">
                  <div className="live-badge">
                    <span className="live-dot"></span>
                    🎬 You're Live!
                  </div>
                  <h2 className="card-title">Tell your story on stream</h2>
                </div>

                <div className="story-choice-display">
                  <div className="choice-badge">
                    <div className="choice-icon">
                      {result === 'jaba' ? '🎭' : '✅'}
                    </div>
                    <div className="choice-text">
                      <span className="choice-type">You chose to tell a</span>
                      <span className="choice-value">
                        {result === 'jaba' ? 'Fiction' : 'True'} story
                      </span>
                    </div>
                  </div>
                </div>

                <div className="streaming-instructions">
                  <div className="instruction-item">
                    <div className="instruction-icon">🔴</div>
                    <div className="instruction-text">
                      Start telling your story on stream now!
                    </div>
                  </div>
                  
                </div>

                {isLeader && (
                <div className="moderator-controls">
                  <button 
                    className="btn-primary vote-btn" 
                    onClick={startVoting}
                  >
                    🗳️ Start Voting
                  </button>
                  <p className="moderator-note">
                    Click when the storyteller is ready for voting
                  </p>
                </div>
              )}
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
    <div className="storytime-screen">
      <div className="screen-container">
        {/* Header */}
        <div className="screen-header">
          <h1 className="screen-title">Truth or Tales</h1>
          <p className="screen-subtitle">Jaba, si Jaba</p>
        </div>

        {/* Main Content */}
        <div className="screen-content">
          <div className="listener-main">
            <div className="story-card">
              <div className="card-header">
                <div className="live-badge">
                  <span className="live-dot"></span>
                  🎧 Story Time
                </div>
                <h2 className="card-title">
                  <span className="storyteller-name">{storytellerName}</span> is telling their story
                </h2>
              </div>

              <div className="stream-status">
                <div className="status-indicator">
                  <div className="status-icon">🔴</div>
                  <div className="status-text">
                    <span className="status-title">Watch the stream</span>
                    <span className="status-subtitle">Listen to the story!</span>
                  </div>
                </div>

                <div className="vote-preview">
                  <p className="vote-preview-text">
                    Get ready to vote when voting opens:
                  </p>
                  <div className="vote-options-preview">
                    <div className="vote-preview-option">
                      <span className="vote-preview-icon">🎭</span>
                      <span className="vote-preview-label">"jaba" (fiction)</span>
                    </div>
                    <div className="vote-preview-option">
                      <span className="vote-preview-icon">✅</span>
                      <span className="vote-preview-label">"si jaba" (fact)</span>
                    </div>
                  </div>
                </div>
              </div>

              {isLeader && (
                <div className="moderator-controls">
                  <button 
                    className="btn-primary vote-btn" 
                    onClick={startVoting}
                  >
                    🗳️ Start Voting
                  </button>
                  <p className="moderator-note">
                    Click when the storyteller is ready for voting
                  </p>
                </div>
              )}

              {!isLeader && (
                <div className="waiting-section">
                  <div className="waiting-animation">
                    <div className="pulse-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <p className="waiting-text">
                    Wait for the moderator to start voting
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Persistent Leaderboard */}
          <PersistentLeaderboard />
        </div>
      </div>
    </div>
  )
}