export default class API {
  base_url:string = "http://localhost:8001"
  api(method: string, url: string, body:any=null) {
    return fetch(
      this.base_url + url, {
        method: method,
        body: body,
      })
  }
  get(url) {
    return this.api('GET', url)
  }
  post(url, data) {
    return this.api('POST', url, data)
  }
  download(url) {
    return Promise.resolve(window.open(this.base_url + url))
  }
}
