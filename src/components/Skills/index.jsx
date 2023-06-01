import { useDispatch, useSelector } from 'react-redux'
import { fetchDataLanguage, languageSelector, clearState } from "../../features/LanguageSlices";
import './style.scss'
import { useEffect } from 'react';

function Skills() {
    const dispatch = useDispatch();
    const { isError, skills, menu } = useSelector(languageSelector);
    useEffect(() => {
        dispatch(fetchDataLanguage());
    }, [dispatch]);
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
    const titlePage = menu?.filter(menu => menu.url === 'skills')
    return (
        <section id='skills'>
            <div className="container">
                {titlePage?.map((title) => (
                    <h2 className="title" key={title.label}>{title.label}</h2>
                ))}
                <div className='skills'>
                    {skills?.map((skill) => (
                        <div className='item' key={skill.title}>
                            <i className={skill.icon}></i>
                            <h3>{skill.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills