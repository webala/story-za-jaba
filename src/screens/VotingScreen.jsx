import { useState, useEffect } from 'react'
import { useBeemiSDK } from '../providers/BeemiSDKProvider'
import { useGame } from '../providers/GameProvider'
import PersistentLeaderboard from '../components/PersistentLeaderboard'
import './VotingScreen.css'

export default function VotingScreen() {
  const { playerId, isLeader } = useBeemiSDK()
  const { storytellerId, playerNames, result, votingEndTime, startVoting, processPlayerVote } = useGame()
  const [timeLeft, setTimeLeft] = useState(30)
  const [hasVoted, setHasVoted] = useState(false)
  const [playerVote, setPlayerVote] = useState(null)

  // Reset voting state when voting phase starts
  useEffect(() => {
    setHasVoted(false)
    setPlayerVote(null)
  }, [votingEndTime]) // Reset when new voting session starts

  // Calculate time left
  useEffect(() => {
    if (!votingEndTime) return

    const updateTimer = () => {
      const now = Date.now()
      const remaining = Math.max(0, Math.ceil((votingEndTime - now) / 1000))
      setTimeLeft(remaining)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [votingEndTime])

  const storytellerName = playerNames.get(storytellerId)
  const isStoryteller = playerId === storytellerId

  const handleVote = (choice) => {
    if (hasVoted) {
      console.log('⚠️ Player has already voted')
      return
    }

    console.log(`🗳️ Player voting: ${choice}`)
    processPlayerVote(choice)
    setHasVoted(true)
    setPlayerVote(choice)
  }

  return (
    <div className="voting-screen">
      <div className="screen-container">
        {/* Header */}
        <div className="screen-header">
          <h1 className="screen-title">Truth or Tales</h1>
          <p className="screen-subtitle">Jaba, si Jaba</p>
        </div>

        {/* Main Content */}
        <div className="screen-content">
          <div className="voting-main">
            <div className="voting-card">
              <div className="card-header">
                <h2 className="card-title">Voting Time</h2>
                <p className="card-subtitle">
                  <span className="storyteller-name">{storytellerName}</span> told a story - was it fact or fiction?
                </p>
              </div>

              <div className="timer-section">
                <div className={`timer ${timeLeft <= 10 ? 'urgent' : ''}`}>
                  <span className="timer-number">{timeLeft}</span>
                  <span className="timer-unit">s</span>
                </div>
                <p className="timer-text">Time remaining</p>
              </div>

              {isStoryteller ? (
                <div className="storyteller-waiting">
                  <div className="waiting-message">
                    <div className="waiting-icon">👑</div>
                    <h3>You are the storyteller</h3>
                    <p>Viewers are voting in chat! They're typing "jaba" (fiction) or "si jaba" (fact)</p>
                    
                    <div className="voting-animation">
                      <div className="vote-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="voting-options">
                  <h3>What do you think?</h3>
                  <p className="voting-instruction">
                    Was <span className="storyteller-name">{storytellerName}</span>'s story fact or fiction?
                  </p>
                  <p className="chat-instruction">
                    💬 Vote by typing in chat or clicking below:
                  </p>
                  
                  <div className="fact-fiction-options">
                    <button 
                      className={`vote-option-card fiction-card ${hasVoted && playerVote === 'jaba' ? 'selected' : ''} ${hasVoted && playerVote !== 'jaba' ? 'disabled' : ''}`}
                      onClick={() => handleVote('jaba')}
                      disabled={hasVoted}
                    >
                      <div className="vote-icon">🎭</div>
                      <div className="vote-title">JABA</div>
                      <div className="vote-subtitle">Fiction Story</div>
                      <div className="vote-action">
                        {hasVoted && playerVote === 'jaba' ? '✓ Voted' : 'Click to Vote'}
                      </div>
                    </button>
                    
                    <button 
                      className={`vote-option-card fact-card ${hasVoted && playerVote === 'siJaba' ? 'selected' : ''} ${hasVoted && playerVote !== 'siJaba' ? 'disabled' : ''}`}
                      onClick={() => handleVote('si jaba')}
                      disabled={hasVoted}
                    >
                      <div className="vote-icon">✅</div>
                      <div className="vote-title">SI JABA</div>
                      <div className="vote-subtitle">True Story</div>
                      <div className="vote-action">
                        {hasVoted && playerVote === 'siJaba' ? '✓ Voted' : 'Click to Vote'}
                      </div>
                    </button>
                  </div>
                  
                  {hasVoted && (
                    <div className="vote-confirmation">
                      <div className="confirmation-icon">✅</div>
                      <div className="confirmation-text">
                        <p className="confirmation-title">Your vote has been recorded!</p>
                        <p className="confirmation-choice">
                          You voted: <strong>{playerVote === 'jaba' ? 'Fiction (Jaba)' : 'Fact (Si Jaba)'}</strong>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
{/* 
              {isLeader && (
                <div className="admin-controls">
                  <button 
                    className="btn-secondary restart-btn"
                    onClick={startVoting}
                  >
                    🔄 Restart Voting
                  </button>
                </div>
              )} */}
            </div>
          </div>

          {/* Persistent Leaderboard */}
          <PersistentLeaderboard />
        </div>
      </div>
    </div>
  )
}