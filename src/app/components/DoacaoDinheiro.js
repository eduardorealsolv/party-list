import { useState } from "react";

const valorMaximo = 300;

const DoacaoDinheiro = ({ doacoes, setDoacoes, totalDoado, setTotalDoado }) => {
  const [tempName, setTempName] = useState('');
  const [modoDoacao, setModoDoacao] = useState('');
  const [tempValorDoacao, setTempValorDoacao] = useState(0);

  const handleDoacaoChange = (newValor) => {
    setTempValorDoacao(newValor);
    console.log('Valor da doação temporária:', newValor);
  };

  const handleModoDoacaoChange = (modo) => {
    setModoDoacao(modo);
    console.log('Modo de doação:', modo);
  };

  const handleNameChange = (name) => {
    setTempName(name);
    console.log('Nome temporário:', name);
  };

  const handleConfirmDoacao = () => {
    if (tempValorDoacao > 0 && tempValorDoacao + totalDoado <= valorMaximo && tempName.trim() && modoDoacao) {
      const novaDoacao = { nome: tempName, valor: tempValorDoacao, modo: modoDoacao };
      setDoacoes([...doacoes, novaDoacao]);
      setTotalDoado(totalDoado + tempValorDoacao);
      setTempName('');
      setTempValorDoacao(0);
      setModoDoacao('');
      console.log('Doação confirmada:', novaDoacao);
    } else {
      console.log('Erro: valor inválido ou limite excedido');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-6 mb-4">Doações em Dinheiro</h2>
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <input 
            type="checkbox" 
            checked={modoDoacao !== ''} 
            onChange={() => setModoDoacao(modoDoacao === '' ? 'Dinheiro' : '')}
            className="mr-2"
          />
          Quero doar em dinheiro
        </div>
        {modoDoacao && (
          <div className="mt-2 space-y-2">
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
            <div>
              <label className="block text-sm font-medium">Valor:</label>
              <input 
                type="number" 
                value={tempValorDoacao} 
                onChange={(e) => handleDoacaoChange(parseInt(e.target.value))}
                min="1"
                max={valorMaximo - totalDoado}
                className="border p-1 rounded-md w-full text-black"
              /> 
              de {valorMaximo - totalDoado} restantes
            </div>
            <div>
              <label className="block text-sm font-medium">Modo de Doação:</label>
              <select
                value={modoDoacao}
                onChange={(e) => handleModoDoacaoChange(e.target.value)}
                className="border p-1 rounded-md w-full text-black"
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Deposito">Depósito</option>
                <option value="Pix">PIX</option>
              </select>
            </div>
            <button 
              onClick={handleConfirmDoacao}
              className="bg-green-500 text-white py-1 px-4 rounded-md"
            >
              Confirmar Doação
            </button>
          </div>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">Doações Confirmadas</h2>
      <ul className="space-y-2">
        {doacoes.map((doacao, index) => (
          <li key={index} className="border p-2 rounded-md">
            {doacao.nome} - Valor: R${doacao.valor} - Modo: {doacao.modo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoacaoDinheiro;
