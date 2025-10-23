import { Outlet } from 'react-router-dom'
import GameHeader from './GameHeader'

export default function GameLayout() {
  return (
    <div>
      <GameHeader />
      <Outlet />
    </div>
  )
}
