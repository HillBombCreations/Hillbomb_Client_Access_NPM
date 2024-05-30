import axios from 'axios';
import cookieFns from './cookieFns';

function ClientAccessApi() {
    const getCollectionObjects = async (collectionID, clientId, clientSecret) => {
        const { serveCookie } = cookieFns();
        // const refreshTokenObj = serveCookie('refreshToken');
        const tokenObj = serveCookie('token');
        let token = null;
        if (tokenObj) token = JSON.parse(tokenObj);

        if (token) {
            const { data } = await axios.get(
                'https://cms.hbcreations.io/tenant/getCollectionObjects',
                {
                    params: { collectionID },
                    headers: { "Authorization": token  },
                }
            );
            const sections = data.map((obj) => obj.objectValue);
            return sections;
        }
        token = await axios
        .post(
            'https://api.hbcreations.io/api/user/login',
            JSON.stringify({
                email: clientId,
                password: clientSecret,
            }),
            {
                headers: { "Content-Type": "application/json" }
            }
        )
        .then((res) => {
            document.cookie = `refreshToken=${JSON.stringify(res.data.refreshToken)}; path=/`;
            document.cookie = `token=${JSON.stringify(res.data.token)}; path=/`
            return res.data.token;
        });
        const { data } = await axios.get(
            'https://cms.hbcreations.io/tenant/getCollectionObjects',
            {
                params: { collectionID },
                headers: { "Authorization": token  },
            }
        );
        const sections = data.map((obj) => obj.objectValue);
        return sections;
    };
    
    return {
        getCollectionObjects,
    };
}

export default ClientAccessApi;