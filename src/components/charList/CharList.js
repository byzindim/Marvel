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
        offset: 210,
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
        this.setState(({offset, charList}) => ({
                charList: [...charList, ...newCharList], 
                loader: false, 
                newItemLoading: false,
                offset: offset + 9,
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
        const items = arr.map(item => {
            return (
                <li key = {item.id} onClick={() => this.props.onCharSelected(item.id)} className={(item.thumbnail.indexOf('image_not_available.jpg') > -1) ? imgClassNameChange : imgClassName}>
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
        const {charList, error, loader, offset, newItemLoading} = this.state;
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
                     onClick={() => this.onRequest(offset)}
                     >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;