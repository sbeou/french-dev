import Modal from 'react-modal';
import { useSelector } from 'react-redux'
import { languageSelector } from "../../features/LanguageSlices";
import Masonry from 'react-masonry-css'
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './style.scss'

function Work() {
    const { works, menu, allCat } = useSelector(languageSelector);
    const [categoryFiltered, setCategoryFiltered] = useState();
    const selectCat = (cat) => {
        setCategoryFiltered(cat)   
    }
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
    const titlePage = menu?.filter(menu => menu.url === 'work')
    return (
        <div className="container">
            <section id='work'>
                {titlePage?.map((title) => (
                    <h2 className="title" key={title.label}>{title.label}</h2>
                ))}
                <ul className="filterCat">
                    <li className={!categoryFiltered ? 'active' : ''} onClick={() => setCategoryFiltered()}>{allCat}</li>
                    {filterCat.sort().map((cat, index) => (
                    <li className={cat === categoryFiltered ? 'active' : ''} key={`cat-${index}`} onClick={() => selectCat(cat)}>{cat}</li>  
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
                                        <i className="fab fa-github"></i> Github
                                    </Link>
                                )}
                                {workModal.url && (
                                    <Link to={workModal.url} target="_blank">
                                        <i className="fad fa-external-link"></i> Demo
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