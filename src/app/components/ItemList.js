import { useState } from "react";

const ItemList = ({ items, setItems, confirmedItems, setConfirmedItems }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [tempName, setTempName] = useState('');
  const [tempQuantity, setTempQuantity] = useState(1);

  const handleCheck = (id) => {
    setSelectedItem(id === selectedItem ? null : id);
    setTempName('');
    setTempQuantity(1);
    console.log('Item selecionado:', id);
  };

  const handleQuantityChange = (newQuantity) => {
    setTempQuantity(newQuantity);
    console.log('Quantidade temporária:', newQuantity);
  };

  const handleNameChange = (name) => {
    setTempName(name);
    console.log('Nome temporário:', name);
  };

  const handleConfirm = () => {
    const item = items.find(item => item.id === selectedItem);
    if (item && tempName.trim()) {
      const updatedItem = { ...item, quantity: tempQuantity, confirmedBy: tempName };
      setConfirmedItems([...confirmedItems, updatedItem]);

      const updatedItems = items.map(item => 
        item.id === selectedItem ? { ...item, total: item.total - tempQuantity } : item
      ).filter(item => item.total > 0);

      setItems(updatedItems);
      setSelectedItem(null);
      setTempName('');
      setTempQuantity(1);

      console.log('Item confirmado:', updatedItem);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Lista de Itens</h2>
      <ul className="space-y-2 mb-6">
        {items.map((item) => (
          <li key={item.id} className="border p-2 rounded-md">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                checked={selectedItem === item.id} 
                onChange={() => handleCheck(item.id)}
                className="mr-2"
              />
              {item.name}
            </div>
            {selectedItem === item.id && (
              <div className="mt-2 space-y-2">
                <div>
                  <label className="block text-sm font-medium">Quantidade:</label>
                  <input 
                    type="number" 
                    value={tempQuantity} 
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    min="1"
                    max={item.total}
                    className="border p-1 rounded-md w-full text-black"
                  /> 
                  de {item.total}
                </div>
                <div>
                  <label className="block text-sm font-medium">Nome:</label>
                  <input 
                    type="text" 
                    value={tempName}
                    placeholder="Seu nome" 
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="border p-1 rounded-md w-full text-black"
                  />
                </div>
                <button 
                  onClick={handleConfirm}
                  className="bg-blue-500 text-white py-1 px-4 rounded-md"
                >
                  Adicionar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-4">Itens Confirmados</h2>
      <ul className="space-y-2">
        {confirmedItems.map((item) => (
          <li key={item.id} className="border p-2 rounded-md">
            {item.name} - Quantidade: {item.quantity} - Confirmado por: {item.confirmedBy}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ItemList;
