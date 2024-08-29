import axios from "axios";

function serviceCalls() {
    const getCollectionObjectsCall = async (collectionID, token) => {
        const { data } = await axios.get(
            "https://cms.hbcreations.io/tenant/collectionObjects",
            {
                params: { collectionID },
                headers: { Authorization: token  },
            }
        );
        return data.map((obj) => obj.objectValue);
    }
    const getClientTokenCall = async (clientId, clientSecret) => {
        const { data } = await axios.post(
            "https://api.hbcreations.io/api/user/login",
            JSON.stringify({
                username: clientId,
                password: clientSecret
            }),
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        document.cookie = `refreshToken=${JSON.stringify(data.refreshToken)}; path=/`;
        document.cookie = `token=${JSON.stringify(data.token)}; path=/`;

        return data.token;
    }
    return {
        getCollectionObjectsCall,
        getClientTokenCall,
    };
}

export default serviceCalls;