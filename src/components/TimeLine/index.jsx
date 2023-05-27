import { useDispatch, useSelector } from 'react-redux'
import { Loader, LoaderWrapper } from "../../utils/loader";
import { fetchFrench, languageSelector, clearState } from "../../features/LanguageSlices";
import './style.scss'
import { useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
function TimeLine() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFrench());
    }, [dispatch]);
    
    const { isError,isFetching, timeLine } = useSelector(languageSelector);
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
        <section id="timeLine">
            <div className="container">
                <h2 className="title">Time Line</h2>
                <VerticalTimeline lineColor={ '#1cbbb4' }>
                    {isFetching ? (
                        <LoaderWrapper>
                            <Loader />
                        </LoaderWrapper>    
                        ) : (
                            timeLine?.map((item, index) => (
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
                            ))
                        )
                    }
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