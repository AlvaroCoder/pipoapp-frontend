import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center">    
      <section         
        className="flex flex-col items-center justify-center z-10 p-8 rounded-lg shadow-sm bg-azulOscuro"      
        >
        <h1 className="font-bold text-3xl mb-4 text-beigeClaro"> DASHBOARD PIPO EIRL</h1>
        <Link
          href="/dashboard"
          className="bg-rojoPasion p-2 text-beigeClaro rounded-lg hover:bg-rojoEncendido shadow-sm"
        >
          <p>Ver Dashboard</p>
        </Link>
      </section>  
    </div>
  );
}
