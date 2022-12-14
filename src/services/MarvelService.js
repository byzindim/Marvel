
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '1b01da36cda268d5d0573041ec2f71fb';
    _baseOfset = 210;
   getResource = async (url) => {
    let res = await fetch(url);
    if(!res.ok) {
        throw new Error(`${url}, ${res.status}`)
    }
    return await res.json();
   }

   getAllCharacters = async (offset = this._baseOfset) => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
}

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }
    _transformCharacter = (char) => {
            return {
                id: char.id,
                name: char.name,
                description: (char.description === null || char.description === '') ? 'Not description' : char.description.slice(0,15),
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                comics: char.comics.items,
            } 
            
        
        
    }
}



export default MarvelService;