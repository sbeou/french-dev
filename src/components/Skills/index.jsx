import { useDispatch, useSelector } from 'react-redux'
import { fetchDataLanguage, languageSelector, clearState } from "../../features/LanguageSlices";
import './style.scss'
import { useEffect } from 'react';

function Skills() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDataLanguage());
    }, [dispatch]);
    
    const { isError, skills } = useSelector(languageSelector);
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
        <section id='skills'>
            <div className="container">
                <h2 className="title">Compétences</h2>
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