'use client'
import { ButtonDialogAddClient } from '@/components/Buttons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getSession } from '@/lib/authentication'
import { cn } from '@/lib/utils'
import { Skeleton } from '@mui/material'
import { EditIcon, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

const headers = [
  { value: "Nombre" },
  { value: "Apellido" },
  { value: "Deuda Actual (S/.)" },
  { value: "Ultimo Pago" },
  { value: "Puntuacion" },
  { value: "Estado" },
  { value: <EditIcon /> }
];

const typesClient=[
  {name : "Todos", isSelected : true, value : 2, className: "bg-gray-200"},
  {name : "Activo", isSelected : false, value : 0, className: "bg-green-100"},
  {name : "Inactivo", isSelected: false, value : 1, className: "bg-red-500"}
];
export default function Page() {
  const URL_GET_CLIENTS = process.env.NEXT_PUBLIC_URL_GET_CLIENTS;
  const [dataClient, setDataClient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [variantTypesClient, setVariantTypesClient] = useState(typesClient);
  const [queryInput, setQueryInput] = useState('');
  const router = useRouter();

  const handleChangeTypesClient=(index)=>{
    const newDataTypesClient = typesClient.map((item, idx)=>{
        if (idx === index) {
          return {
            ...item,
            isSelected : true
          }
        }
        return {
          ...item,
          isSelected : false
        }
      });
      setVariantTypesClient(newDataTypesClient)
  };

  const handleChangeQueryInput=(e)=>{
    setQueryInput(e.target.value);
  }

  const filterDataTypeClient = useMemo(() => {
    const variantFilter = variantTypesClient?.filter((item) => item?.isSelected)[0];
    if (variantFilter?.value === 2) {
      return dataClient;
    } else {
      return dataClient?.filter((client) => client?.isactive === variantFilter?.value);
    }
  },[dataClient, variantTypesClient]);

  const searchData = useMemo(() => {
    return filterDataTypeClient?.filter((item) => 
      item?.nombre_cliente?.toUpperCase().includes(queryInput.toUpperCase()) ||
      item?.apellido_cliente?.toUpperCase().includes(queryInput.toUpperCase())
    );
  },[queryInput, filterDataTypeClient]);
  const handleAddClient=(newData={})=>{
    setDataClient([...dataClient, newData]);
  }
  useEffect(()=>{
    async function getData() {
      try {
        setLoading(true);
        const session = await getSession();
        const response = await fetch(URL_GET_CLIENTS,{
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${session?.access_token}`
          },
          mode : 'cors'
        });
        const jsonResponse = await response.json();
        setDataClient(jsonResponse);
        toast("Clientes cargados correctamente", {
          type: "success",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false});
      } catch (error) {
        toast("Error al cargar los clientes", {
          type: "error",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false})
      } finally{
        setLoading(false);
      }
    }
    getData();
  },[URL_GET_CLIENTS]);
  
  return (
    <div className='w-full py-4 px-8 overflow-x-auto '>
      <div>
        <h1 className='font-bold text-azulOscuro text-2xl'>Clientes</h1>
        <p className='text-sm text-gray-400'>Gestion de los clientes de PIPO</p>
      </div>
      <section className='flex gap-2 items-center mt-4'>
        <Input
          placeholder="Buscar cliente ..."
          onChange={handleChangeQueryInput}
        />
        <ButtonDialogAddClient
          handleAddClient={handleAddClient}
        />
        <Button
          variant='ghost'
          className='text-sm'
        >
          Descargar Excel
        </Button>
      </section>
      <div className='w-full border-gray-100 border-b-[1px] flex flex-row'>
            {
                variantTypesClient?.map((item, idx)=>
                <p  
                    key={idx}
                    onClick={()=>handleChangeTypesClient(idx)}
                    className={`p-4 border-b-[1px] cursor-pointer ${item?.isSelected ? ' border-b-azulOscuro' : 'border-b-gray-100'}`}
                >
                    {item?.name}
                </p>)
            }
        </div>
      <section className='w-full min-h-screen'>
        {
          loading? 
          <Table>
            <TableCaption>
              <p>
                Lista de los clientes de PIPO
              </p>
            </TableCaption>
            <TableHeader>
              <TableRow>
                {
                  headers?.map((header, index) => (
                    <TableHead key={index}>
                      {header.value}
                    </TableHead>
                  ))
                }
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                Array.from({ length: 6 }).map((_, idx) => (
                  <TableRow key={idx}>
                    {
                      headers?.map((_, index) => (
                        <TableCell key={index}>
                          <Skeleton  />
                        </TableCell>
                      ))
                    }
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>:
          <Table>
            <TableHeader>
              <TableRow>
                {
                  headers?.map((header, index) => (
                    <TableHead key={index}>
                      {header.value}
                    </TableHead>
                  ))
                }
              </TableRow>
            </TableHeader>
            <TableBody>
                {
                  searchData?.length > 0 ? 
                  searchData?.map((client, index) => (
                    <TableRow key={index}>
                      <TableCell>{client?.nombre_cliente}</TableCell>
                      <TableCell>{client?.apellido_cliente}</TableCell> 
                      <TableCell>{client?.deuda_actual}</TableCell>
                      <TableCell>{client?.fecha_ultimo_pago}</TableCell>
                      <TableCell>
                        <ul>
                          {Array.from({length: client?.puntuacion}, (_, i) => (
                              <li key={i} className="inline-block text-yellow-400"><Star/></li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                          <p className={cn('p-2 rounded-lg text-azulOscuro text-center', typesClient?.filter((type)=>type?.value === client?.isactive)[0].className)}>{typesClient?.filter((type)=>type?.value === client?.isactive)[0]?.name}</p>
                      </TableCell>
                      
                    </TableRow>
                  )) :
                  <TableRow>
                    <TableCell colSpan={headers.length} className='text-center h-20 bg-gray-200'>
                      No hay clientes registrados
                    </TableCell>
                  </TableRow>
                }
            </TableBody>
          </Table>
        }
      </section>
    </div>
  )
}
