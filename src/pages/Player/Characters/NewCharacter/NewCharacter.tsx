import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CriarFicha: React.FC = () => {
  const [antecedente, setAntecedente] = useState("");
  const navigate = useNavigate();

  const handleSair = () => {
    // Limpar a seleção
    setAntecedente("");
    // Redirecionar para a página de fichas de jogador
    navigate("/characters");
  };

  const handleContinuar = () => {
    // Salvar no localStorage
    const ficha = { antecedente };
    localStorage.setItem("ficha", JSON.stringify(ficha));
    // Redirecionar para a próxima página
    navigate("/NewCharacter2");
  };

  return (
    <div className="bg-[url('../wallpapers/characters-list-wp.png')] min-h-screen bg-cover bg-fixed bg-center flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#ef767a] py-4 self-start ml-4">
        Crie Sua Ficha
      </h1>

      <div className="bg-[#220425] text-[#00ffff] border-2 border-[#00ffff] w-[800px] p-6 rounded-tr-xl rounded-bl-xl mt-20">
        <form>
          <label
            htmlFor="antecedente"
            className="block text-2xl font-bold mb-4 text-center"
          >
            Antecedente
          </label>
          <p className="text-lg text-[#ef767a] mb-4">
            Seu Antecedente dirá quem você era antes da aventura começar, não
            precisa representar sua ocupação atual:
          </p>
          <select
            id="selectAntecedente"
            value={antecedente}
            onChange={(e) => setAntecedente(e.target.value)}
            className="block w-full bg-black text-[#00ffff] p-2 rounded-lg text-lg mb-6"
          >
            <option value="">Selecione...</option>
            <option value="idol">Idol</option>
            <option value="midia">Mídia</option>
            <option value="netrunner">Netrunner</option>
            <option value="nomade">Nômade</option>
            <option value="policial">Policial</option>
            <option value="solo">Solo</option>
            <option value="technomante">Technomante</option>
            <option value="technomedico">Technomédico</option>
            <option value="atleta">Atleta</option>
            <option value="brutamonte">Brutamonte</option>
            <option value="corporativo">Corporativo</option>
            <option value="criminoso">Criminoso</option>
          </select>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleSair}
              className="bg-red-600 text-black font-bold py-2 px-4 rounded-lg"
            >
              Sair
            </button>
            <button
              type="button"
              onClick={handleContinuar}
              className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CriarFicha;
