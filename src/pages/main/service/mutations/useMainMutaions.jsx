import {SampleApi} from '@api/SampleApi'

const useMainMutaions = () => {

    const postData = async (param) => {
        return await SampleApi.postItem(param);
    }

    return {postData}
}

export default useMainMutaions;