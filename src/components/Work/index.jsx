import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataLanguage, languageSelector, clearState } from "../../features/LanguageSlices";
import Masonry from 'react-masonry-css'
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './style.scss'

function Work() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDataLanguage());
    }, [dispatch]);
    
    const { isError, works } = useSelector(languageSelector);
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
    const [categoryFiltered, setCategoryFiltered] = useState();
    const filterWorks = (
        (!categoryFiltered ? works : works.filter(work => work.category === categoryFiltered)) || []
    )
    const catList = new Set(works?.map((work) => work.category));
    const filterCat = Array.from(catList)
    const breakpointColumnsObj = {
        default: 3,
        700: 2,
        500: 1
    };
    const [isOpen, setIsOpen] = useState(false);
    const [workId, setWorkId] = useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    Modal.setAppElement('#root');
    const toggleModal = useCallback((id) => () => {
        setIsOpen(!isOpen)
        setWorkId(id)
    }, [isOpen]);
    let workModal
    if(workId) {
        workModal = works.filter(work => work.id === workId)
    }
    return (
        <div className="container">
            <section id='work'>
                <h2 className="title">Réalisation</h2>
                <ul className="filterCat">
                    <li onClick={() => setCategoryFiltered()}>Tous</li>
                    {filterCat.sort().map((cat, index) => (
                    <li key={`cat-${index}`} onClick={() => setCategoryFiltered(cat)}>{cat}</li>  
                    ))}
                </ul>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {filterWorks.map((work) => (
                        <div className="item" key={work.id} onClick={toggleModal(work.id)}>
                            <img src={`/img/thumbnail_${work.img}`} alt={work.title} />
                            <div className="over" onClick={toggleModal(work.id)}>
                                <h3>{work.title}</h3>
                                <p><i className="fad fa-tags"></i> {work.category}</p>
                            </div>
                        </div>
                    ))}
                </Masonry>
                <Modal
                    style={customStyles}
                    isOpen={isOpen}
                    onRequestClose={toggleModal(workId)}>
                    <button className="close-modal" onClick={toggleModal(workId)}>
                        <i className="fad fa-times-circle"></i>  
                    </button>
                    {workId ?(workModal.map((workModal) => (
                        <div key={`modal-${workModal.id}`} className='modal-work'>
                            {workModal.images ? (
                                <Carousel
                                infiniteLoop={true}
                                showStatus={false}
                                showIndicators={true}
                                showThumbs={false}
                                >
                                {workModal.images.map((image, index) => (
                                    <div key={`image_${index}`}>
                                        <img src={`img/${image}`} alt={image} />
                                    </div>
                                ))}
                                </Carousel>
                            ) : (
                                <><img src={`/img/${workModal.img}`} alt={workModal.title} /></>
                            )}
                            <h2>{workModal.title}</h2>
                            <h3>{workModal.category}</h3>
                            <p>{workModal.description}</p>
                            <ul className='tag'>
                                {workModal.tag.map((tag) => (
                                    <li key={tag}><i className="fad fa-star"></i> {tag}</li>
                                ))}
                            </ul>
                            <div className='btn'>
                                {workModal.github && (
                                    <Link to={workModal.github} target="_blank">
                                        <i className="fab fa-github"></i> Voir le code
                                    </Link>
                                )}
                                {workModal.url && (
                                    <Link to={workModal.url} target="_blank">
                                        <i className="fad fa-external-link"></i> Visiter le site
                                    </Link>
                                )}
                            </div>
                        </div> 
                    ))) : (null)
                    }
                </Modal>
            </section>
        </div>
    )
}
export default Work