import { Link } from "react-router-dom"
import './style.scss'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Loader, LoaderWrapper } from "../../utils/loader";
import { fetchFrench, languageSelector, clearState } from "../../features/LanguageSlices";

function Header() {
    const handleClick = (ref) => {
        document.getElementById(ref).scrollIntoView()
        setCollapse()
    }
    const [visible, setVisible] = useState('close')
    const setCollapse = () => {
        setVisible(visible === 'close' ? 'open' : 'close')
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFrench());
    }, [dispatch]);
    
    const { isError,socialNetwork, isFetching, menu } = useSelector(languageSelector);
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
        <div className="header">
            <nav>
                {isFetching ? (
                    <LoaderWrapper>
                        <Loader />
                    </LoaderWrapper>    
                    ) : ( 
                        socialNetwork?.map((contas, index) => (
                            <Link key={`socialmedia-${index}`} to={contas.url} target="_blank">
                                <i className={contas.icon}></i> 
                            </Link>
                        ))
                    )
                }
                <Link onClick={() => setCollapse()}>
                    <i className="fad fa-bars"></i>
                </Link>
                <div className={`menu collapse ${visible}`}>
                    {isFetching ? (
                        <LoaderWrapper>
                            <Loader />
                        </LoaderWrapper>    
                        ) : ( 
                            menu?.map((item, index) => (
                                <Link key={`menu-${index}`} onClick={() => handleClick(item.url)}>
                                    {item.label}
                                </Link>
                            ))
                        )
                    }
                </div>
            </nav>
        </div>
    )
}
export default Header