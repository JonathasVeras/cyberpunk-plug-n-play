import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";

const NewCharacter3: React.FC = () => {
  const { isAuthenticated, isOnline } = useAuth();
  const [ficha, setFicha] = useState<any>(
    JSON.parse(localStorage.getItem("ficha") || "{}")
  );
  const [dadosEnviados, setDadosEnviados] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Componente montado: NewCharacter3");
    if (isAuthenticated && isOnline) {
      console.log("Usuário está online");
    } else {
      console.log("Usuário está offline");
    }
  }, [isAuthenticated, isOnline]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFicha((prevFicha: any) => ({
      ...prevFicha,
      [name]: value,
    }));
  };

  const postFichaLocal = () => {
    // Recupera todas as fichas armazenadas no localStorage
    const fichas = JSON.parse(localStorage.getItem("fichas") || "{}");
    const nomePersonagem = ficha.name;

    // Atualiza a ficha atual no objeto de fichas
    fichas[nomePersonagem] = { ...ficha };

    // Salva todas as fichas atualizadas de volta no localStorage
    localStorage.setItem("fichas", JSON.stringify(fichas));
  };

  const postFichaNoFirebase = () => {
    const nomePersonagem = ficha.name; // Pegue o nome do personagem da ficha

    const url = `https://cyberpunk-react-default-rtdb.firebaseio.com/fichas/${nomePersonagem}.json`; // Use o nome como ID
    const options = {
      method: "PUT", // Use PUT para criar ou atualizar uma ficha com o ID específico
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ficha),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw new Error("Erro na requisição");
        return response.json();
      })
      .then(() => {
        alert("Ficha criada com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
      });
  };

  const handleFinalizarClick = () => {
    if (!dadosEnviados) {
      if (isAuthenticated && isOnline) {
        postFichaNoFirebase(); // Apenas envia para o Firebase se online
      } else {
        postFichaLocal(); // Salva localmente se offline
        alert("Você está offline. Seus dados foram salvos localmente.");
      }
      setDadosEnviados(true);
    } else if (dadosEnviados) {
      navigate("/characters");
    }
  };

  const handleSairClick = () => {
    navigate("/characters");
  };

  return (
    <main className="bg-[url('../wallpapers/characters-list-wp.png')] min-h-screen flex flex-col justify-center items-center bg-cover bg-center text-white">
      <h1 className="text-4xl font-bold text-pinkish-red mt-0 pt-5">
        Crie Sua Ficha
      </h1>
      <div className="flex justify-center mt-4 mb-4">
        <form className="bg-dark-purple text-blue-punk w-full max-w-5xl p-5 border border-blue-punk">
          <h3 className="text-2xl font-bold text-blue-punk mb-4">
            Informações Pessoais
          </h3>
          <div className="flex space-x-4">
            <div>
              <label className="text-lg font-bold text-pinkish-red">
                Nome:
              </label>
              <input
                type="text"
                name="name"
                value={ficha.name || ""}
                onChange={handleInputChange}
                className="ml-5 inputFicha p-2 bg-black text-blue-punk"
              />
            </div>
            <div>
              <label className="text-lg font-bold text-pinkish-red">
                Idade:
              </label>
              <input
                type="text"
                name="age"
                value={ficha.age || ""}
                onChange={handleInputChange}
                className="ml-5 inputFicha p-2 bg-black text-blue-punk"
              />
            </div>
            <div>
              <label className="text-lg font-bold text-pinkish-red">
                Sexo:
              </label>
              <input
                type="text"
                name="gender"
                value={ficha.gender || ""}
                onChange={handleInputChange}
                className="ml-5 inputFicha p-2 bg-black text-blue-punk"
              />
            </div>
          </div>
          <div className="flex justify-end mt-8 space-x-4">
            <button
              type="button"
              onClick={handleSairClick}
              className="bg-pinkish-red text-black font-bold py-2 px-4 rounded"
            >
              Sair
            </button>
            <button
              type="button"
              onClick={handleFinalizarClick}
              className="bg-yellow-punk text-black font-bold py-2 px-4 rounded"
            >
              {dadosEnviados ? "Voltar" : "Continuar"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewCharacter3;
