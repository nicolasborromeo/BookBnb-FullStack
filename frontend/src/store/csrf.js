import Cookies from 'js-cookie'


export const csrfFetch = async (url, options = {} ) => {
    options.headers = options.headers || {}
    options.method = options.method || 'GET'

    if(options.method.toUpperCase() !== 'GET') {
        if (options.headers["Content-Type"] === "multipart/form-data") {
            delete options.headers["Content-Type"];
        } else {
            const csrfToken = Cookies.get('XSRF-TOKEN');
            options.headers['XSRF-TOKEN'] = csrfToken
            options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json'
        }
    }

    const res = await window.fetch(url, options);
    if(res.status >= 400) throw res;
    return res
}

export const restoreCSRF = () => {
    return csrfFetch('/api/csrf/restore');
}
