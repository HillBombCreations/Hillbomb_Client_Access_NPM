import cookieFns from './cookieFns';
import serviceCalls from './serviceCalls';

function ClientAccessAPI() {
    const getCollectionObjects = async (collectionID, key, clientId, clientSecret) => {
        const { getCollectionObjectsCall, getClientTokenCall } = serviceCalls();
        const { serveCookie } = cookieFns();

        let token = null;
        const tokenObj = serveCookie('token');
        if (tokenObj) token = JSON.parse(tokenObj);

        if (!token) {
            token = await getClientTokenCall(clientId, clientSecret);
        }

        let res;
        try {
            res = await getCollectionObjectsCall(collectionID, key, token);
        } catch (err) {
            token = await getClientTokenCall(clientId, clientSecret);
            res = await getCollectionObjectsCall(collectionID, key, token);
        }
        return res;
    };
    
    return {
        getCollectionObjects,
    };
}

export default ClientAccessAPI;