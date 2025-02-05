import { FormLogin } from '@/components/Forms'
import React from 'react'

export default function Page() {
  return (
    <div className='h-screen flex items-center justify-center bg-azulOscuro'>
        <div className='bg-beigeClaro rounded-lg p-8 shadow-sm w-[30rem]'>
            <h1 className='text-center text-3xl font-bold text-azulOscuro '>PIPO APP</h1>      
            <p className='mb-6 text-center text-lg text-grisClaro' >Iniciar sesion</p>
            <FormLogin/>
        </div>
    </div>
  )
}
