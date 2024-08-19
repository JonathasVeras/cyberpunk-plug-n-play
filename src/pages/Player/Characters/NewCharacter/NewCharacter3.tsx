import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../contexts/AuthContext";

const NewCharacter3: React.FC = () => {
  const { isAuthenticated, isOnline } = useAuth();
  const [ficha, setFicha] = useState<any>(JSON.parse(localStorage.getItem('ficha') || '{}'));
  const [dadosEnviados, setDadosEnviados] = useState(false);

  useEffect(() => {
    console.log("Componente montado: NewCharacter3");
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFicha((prevFicha: any) => ({
      ...prevFicha,
      [name]: value,
    }));
  };

  const handleSaveFicha = () => {
    const updatedFicha = { ...ficha };
    localStorage.setItem("ficha", JSON.stringify(updatedFicha));
  };

  const handleFinalizarClick = () => {
    if (!dadosEnviados) {
      handleSaveFicha();
      postFichaNoFirebase();
      setDadosEnviados(true);
    } else {
      window.location.href = '/fichasJogador';
    }
  };

  const handleSairClick = () => {
    window.location.href = '/fichasJogador';
  };

  const postFichaNoFirebase = () => {
    if (isAuthenticated && isOnline) {
      const url = 'https://cyberpunk-react-default-rtdb.firebaseio.com/fichas.json';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ficha),
      };

      fetch(url, options)
        .then(response => {
          if (!response.ok) throw new Error('Erro na requisição');
          return response.json();
        })
        .then(() => {
          alert('Ficha criada com sucesso');
        })
        .catch(error => {
          console.error('Erro ao enviar os dados:', error);
        });
    } else {
      alert("Você está offline. Seus dados serão salvos localmente.");
    }
  };

  return (
    <main className="bg-[url('../wallpapers/characters-list-wp.png')] min-h-screen flex flex-col justify-center items-center bg-cover bg-center text-white">
      <h1 className="text-4xl font-bold text-pinkish-red mt-0 pt-5">Crie Sua Ficha</h1>
      <div className="flex justify-center mt-4 mb-4">
        <form className="bg-purple-900 text-blue-punk w-full max-w-5xl p-5 border border-blue-punk">
          <h3 className="text-2xl font-bold text-blue-punk mb-4">Informações Pessoais</h3>
          <div className="flex space-x-4">
            <div>
              <label className="text-lg font-bold text-pinkish-red">Nome:</label>
              <input type="text" name="nomePersonagem" value={ficha.nomePersonagem || ''} onChange={handleInputChange} className="ml-5 inputFicha p-2 bg-black text-blue-punk" />
            </div>
            <div>
              <label className="text-lg font-bold text-pinkish-red">Idade:</label>
              <input type="text" name="idadePersonagem" value={ficha.idadePersonagem || ''} onChange={handleInputChange} className="ml-5 inputFicha p-2 bg-black text-blue-punk" />
            </div>
            <div>
              <label className="text-lg font-bold text-pinkish-red">Sexo:</label>
              <input type="text" name="sexoPersonagem" value={ficha.sexoPersonagem || ''} onChange={handleInputChange} className="ml-5 inputFicha p-2 bg-black text-blue-punk" />
            </div>
          </div>
          <div className="flex justify-end mt-8 space-x-4">
            <button type="button" onClick={handleSairClick} className="bg-pinkish-red text-black font-bold py-2 px-4 rounded">Sair</button>
            <button type="button" onClick={handleFinalizarClick} className="bg-yellow-punk text-black font-bold py-2 px-4 rounded">{dadosEnviados ? 'Voltar' : 'Continuar'}</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewCharacter3;
