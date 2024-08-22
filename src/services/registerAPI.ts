import instance from "../api/axios";

export async function registerAPI(username: String, password: String) {
    const url = '/perfis.json';
    try {
        const response = await instance.post(url, { username, password });
        return response.data;
    } catch (error) {
        console.error('Erro ao registrar o perfil:', error);
        alert('Error.');
        return null;
    }
}
