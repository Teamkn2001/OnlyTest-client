import { useNavigate } from 'react-router-dom'

export default function GameHeader() {
    const navigate = useNavigate();
  return (
    <div className='flex justify-center items-center p-4 bg-gray-800 text-white'>
      <nav >
        <ul className='flex gap-4'>
          <li>
            <button onClick={() => navigate('/game')}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate('/game/oneCardGame')}>singlecard</button>
          </li>        
          <li>
            <button onClick={() => navigate('/game/rankingStat')}>Ranking Stat</button>
          </li>        
        </ul>
      </nav>
    </div>
  )
}
