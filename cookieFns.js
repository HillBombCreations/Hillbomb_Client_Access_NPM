function cookieFns() {
    const eatCookie = async () => {
        // mmm yum yum yum
        try {
            document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.replace('/login');
        } catch (err) {
            console.error(err)
        }
    }
    const serveCookie = (cname) => {
        let name = cname + '=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return '';
    }
    return {
        eatCookie,
        serveCookie,
    };
}

export default cookieFns;