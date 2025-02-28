'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'
import { ButtonDialogAddClient } from '../Buttons'
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function TableClientes({data=[], loadingData=false}) {
  const typesClient=[
    {name : "Todos", isSelected : true},
    {name : "Activo", isSelected : false},
    {name : "Inactivo", isSelected : false}
  ]
  
  const [dataClients, setDataClients] = useState(data);
  const [variantTypesClient, setVariantTypesClient] = useState(typesClient);
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
  }

  const handleAddClient=(dataClient={})=>{
    setDataClients([...dataClients, dataClient]);
  }
  
  return (
    <section className='w-full'>
      <div className='flex items-center py-4'> 
        <Input
          placeholder="Buscar cliente ..."
        />
        <ButtonDialogAddClient
          handleAddClient={handleAddClient}
        />  
        <Button
          variant="ghost"
        >
          Descargar Excel
        </Button>
      </div>
      <div className='w-full border-gray-100 border-b-[1px] flex flex-row'>
        {
          variantTypesClient?.map((item, idx)=>
          <p 
            key={idx} 
            onClick={()=>handleChangeTypesClient(idx)}
            className={`p-4 border-b-[1px] cursor-pointer ${item?.isSelected ? ' border-b-azulOscuro' : 'border-b-gray-100'}`}>{item?.name}</p>)
        }
      </div>
      <section className='w-full mt-4'>
        <Table>
          <TableCaption>
            <p>
              Lista de los clientes de la tienda
            </p>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <h1>Nombre</h1>
              </TableHead>
              <TableHead>
                <h1>Apellido</h1>
              </TableHead>
              <TableHead>
                <h1>Deuda Actual (S/.)</h1>
              </TableHead>
              <TableHead>
                <h1>Ultimo Pago</h1>
              </TableHead>
              <TableHead>
                <h1>Puntuacion</h1>
              </TableHead>
              <TableHead>
                <h1>Activo</h1>
              </TableHead>
              <TableHead>
                <h1><EditIcon/></h1>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              dataClients?.length > 0 ?
              (
                dataClients?.map((item, idx)=>(
                  <TableRow key={idx}>
                    <TableCell>
                      <p>{item?.nombre_cliente}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item?.apellido_cliente}</p>
                    </TableCell>
                    <TableCell>
                      <p>S/.{item?.deuda_actual}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item?.fecha_ultimo_pago}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item?.puntuacion}</p>
                    </TableCell>
                    <TableCell>
                      <p>{item?.isactive}</p>
                    </TableCell>
                    <TableCell>
                      <p><MoreVertIcon/></p>
                    </TableCell>
                  </TableRow>
                ))
              ) :
              <TableRow 
                className="text-center h-48"
              >
                <TableCell colSpan={7} ><h1>No hay resultados</h1></TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </section>
    </section>
  )
}
