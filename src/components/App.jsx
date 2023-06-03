import { useEffect, useState } from "react"
import "./App.scss"
import { data } from "./data"

export const App = () => {
    const [jobList, setJobList] = useState(data.map(job => {
        let tagList = []
        tagList.push(job.role)
        tagList.push(job.level)
        tagList = tagList.concat(job.languages).concat(job.tools)
        return {...job, tagList: tagList, show: true}
    }))

    const [tagSectionList, setTagSectionList] = useState([])

    // Tag section list

    const ClickTag = (e) => {
        let newTagSectionList = tagSectionList

        if (!tagSectionList.includes(e.target.name)) {
            newTagSectionList.push(e.target.name)
        }

        setTagSectionList([...newTagSectionList])
    }

    const DeleteTag = (e) => {
        setTagSectionList(tagSectionList.filter(tag => tag !== e.target.name))
    }

    const ClearAllTags = () => {
        setTagSectionList([])
    }

    useEffect(() => {
        setJobList(jobList => jobList.map(job => {
            let mark = 0

            tagSectionList.forEach(tag => {
                if (!job.tagList.includes(tag)) {
                    mark = 1
                }
            })

            return {...job, show: mark === 0 ? true : false}
        }))
    }, [tagSectionList])

    return (
        <>
            <main>
                <div className="container">
                    <div className="tag-bar">
                        <div className="tag-section">
                            <ul>
                                {tagSectionList.map((tag, index) => (
                                    <li key={index}>
                                        <p className="tag-name">{tag}</p>
                                        <button type="button" name={tag} onClick={DeleteTag}>.</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="clear-btn" type="button" onClick={ClearAllTags}>Clear</button>
                    </div>
                    <ul className="main-section">
                        {jobList.map((job, index) => (
                            <li key={index} style={{display: job.show ? "" : "none"}}>
                                <div className="job-container">
                                    <div className="logo">
                                        <img src={job.logo} alt="" />
                                    </div>
                                    <div className="company-info">
                                        <div>
                                            <span className="company-name">{job.company}</span>
                                            <span className="new" style={{display: job.new ? "block" : "none"}}>NEW</span>
                                            <span className="featured" style={{display: job.featured ? "block" : "none"}}>FEATURED!</span>
                                        </div>
                                        <h1 className="position">{job.position}</h1>
                                        <div>
                                            <span className="posted-at">{job.postedAt}</span>
                                            <span className="dot"></span>
                                            <span className="contract">{job.contract}</span>
                                            <span className="dot"></span>
                                            <span className="location">{job.location}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="company-tag-list">
                                        {/* role, level, language, tools */}
                                        {job.tagList.map((tag, ind) => (
                                            <button
                                                key={ind}
                                                type="button"
                                                name={tag}
                                                onClick={ClickTag}>{tag}</button>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <footer>
                <div className="attribution">
                    Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. 
                    Coded by <a href="https://github.com/NhanPhamTrong">Nhan Pham</a>.
                </div>
            </footer>
        </>
    )
}