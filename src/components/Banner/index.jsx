import Sebastien from '../../assets/sebastien-guilet.webp'
import HTML from '../../assets/html.webp'
import CSS from '../../assets/css.webp'
import JAVASCRIPT from '../../assets/javascipt.webp'
import REACT from '../../assets/react.webp'
import './style.scss'
import { useSelector } from 'react-redux'
import { languageSelector } from "../../features/LanguageSlices";

function Banner() {
    const { banner } = useSelector(languageSelector);
    return (
        <div className="banner" id="banner">
            <div className="container">
                <div className="content-banner">
                    <div className='avatar' >
                        <img src={Sebastien} alt="Sébastien Guilet developpeur Front-End" />
                    </div>
                    <div className="text">
                        <h1>{banner?.title}</h1>
                        <h2>{banner?.job}</h2>
                        <h3>{banner?.tag}</h3>
                        <p>{banner?.description}</p>
                        <ul className="skills">
                            <li><img src={HTML} alt="HTML" /></li>
                            <li><img src={CSS} alt="CSS" /></li>
                            <li><img src={JAVASCRIPT} alt="JavaScript" /></li>
                            <li><img src={REACT} alt="React" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner