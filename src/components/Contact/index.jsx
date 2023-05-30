import { useDispatch, useSelector } from 'react-redux'
import { fetchDataLanguage, languageSelector, clearState } from "../../features/LanguageSlices";
import './style.scss'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDataLanguage());
    }, [dispatch]);
    
    const { isError,contact, socialNetwork } = useSelector(languageSelector);
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
    return (
        <footer id="contact">
            <div className="container">
                <div className='contact'>
                    <Link to={`mailto:${contact?.email}`}><i className="fad fa-envelope-open-text"></i> {contact?.email} </Link>
                    <Link to={contact?.whatsapp}><i className="fab fa-whatsapp"></i> {contact?.phone} </Link>
                    {socialNetwork?.map((contas, index) => (
                        <Link key={`socialmediaFooter-${index}`} to={contas.url} target="_blank">
                            <i className={contas.icon}></i> 
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Contact