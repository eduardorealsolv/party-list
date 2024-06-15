"use client";
import Lista from "../../database/listaItens.js";
import ItemList from "../../src/app/components/ItemList.js";
import DoacaoDinheiro from "../../src/app/components/DoacaoDinheiro.js";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState(Lista);
  const [confirmedItems, setConfirmedItems] = useState([]);
  const [doacoes, setDoacoes] = useState([]);
  const [totalDoado, setTotalDoado] = useState(0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Festa Junina</h1>
      
      <ItemList 
        items={items} 
        setItems={setItems} 
        confirmedItems={confirmedItems} 
        setConfirmedItems={setConfirmedItems}
      />
      
      <DoacaoDinheiro 
        doacoes={doacoes} 
        setDoacoes={setDoacoes} 
        totalDoado={totalDoado} 
        setTotalDoado={setTotalDoado}
      />
    </div>
  );
}
