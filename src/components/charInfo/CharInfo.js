import React from 'react';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';
class CharInfo extends React.Component {
    state = {
        char: null,
        loading: false,
        error: false,
     }
    
     marvelService = new MarvelService();

     onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }
    
    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const { charId } = this.props;
        if(!charId) {
            return;
        }
        this.onCharLoading();
        this.marvelService
        .getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    render() {
        const {char, loading, error} = this.state;
        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner /> : null;
        const content =   !(loading || error || !char) ? <View char={char}/> : null
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const imgClassName = 'char__basics';
    const imgClassNameChange = `${imgClassName}__change`;
    if(comics.length > 0) {
        return (
            <>
            <div className={(thumbnail.indexOf('http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') > -1) ? imgClassNameChange : imgClassName}>
                        <img src={thumbnail} alt={name} />
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <a href= {homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={wiki} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="char__descr">{description}</div>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {
                            comics.map((item, i) => {
                                if(i >8) return;
                                return (
                                    <li key = {i} className="char__comics-item">
                                        {item.name}
                                    </li>
                                )
                            })
                        }
                        
                        
                    </ul>
                </>
        )
    } else {
        return <h1>This char dosent comics</h1>;
    }
    

}

CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo;