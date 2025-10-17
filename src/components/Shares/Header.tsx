import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
  return (
    <div className='flex justify-center items-center p-4 bg-gray-800 text-white'>
      <nav >
        <ul className='flex gap-4'>
          <li>
            <button onClick={() => navigate('/')}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate('/sample')}>Sample</button>
          </li>
          <li>
            <button onClick={() => navigate('/grid')}>Grid</button>
          </li>
          <li>
            <button onClick={() => navigate('/pdf')}>PDF</button>
          </li>
          <li>
            <button onClick={() => navigate('/form')}>Form Pratice</button>
          </li>
          <li>
            <button onClick={() => navigate('/hooker')}>Hook</button>
          </li>
          <li>
            <button onClick={() => navigate('/excelTable')}>Excel Table</button>
          </li>
          <li>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          </li>
          <li>
            <button onClick={() => navigate('/DnDBasic')}>DnD Basic</button>
          </li>
          <li>
            <button onClick={() => navigate('/zustand')}>Zustand</button>
          </li>
          <li>
            <button onClick={() => navigate('/jotai')}>Jotai</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
