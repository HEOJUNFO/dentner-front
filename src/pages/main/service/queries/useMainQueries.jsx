import { MainApi } from '@api/MainApi'

const useMainQueries = () => {

    const fetchBrandingMain = (param) => {
        return MainApi.fetchBrandingMain(param);
    }

    const fetchImage = async (link) => {
        const img = await MainApi.fetchImage(link);
        const url = window.URL.createObjectURL(img.data);

        return Promise.resolve(url);
    }

    return {fetchBrandingMain, fetchImage}
}

export default useMainQueries;