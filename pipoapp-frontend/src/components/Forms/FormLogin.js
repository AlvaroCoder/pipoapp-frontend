'use client'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { login } from '@/lib/authentication';

export default function FormLogin() {
    const {toast} = useToast();
    const router = useRouter();

    const initialData = {username : "", password : ""};
    const [dataForm, setDataForm] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const handleChangeInput=(evt)=>{
        const target = evt.target;
        setDataForm({
            ...dataForm,
            [target.name] : target.value
        });
    }
    const handleSubmit=async()=>{
        setLoading(true);
        const response = await login(dataForm);
        if (response.error) {
            toast({
                variant :"destructive",
                title : "Error",
                description : response.message
            });
            setLoading(false);
            return
        }
        router.push("/dashboard");
        toast({
            title : "Exito",
            description : "Ingreso Exitoso"
        });
        setLoading(false);
    }
    return (
        <div className='flex flex-col h-full'>
            <div className=''>
                <label
                    htmlFor='username'
                >
                    Usuario
                </label>
                <Input
                    name="username"
                    value={dataForm.username}
                    onChange={handleChangeInput}
                />
            </div>
            <div className='mt-4'>
                <label
                    htmlFor='password'
                >Contraseña</label>
                <Input
                    name="password"
                    type="password"
                    value={dataForm?.password}
                    onChange={handleChangeInput}
                />
            </div>
            <div>
                <Button
                    className="w-full mt-4 py-6 rounded-lg bg-rojoPasion hover:bg-rojoEncendido " 
                    onClick={handleSubmit}
                    disabled={loading}
                >   
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <p className='text-md'>Iniciar Sesion</p>}
                </Button>
            </div>
        </div>
    )
}
