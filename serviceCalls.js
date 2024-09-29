import axios from 'axios';

function serviceCalls() {
    const getCollectionObjectsCall = async (groupName, key, collectionId) => {
        const { data } = await axios.get(
            "https://client.vivreal.io/tenant/collectionObjects",
            {
                params: { groupName, key, collectionId },
            }
        );
        return data.map((obj) => obj.objectValue);
    }
    return {
        getCollectionObjectsCall,
    };
}

export default serviceCalls;