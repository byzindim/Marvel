import React from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends React.Component {
    state = {
        charList: [],
        loader: true,
        error: false,
        newItemLoading: false,
        offset: 1560,
        charEnded: false,
    }
    marvelService = new MarvelService();

    componentDidMount () {
        this.onRequest();
        
    }
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharList)
            .catch(this.onError)

    }
    onCharList = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }
        this.setState(({offset, charList}) => ({
                charList: [...charList, ...newCharList], 
                loader: false, 
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
        }))
        
    }
    onError = () => {
        this.setState({
            loader: false,
            error: true
        })
    }

    renderItems(arr)  {
        const imgClassName = 'char__item';
        const imgClassNameChange = `${imgClassName}__change`;
        const items = arr.map((item, i) => {
            return (
                <li key = {i} onClick={() => this.props.onCharSelected(item.id)} className={(item.thumbnail.indexOf('image_not_available.jpg') > -1) ? imgClassNameChange : imgClassName}>
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
    
    render() {
        const {charList, error, loader, offset, newItemLoading, charEnded} = this.state;
        const items = this.renderItems(charList);
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
                     onClick={() => this.onRequest(offset)}
                     >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;