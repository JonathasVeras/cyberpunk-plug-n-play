import instance from "../api/axios";

export async function loginAPI(username: String, password: String) {
  try {
    const response = await instance.get("/perfis.json");
    const data = response.data;

    const perfis = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
    const perfil = perfis.find(
      (p) => p.username === username && p.password === password
    );
    return perfil;
  } catch (error) {
    alert("Erro ao autenticar o perfil. Tente novamente.");
    return null;
  }
}
