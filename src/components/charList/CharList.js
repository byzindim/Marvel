import React, {useState, useEffect, useRef} from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1560);
    const [charEnded, setCharEnded] = useState(false);
  
    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    },[])
   
    const onCharListLoading = () => {
        setNewItemLoading(true)
    }
    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharList)
            .catch(onError)

    }
    const onCharList = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setLoader(loader => false);
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }
    const onError = () => {
        setLoader(loader => false)
        setError(true)
    }

    const renderItems = (arr) =>  {
        const imgClassName = 'char__item';
        const imgClassNameChange = `${imgClassName}__change`;
        const items = arr.map((item, i) => {
            return (
                <li key = {i} onClick={() => props.onCharSelected(item.id)} className={(item.thumbnail.indexOf('image_not_available.jpg') > -1) ? imgClassNameChange : imgClassName}>
                    <img src={item.thumbnail} alt={item.thumbnail}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
        const items = renderItems(charList);
        const content = !(loader || error) ? items : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loader ? <Spinner /> : null; 
        return (
            <div className="char__list">
                {errorMessage}
                {content}
                {spinner}
                <button
                     className="button button__main button__long"
                     disabled={newItemLoading}
                     style={{'display': charEnded ? 'none' : 'block'} }
                     onClick={() => onRequest(offset)}
                     >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

export default CharList;