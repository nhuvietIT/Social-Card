import AxiosClient from "./axiosClient";

const SocialCardsApi = {
    showdata: () => {
        return AxiosClient.get('/socialcards/showdata');
    },
    saveAll: (data) => {
        return AxiosClient.post('/socialcards/save_socialcard', data);
    },
    uploadFile: (upload) => {
        const url = "/socialcards/upload";
        return AxiosClient.post(url, upload)
    },
    delete: (id) => {
        const url = "/socialcards/delete/" + id;
        return AxiosClient.delete(url)
    },
}

export default SocialCardsApi;