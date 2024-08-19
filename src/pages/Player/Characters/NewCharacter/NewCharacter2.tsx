import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Attributes {
  agilidade: number;
  corpo: number;
  forca: number;
  resistencia: number;
  bloqueio: number;
  briga: number;
  esquiva: number;
  foco: number;
  autocontrole: number;
  destreza: number;
  inteligencia: number;
  sabedoria: number;
  empatia: number;
  intimidacao: number;
  lideranca: number;
  seducao: number;
  aceitacao: number;
  humanidade: number;
  invasao: number;
  protecao: number;
  destino: number;
  fe: number;
  narrativa: number;
  sorte: number;
}

const CreateCharacter: React.FC = () => {
  const initialAttributes: Attributes = {
    agilidade: 2,
    corpo: 2,
    forca: 2,
    resistencia: 2,
    bloqueio: 2,
    briga: 2,
    esquiva: 2,
    foco: 2,
    autocontrole: 2,
    destreza: 2,
    inteligencia: 2,
    sabedoria: 2,
    empatia: 2,
    intimidacao: 2,
    lideranca: 2,
    seducao: 2,
    aceitacao: 2,
    humanidade: 2,
    invasao: 2,
    protecao: 2,
    destino: 2,
    fe: 2,
    narrativa: 2,
    sorte: 2,
  };

  const [attributes, setAttributes] = useState<Attributes>(initialAttributes);
  const [remainingPoints, setRemainingPoints] = useState<number>(24);
  const [tempValues, setTempValues] = useState<Attributes>(initialAttributes); // Temp values for input
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    updateRemainingPoints();
  }, [attributes]);

  const validateValue = (value: number): number => {
    if (value < 2) {
      alert("Apenas os valores de 2 a 10 estão permitidos");
      return 2;
    }
    if (value > 10) {
      alert("Apenas os valores de 2 a 10 estão permitidos");
      return 10;
    }
    return value;
  };

  const handleAttributeChange = (name: keyof Attributes, value: number) => {
    setTempValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (name: keyof Attributes) => {
    const validatedValue = validateValue(tempValues[name]);
    const newAttributes = {
      ...attributes,
      [name]: validatedValue,
    };
    const totalPoints =
      72 - Object.values(newAttributes).reduce((acc, val) => acc + val, 0);

    if (totalPoints < 0) {
      alert("Você não pode alocar mais pontos do que o permitido.");
      setTempValues((prev) => ({
        ...prev,
        [name]: 2,
      }));
    } else {
      setAttributes(newAttributes);
      setTempValues((prev) => ({
        ...prev,
        [name]: validatedValue,
      }));
    }

    updateRemainingPoints();
  };

  const updateRemainingPoints = () => {
    const totalPoints =
      72 - Object.values(attributes).reduce((acc, val) => acc + val, 0);
    setRemainingPoints(totalPoints);
  };

  const handleSaveAndContinue = () => {
    if (
      remainingPoints > 0 &&
      !window.confirm(
        "Você ainda tem pontos sobrando, tem certeza que deseja continuar?"
      )
    ) {
      return;
    }

    const ficha = {
      ...attributes,
      vidaMaxima: attributes.resistencia + attributes.forca,
      pontosVidaToken: (attributes.resistencia + attributes.forca) * 10,
      sanidadeMaxima: attributes.autocontrole + attributes.sabedoria,
      percepcaoPassiva: (attributes.destreza + attributes.sabedoria) / 2,
      pesoMaximo: 4 + (attributes.forca + attributes.resistencia) * 5,
      identidade: attributes.humanidade * 3 + 20,
      velocidadeBase: (attributes.agilidade + attributes.destreza) / 2,
      movimento: attributes.agilidade / 2,
      correr: (attributes.agilidade / 2) * 4,
      caminharETerrenoDificil: (attributes.agilidade / 2) * 2,
      feridoESobrecarregado: (attributes.agilidade / 2) * 1,
      reducaoDanos: attributes.resistencia / 2,
    };

    // Recuperar ficha existente
    const existingFicha = JSON.parse(localStorage.getItem("ficha") || "{}");

    // Atualizar com novos dados
    const updatedFicha = {
      ...existingFicha,
      ...ficha,
    };

    localStorage.setItem("ficha", JSON.stringify(updatedFicha));

    // Resetar os valores
    setAttributes(initialAttributes);
    setTempValues(initialAttributes); // Resetar os valores temporários
    setRemainingPoints(24);

    // Navegar para a próxima página
    navigate("/characters/new-character3");
  };

  const handleExit = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    navigate("/characters");
  };

  return (
    <main className="bg-[url('../wallpapers/characters-list-wp.png')] min-h-screen flex flex-col items-center bg-cover bg-center text-white p-5">
      <h1 className="text-4xl text-pinkish-red mt-0 pt-5">Crie Sua Ficha</h1>
      <div className="flex justify-center mt-5 mb-5 w-full">
        <form
          ref={formRef}
          className="bg-[#220425] text-blue-punk border-blue-punk border-3 p-5 w-full max-w-4xl"
        >
          <h3 className="text-3xl font-bold text-center">Atributos</h3>
          <p className="text-xl text-pinkish-red mb-2">
            Cada um dos seguintes 6 atributos terá 4 subatributos. Você poderá
            definir qual a afinidade do seu personagem com cada um destes por
            meio da distribuição de 72 pontos dentre todos os 24.
          </p>
          <p className="text-xl text-pinkish-red mb-5">
            *Lembre-se, para cada valor, o mínimo é 2 pontos e o máximo é 10
            pontos.
          </p>
          <div className="flex justify-center mb-5">
            <label className="text-xl text-pinkish-red mr-5">
              Pontos restantes:
            </label>
            <input
              type="text"
              className="bg-black text-blue-punk font-sans text-center"
              value={remainingPoints}
              readOnly
            />
          </div>
          <div className="flex flex-col space-y-5">
            {/* Linha 1: Físico, Combate, Mental */}
            <div className="flex space-x-5">
              <div className="flex-1">
                <h4 className="font-bold text-xl border-[#05b8e9] border-3 rounded-md text-center w-full mb-2">
                  Físico
                </h4>
                <div className="flex flex-col space-y-2">
                  {["agilidade", "corpo", "forca", "resistencia"].map(
                    (subAttr) => (
                      <div key={subAttr} className="flex items-center">
                        <label className="text-lg mr-2">
                          {subAttr.charAt(0).toUpperCase() + subAttr.slice(1)}:
                        </label>
                        <input
                          type="number"
                          className="bg-black text-blue-punk"
                          value={tempValues[subAttr as keyof Attributes]}
                          onChange={(e) =>
                            handleAttributeChange(
                              subAttr as keyof Attributes,
                              parseInt(e.target.value, 10) || 0
                            )
                          }
                          onBlur={() => handleBlur(subAttr as keyof Attributes)}
                          min={2}
                          max={10}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-xl border-[#05b8e9] border-3 rounded-md text-center w-full mb-2">
                  Combate
                </h4>
                <div className="flex flex-col space-y-2">
                  {["bloqueio", "briga", "esquiva", "foco"].map((subAttr) => (
                    <div key={subAttr} className="flex items-center">
                      <label className="text-lg mr-2">
                        {subAttr.charAt(0).toUpperCase() + subAttr.slice(1)}:
                      </label>
                      <input
                        type="number"
                        className="bg-black text-blue-punk"
                        value={tempValues[subAttr as keyof Attributes]}
                        onChange={(e) =>
                          handleAttributeChange(
                            subAttr as keyof Attributes,
                            parseInt(e.target.value, 10) || 0
                          )
                        }
                        onBlur={() => handleBlur(subAttr as keyof Attributes)}
                        min={2}
                        max={10}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-xl border-[#05b8e9] border-3 rounded-md text-center w-full mb-2">
                  Mental
                </h4>
                <div className="flex flex-col space-y-2">
                  {[
                    "autocontrole",
                    "destreza",
                    "inteligencia",
                    "sabedoria",
                  ].map((subAttr) => (
                    <div key={subAttr} className="flex items-center">
                      <label className="text-lg mr-2">
                        {subAttr.charAt(0).toUpperCase() + subAttr.slice(1)}:
                      </label>
                      <input
                        type="number"
                        className="bg-black text-blue-punk"
                        value={tempValues[subAttr as keyof Attributes]}
                        onChange={(e) =>
                          handleAttributeChange(
                            subAttr as keyof Attributes,
                            parseInt(e.target.value, 10) || 0
                          )
                        }
                        onBlur={() => handleBlur(subAttr as keyof Attributes)}
                        min={2}
                        max={10}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Linha 2: Social, Techno, Oculto */}
            <div className="flex space-x-5">
              <div className="flex-1">
                <h4 className="font-bold text-xl border-[#05b8e9] border-3 rounded-md text-center w-full mb-2">
                  Social
                </h4>
                <div className="flex flex-col space-y-2">
                  {["empatia", "intimidacao", "lideranca", "seducao"].map(
                    (subAttr) => (
                      <div key={subAttr} className="flex items-center">
                        <label className="text-lg mr-2">
                          {subAttr.charAt(0).toUpperCase() + subAttr.slice(1)}:
                        </label>
                        <input
                          type="number"
                          className="bg-black text-blue-punk"
                          value={tempValues[subAttr as keyof Attributes]}
                          onChange={(e) =>
                            handleAttributeChange(
                              subAttr as keyof Attributes,
                              parseInt(e.target.value, 10) || 0
                            )
                          }
                          onBlur={() => handleBlur(subAttr as keyof Attributes)}
                          min={2}
                          max={10}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-xl border-[#05b8e9] border-3 rounded-md text-center w-full mb-2">
                  Techno
                </h4>
                <div className="flex flex-col space-y-2">
                  {["aceitacao", "humanidade", "invasao", "protecao"].map(
                    (subAttr) => (
                      <div key={subAttr} className="flex items-center">
                        <label className="text-lg mr-2">
                          {subAttr.charAt(0).toUpperCase() + subAttr.slice(1)}:
                        </label>
                        <input
                          type="number"
                          className="bg-black text-blue-punk"
                          value={tempValues[subAttr as keyof Attributes]}
                          onChange={(e) =>
                            handleAttributeChange(
                              subAttr as keyof Attributes,
                              parseInt(e.target.value, 10) || 0
                            )
                          }
                          onBlur={() => handleBlur(subAttr as keyof Attributes)}
                          min={2}
                          max={10}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-xl border-[#05b8e9] border-3 rounded-md text-center w-full mb-2">
                  Oculto
                </h4>
                <div className="flex flex-col space-y-2">
                  {["destino", "fe", "narrativa", "sorte"].map((subAttr) => (
                    <div key={subAttr} className="flex items-center">
                      <label className="text-lg mr-2">
                        {subAttr.charAt(0).toUpperCase() + subAttr.slice(1)}:
                      </label>
                      <input
                        type="number"
                        className="bg-black text-blue-punk"
                        value={tempValues[subAttr as keyof Attributes]}
                        onChange={(e) =>
                          handleAttributeChange(
                            subAttr as keyof Attributes,
                            parseInt(e.target.value, 10) || 0
                          )
                        }
                        onBlur={() => handleBlur(subAttr as keyof Attributes)}
                        min={2}
                        max={10}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-10">
              <button
                type="button"
                className="bg-red-600 text-black font-bold rounded-md p-5 mr-5"
                onClick={handleExit}
              >
                Sair
              </button>
              <button
                type="button"
                className="bg-yellow-punk text-black font-bold rounded-md p-5"
                onClick={handleSaveAndContinue}
              >
                Continuar
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateCharacter;
