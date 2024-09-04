const get = function get(url, params) {
    const response = this.$http.get(url, { params: params }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
    return response
}

const post = function post(url, formData) {
    const response = this.$http.post(url, formData, { headers: { 'content-type': 'application/json' } })
    return response
}

export { get, post }
