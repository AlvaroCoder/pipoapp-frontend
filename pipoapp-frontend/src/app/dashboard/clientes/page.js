'use client'
import { TableClientes } from '@/components/Tables'
import { useFetch } from '@/hooks/useHooks'
import React from 'react'

export default function Page() {
  const URL_GET_CLIENTS = process.env.NEXT_PUBLIC_URL_GET_CLIENTS;
  
  const {loading, data, error} = useFetch(URL_GET_CLIENTS);
  return (
    <div className='w-full py-4 px-8 overflow-x-auto'>
      <h1 className='font-bold text-azulOscuro text-2xl'>Clientes</h1>
      <section className='w-full min-h-screen'>
        {
          loading? 
          <p>Cargando ...</p>:
          <TableClientes
          data={data}
        />
        }
      </section>
    </div>
  )
}
