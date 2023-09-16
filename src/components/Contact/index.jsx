import { useSelector } from 'react-redux'
import { languageSelector } from "../../features/LanguageSlices";
import './style.scss'
import { Link } from 'react-router-dom';

function Contact() {
    const { contact, socialNetwork } = useSelector(languageSelector);
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