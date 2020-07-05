const { URL } = require('url');
const querystring = require('querystring');
const fetch = require('node-fetch');

exports.getERP_URL = (pathName = '', searchParams = null) => {

    const baseAddress = process.env.ERP_BaseAddress;
    const port = process.env.ERP_PORT;

    const url  = new URL(pathName, baseAddress);
    url.port = port;

    if(searchParams) {
        url.search = new URLSearchParams(searchParams);
    }

    return url;
}

// exports.getSearchString = (searchQuery) => {

//     const qString = querystring.encode(searchQuery);
//     console.log(qString);
//     const objQ = querystring.decode(qString);
//     console.log(objQ);

//     const q = new URLSearchParams(qString);
//     console.log('state')
//     console.log( 'ok',q);
// }

function checkStatus(res) {
    if (res.ok) { // res.status >= 200 && res.status < 300
        return res;
    } else {
        throw MyCustomError(res.statusText);
    }
}

exports.getErpData = async (pathName = '', searchParams = {}) => {
    
    try {

        const erpUrl = this.getERP_URL(pathName, searchParams);
        const response = await fetch(erpUrl);

        if (response.ok) {
            return await response.json();
        } else if(response.status === 404) {
            return null;
        }

        throw new Error('Error , status : ' + response.status + ' - text : ' + response.statusText);
        
    } catch(e) {
        throw e;
    }
}