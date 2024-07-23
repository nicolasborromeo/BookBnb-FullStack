import Cookies from 'js-cookie'


export const csrfFetch = async (url, options = {} ) => {
    options.headers = options.headers || {}
    options.method = options.method || 'GET'
    console.log('url', url, 'options headers', options.headers)
    if(options.method.toUpperCase() !== 'GET') {
        const csrfToken = Cookies.get('XSRF-TOKEN');
        options.headers['XSRF-TOKEN'] = csrfToken
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json'
    }

    const res = await window.fetch(url, options);
    if(res.status >= 400) throw res;
    return res
}

export const restoreCSRF = () => {
    return csrfFetch('/api/csrf/restore');
}
