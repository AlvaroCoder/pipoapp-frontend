'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'
import { ButtonDialogAddClient } from '../Buttons'
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TableClientsData } from './elements'

export default function TableClientes({data=[], loadingData=false}) {
  const typesClient=[
    {name : "Todos", isSelected : true},
    {name : "Activo", isSelected : false},
    {name : "Inactivo", isSelected : false}
  ]
  
  const [dataClients, setDataClients] = useState(data);
  const [variantTypesClient, setVariantTypesClient] = useState(typesClient);
  const [queryInput, setQueryInput] = useState("");

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
  };


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
      <TableClientsData
        data={dataClients}
      />
    </section>
  )
}
