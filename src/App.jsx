import { useState } from 'react'
import './App.css'
import BeemiProvider, { useBeemiSDK } from './providers/BeemiSDKProvider'
import JoinScreen from './screens/JoinScreen'
import GameProvider, { useGame } from './providers/GameProvider'
import LobbyScreen from './screens/LobbyScreen'
import StoryTimeScreen from './screens/StoryTimeScreen'
import VotingScreen from './screens/VotingScreen'
import ResultsScreen from './screens/ResultsScreen'
import DebugConsole from './components/DebugConsole'


const GameScreens = () => {
  const { gamePhase, playerNames, playerId, pendingJoin } = useGame()
  const { isConnected, isLeader } = useBeemiSDK()
  const hasJoined = playerNames.has(playerId)

  console.log('🔍 [GameScreens DEBUG] has joined', playerNames.get(playerId))
  console.log('🔍 [GameScreens DEBUG] playerId:', playerId)
  console.log('🔍 [GameScreens DEBUG] isConnected:', isConnected)
  console.log('🔍 [GameScreens DEBUG] isLeader:', isLeader)
  console.log('🔍 [GameScreens DEBUG] pendingJoin:', pendingJoin)
  console.log('🔍 [GameScreens DEBUG] playerNames keys:', Array.from(playerNames.keys()))
  console.log('🔍 [GameScreens DEBUG] playerNames entries:', Array.from(playerNames.entries()))


  // Debug logging
  console.log('🎮 [GameScreens] Render check:', {
    gamePhase,
    playerId,
    playerNamesSize: playerNames.size,
    playerNamesKeys: Array.from(playerNames.keys()),
    playerNamesEntries: Array.from(playerNames.entries()),
    hasJoined,
    willShowJoinScreen: !hasJoined
  })

   // Render appropriate screen based on game phase
  if (!hasJoined && !pendingJoin) {
    console.log('📱 [GameScreens] Showing JoinScreen because player not in playerNames and not pending')
    return <JoinScreen />
  }

  if (!hasJoined && pendingJoin) {
    console.log('📱 [GameScreens] Player join is pending, showing loading state')
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        background: 'var(--gradient-primary)',
        color: 'var(--text-primary)',
        fontSize: '1.2rem'
      }}>
        Joining game...
      </div>
    )
  }

  return (
    <>
      {(gamePhase === 'lobby' || gamePhase === 'buffer') && <LobbyScreen />}
      {gamePhase === 'story-time' && <StoryTimeScreen />}
      {gamePhase === 'voting' && <VotingScreen />}
      {gamePhase === 'results' && <ResultsScreen />}
    </>
  ) 
}

function App() {


  return (
    <BeemiProvider>
      <GameProvider>
      <GameScreens />
      <DebugConsole />
      </GameProvider>
    </BeemiProvider>
  )
}

export default App 