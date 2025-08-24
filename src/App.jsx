import { useState } from 'react'
import './App.css'
import BeemiProvider, { useBeemiSDK } from './providers/BeemiSDKProvider'
import JoinScreen from './screens/JoinScreen'
import GameProvider, { useGame } from './providers/GameProvider'
import LobbyScreen from './screens/LobbyScreen'
import StoryTimeScreen from './screens/StoryTimeScreen'
import VotingScreen from './screens/VotingScreen'
import ResultsScreen from './screens/ResultsScreen'


const GameScreens = () => {
  const { gamePhase, playerNames, playerId } = useGame()
  const hasJoined = playerNames.has(playerId)


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
  if (!hasJoined) {
    console.log('📱 [GameScreens] Showing JoinScreen because player not in playerNames')
    return <JoinScreen />
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
      </GameProvider>
    </BeemiProvider>
  )
}

export default App 