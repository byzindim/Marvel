
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '1b01da36cda268d5d0573041ec2f71fb';
   getResource = async (url) => {
    let res = await fetch(url);
    if(!res.ok) {
        throw new Error(`${url}, ${res.status}`)
    }
    return await res.json();
   }

   getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
        }
}



export default MarvelService;