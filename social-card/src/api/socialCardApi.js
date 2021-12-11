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
    uploadFileIMG: (upload) => {
        const url = "/socialcards/upload_avatar";
        return AxiosClient.post(url, upload)
    },
    delete: (id) => {
        const url = "/socialcards/delete/" + id;
        return AxiosClient.delete(url)
    },
    update: (data) => {
        return AxiosClient.post("/socialcards/update", data)
    },
    saveComment: (data) => {
        return AxiosClient.post('/socialcards/save_comment', data);
    },
    showComment: () => {
        return AxiosClient.get('/socialcards/showcomment');
    },
    updateStatus: (id, value) => {
        return AxiosClient.get('/socialcards/update-status/' + id + '/' + value)
    },
    revertUndo : (id) => {
        const url = "/socialcards/revertundo/" + id;
        return AxiosClient.get(url)
    },
}

export default SocialCardsApi;