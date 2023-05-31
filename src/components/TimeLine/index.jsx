import { useDispatch, useSelector } from 'react-redux'
import { fetchDataLanguage, languageSelector, clearState } from "../../features/LanguageSlices";
import './style.scss'
import { useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
function TimeLine() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDataLanguage());
    }, [dispatch]);
    
    const { isError, timeLine, menu } = useSelector(languageSelector);
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
    const titlePage = menu?.filter(menu => menu.url === 'timeLine')
    return (
        <section id="timeLine">
            <div className="container">
                {titlePage?.map((title) => (
                    <h2 className="title" key={title.label}>{title.label}</h2>
                ))}
                <VerticalTimeline lineColor={ '#1cbbb4' }>
                    {timeLine?.map((item, index) => (
                        <VerticalTimelineElement
                            key={`time-line-${index}`}
                            className="vertical-timeline-element--work"
                            date={item.date}
                            iconStyle={{ background: '#1cbbb4', color: '#fff', borderColor: "#f5f5f5" }}
                            icon={<i className={item.icon}></i>}
                        >
                            <h3 className="vertical-timeline-element-title">{item.title}</h3>
                            <h4 className="vertical-timeline-element-subtitle">{item.location}</h4>
                            <p>{item.description}</p>
                        </VerticalTimelineElement>
                    ))}
                    <VerticalTimelineElement
                        iconStyle={{ background: '#1cbbb4', color: '#fff', borderColor: "#f5f5f5" }}
                        icon={<i className='fad fa-hourglass-start'></i>}
                    />
                </VerticalTimeline>
            </div>
        </section>
    )
}
export default TimeLine