import { useDispatch, useSelector } from 'react-redux'
import { Loader, LoaderWrapper } from "../../utils/loader";
import { fetchFrench, languageSelector, clearState } from "../../features/LanguageSlices";
import './style.scss'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFrench());
    }, [dispatch]);
    
    const { isError,isFetching, contact, socialNetwork } = useSelector(languageSelector);
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
                {isFetching ? (
                    <LoaderWrapper>
                        <Loader />
                    </LoaderWrapper>    
                    ) : (
                        <div className='contact'>
                            <Link to={contact?.email}><i className="fad fa-envelope-open-text"></i> {contact?.email} </Link>
                            <Link to={contact?.whatsapp}><i className="fab fa-whatsapp"></i> {contact?.phone} </Link>
                            {socialNetwork?.map((contas, index) => (
                                <Link key={`socialmediaFooter-${index}`} to={contas.url} target="_blank">
                                    <i className={contas.icon}></i> 
                                </Link>
                            ))}
                        </div>
                    )
                }
            </div>
        </footer>
    )
}

export default Contact