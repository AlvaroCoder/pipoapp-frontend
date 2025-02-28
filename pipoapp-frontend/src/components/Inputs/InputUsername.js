import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

export default function InputUsername({valuesData, handleChange }) { 

  return (
    <div className=' flex flex-row items-center justify-center bg-white rounded-lg px-4 py-2'>
        <PersonIcon
            className='text-azulOscuro'
        />
        <input
            className='w-full p-2 bg-transparent outline-none shadow-none text-azulOscuro border-none rounded-none '
            value={valuesData}
            name='username'
            onChange={handleChange}
        />
    </div>
  )
}