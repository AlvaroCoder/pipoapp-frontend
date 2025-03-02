import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useMemo, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';

export default function TableClientsData({data=[]}) {
    const typesClient=[
        {name : "Todos", isSelected : true, value : 2},
        {name : "Activo", isSelected : false, value : 0},
        {name : "Inactivo", isSelected: false, value : 1}
    ];
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
    
    const filterDataTypeClient = useMemo(()=>{
        const variantFilter =variantTypesClient.filter(i=>i.isSelected);
        if (variantFilter[0]?.value == 2) {
            return data
        }
        return data.filter(item=>item?.isactive == variantFilter[0]?.value);
    },[data, variantTypesClient])
  return (
    <section className='w-full'>
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
                        filterDataTypeClient.length > 0 ?
                        (
                            filterDataTypeClient?.map((item, idx)=>(
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
                            <TableCell colSpan={7}><h1>No hay resultados</h1></TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </section>
    </section>
  )
}
