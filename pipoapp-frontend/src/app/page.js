"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import { FeatureCard } from "@/components/Cards";

export default function Home() {
  const listFeatures = [
    {title : "Gestión de clientes", icon : GroupIcon},
    {title : "Gestión de inventarios", icon : InventoryIcon}
  ]
  const router = useRouter();

  const URL_IMAGEN = "https://res.cloudinary.com/dabyqnijl/image/upload/v1739544401/logos/ge37wuneu3z8a4qqggy0.png"
  return (
    <div className="relative w-full min-h-screen flex flex-row ">    
      <section className="w-1/2 bg-azulOscuro flex flex-col items-center justify-center">
        <div>
          <h1 className="bg-rojoPasion text-white p-4  font-bold text-5xl">Pipo Dashboard</h1>
          <p className="text-white text-lg w-96">Gestiona la información de la empresa de una forma sencilla y rápida.</p>
        </div>
        <section className="flex flex-row items-center justify-center mt-10">
          {
            listFeatures.map((item, idx)=><FeatureCard key={idx} {...item}/>)
          }
        </section>
      </section>
      <section className="flex-1 bg-white flex items-center justify-center flex-col">
        <Image
            src={URL_IMAGEN}
            width={500}
            height={500}
            alt="Imagen de dashboard de una persona"
        />
        <Button
          onClick={()=>router.push("/dashboard")}
          variant="ghost"
          className="bg-rojoPasion rounded-2xl w-96 py-8 text-white text-lg font-bold  hover:text-rojoPasion"
        >
          <p >Ir a ver el dashboard</p>
        </Button>
      </section>
    </div>
  );
}
