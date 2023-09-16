import { useSelector } from 'react-redux'
import { languageSelector} from "../../features/LanguageSlices";
import './style.scss'

function Skills() {
    const { skills, menu } = useSelector(languageSelector);
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