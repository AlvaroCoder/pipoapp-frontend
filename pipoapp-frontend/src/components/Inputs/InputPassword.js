import React, { useState } from 'react'
import { Input } from '../ui/input'
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function InputPassword({valuesData, handleChange}) {
  const [visibilityPassword, setVisibilityPassword] = useState(false);

  const handleClickChangeVisibility=()=>{
    setVisibilityPassword(!visibilityPassword);
  }
  return (
    <div className='flex flex-row items-center justify-center bg-white rounded-lg px-4 py-2'>
        <LockIcon
            className='text-azulOscuro'
        />
        <input
          type={visibilityPassword ? 'text' : 'password'}
          className='w-full p-2 bg-transparent outline-none shadow-none text-azulOscuro rounded-none '
          value={valuesData}
          name='password'
          onChange={handleChange}
        />
        {
          visibilityPassword ? 
          <p onClick={handleClickChangeVisibility}><VisibilityOffIcon className='text-azulOscuro'/></p> : 
          <p onClick={handleClickChangeVisibility}><RemoveRedEyeIcon className='text-azulOscuro'/></p>
        }
    </div>
  )
}