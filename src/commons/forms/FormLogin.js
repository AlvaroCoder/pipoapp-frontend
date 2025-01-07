'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LOGIN_USER } from '@/conexion/register/login'
import { useToast } from '@/hooks/use-toast'
import React, { useState } from 'react'

export default function FormLogin() {
    const {toast} =useToast();
    const initialData = {username : "", password : ""}
    const [dataForm, setDataForm] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const handleChangeInput=(evt)=>{
        const target = evt.target;
        setDataForm({
            ...dataForm,
            [target.name] : target.value
        })
    }
    const handleSubmit=async()=>{
        setLoading(true);
        const response = await LOGIN_USER(dataForm);
        if (response.ok) {
            toast({
                title : "Exito",
                description : "Iniciaste session exitosamente"
             })
             setDataForm(initialData);
             setLoading(false);
             return;
        }
        const messageError = await response.json();
        toast({
            variant : "destructive",
            title : "Error",
            description : messageError?.message
        });
        setLoading(false)
    }
  return (
    <div
        onSubmit={handleSubmit}
        className='flex flex-col h-full'
    >
        <div className=''>
            <label htmlFor='username'>Usuario</label>
            <Input
                name="username"
                value={dataForm.username}
                onChange={handleChangeInput}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor='password'>Contraseña</label>
            <Input 
                name="password"
                type="password"
                value={dataForm.password}
                onChange={handleChangeInput}
            />
        </div>
        <div>
            <Button
                className="w-full mt-4 p-4 bg-rojoPasion hover:bg-rojoEncendido text-2xl" 
                onClick={handleSubmit}
            >
                <p>Iniciar Sesion</p>
            </Button>
        </div>
    </div>
  )
};