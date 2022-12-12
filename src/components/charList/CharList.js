import React from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends React.Component {
    state = {
        charList: [],
        loader: true,
        error: false
    }
    marvelService = new MarvelService();

    
    componentDidMount () {
        this.marvelService
        .getAllCharacters()
        .then(this.onCharList)
        .catch(this.onError)
    }
    onCharList = (charList) => {
        this.setState({charList, loader: false})
        
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
                <li key = {item.id} onClick={() => this.props.onCharSelected(item.id)}className={(item.thumbnail.indexOf('image_not_available.jpg') > -1) ? imgClassNameChange : imgClassName}>
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
        const {charList, error, loader} = this.state;
        const items = this.renderItems(charList);
        const content = !(loader || error) ? items : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loader ? <Spinner /> : null; 
        // {(this.onChangeList) ? content.slice(10, 19) + content  : content}
        return (
            <div className="char__list">
                {errorMessage}
                {content}
                {spinner}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;