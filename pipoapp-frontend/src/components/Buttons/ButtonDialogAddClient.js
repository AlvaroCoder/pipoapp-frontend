import React from 'react'
import { Button } from '../ui/button';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';

export default function ButtonDropdownAddClient() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="mx-2 flex flex-row items-center  hover:text-white text-white bg-azulOscuro hover:bg-azulClaro"
        >
          <AddIcon/>
          <p>Agregar Cliente</p>
        </Button>

      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Nuevo Cliente</DialogTitle>
        <DialogDescription>Ventana para crear a un nuevo cliente</DialogDescription>
        <section className='w-full text-azulOscuro'>
          <h1 className='font-bold '>Nombre</h1>
          <Input/>
          <h1 className='mt-4 font-bold'>Apellido</h1>
          <Input/>
          <div className='flex flex-row items-center mt-4'>
            <div className='flex-1'>
              <h1 className='font-bold'>DNI</h1>
              <Input
                type="number"
              />
            </div>
            <div className='flex-1 ml-2'>
              <h1 className='font-bold'>Telefono</h1>
              <Input
                
              />
            </div>
          </div>
          <div className='flex flex-row items-center'>
            <div className='flex-1'>
              <h1 className='font-bold' >Deuda actual</h1>
              <Input/>
            </div>
            <div className=' ml-2 flex-1'>
              <h1 className='font-bold '>Fecha Ultimo Pago</h1>
              <Input/>
            </div>
          </div>
         <div className='w-full h-10 mb-4'>
          <Button
            className="mt-4 h-full w-full font-bold  py-4 text-white bg-rojoPasion hover:bg-rojoEncendido"
          >
            <h1>Agregar cliente</h1>
          </Button>
         </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}
