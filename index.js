import cookieFns from "./cookieFns";
import serviceCalls from "./serviceCalls";

function ClientAccessAPI() {
    const getCollectionObjects = async (collectionID, clientId, clientSecret) => {
        const { getCollectionObjectsCall, getClientTokenCall } = serviceCalls();
        const { serveCookie } = cookieFns();
        // testing
        let token = null;
        const tokenObj = serveCookie("token");
        if (tokenObj) token = JSON.parse(tokenObj);

        if (!token) {
            token = await getClientTokenCall(clientId, clientSecret);
        }
        return await getCollectionObjectsCall(collectionID, token);
    };
    
    return {
        getCollectionObjects,
    };
}

export default ClientAccessAPI;