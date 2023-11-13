import { Link } from "react-router-dom"
import './style.scss'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataLanguage, languageSelector, clearState } from "../../features/LanguageSlices";
import detectBrowserLanguage from 'detect-browser-language'

function Header() {
    const [language, setLanguage] = useState('english')
    const languageBrowser = detectBrowserLanguage()
    useEffect(() => {
        if(languageBrowser === 'pt-BR' || languageBrowser === 'pt') {
            setLanguage('portugues')
        }
        if(languageBrowser === 'fr' || languageBrowser === 'fr-fr' || languageBrowser === 'fr-be' || languageBrowser === 'fr-ca' || languageBrowser === 'fr-lu' || languageBrowser === 'fr-mc' || languageBrowser === 'fr-ch') {
            setLanguage('french')
        }
    },[languageBrowser])
    const handleClick = (ref) => {
        document.getElementById(ref).scrollIntoView()
        setCollapse()
    }
    const [visible, setVisible] = useState('close')
    const setCollapse = () => {
        setVisible(visible === 'close' ? 'open' : 'close')
    }
    const dispatch = useDispatch();
    const { isError, socialNetwork, menu } = useSelector(languageSelector);
    useEffect(() => {
        dispatch(fetchDataLanguage(language));
    }, [dispatch, language]);
     
    useEffect(() => {
            return () => {
            dispatch(clearState());
        };
    }, [dispatch]);
    
    useEffect(() => {
        if (isError) {
            dispatch(clearState());
        }
    }, [isError, dispatch]);
    console.log(language)
    return (
        <div className="header">
            <nav>
                <ul className="translation">
                    <li className="active"><i className="fal fa-language"></i> {language}</li>
                    <li onClick={() => setLanguage('english')}>English</li>
                    <li onClick={() => setLanguage('french')}>French</li>
                    <li onClick={() => setLanguage('portugues')}>Portugues</li>
                </ul>
                {socialNetwork?.map((contas, index) => (
                    <Link key={`socialmedia-${index}`} to={contas.url} target="_blank">
                        <i className={contas.icon}></i> 
                    </Link>
                ))}
                <Link onClick={() => setCollapse()}>
                    <i className="fad fa-bars"></i>
                </Link>
                <div className={`menu collapse ${visible}`}>
                    {menu?.map((item, index) => (
                        <Link key={`menu-${index}`} onClick={() => handleClick(item.url)}>
                            {item.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    )
}
export default Header