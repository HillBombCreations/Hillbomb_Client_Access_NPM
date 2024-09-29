import cookieFns from './cookieFns';
import serviceCalls from './serviceCalls';

function ClientAccessAPI() {
    const getCollectionObjects = async ({ groupName, key, collectionId }) => {
        const { getCollectionObjectsCall } = serviceCalls();

        let res;
        try {
            res = await getCollectionObjectsCall(groupName, key, collectionId);
        } catch (err) {
            throw err;
        }
        return res;
    };
    
    return {
        getCollectionObjects,
    };
}

export default ClientAccessAPI;