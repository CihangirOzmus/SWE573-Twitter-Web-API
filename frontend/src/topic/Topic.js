import React, { Component } from 'react';
import { API_BASE_URL, REQUEST_HEADERS } from "../constants";
import axios from "axios";
import { Row, Tab } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import PageHeader from "../components/PageHeader";
import { PathNavigator, PathTabs } from "../components/LearningPath";

class Topic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: {
                contentList: []
            },
            activeTab: ''
        };
        this.loadTopicById = this.loadTopicById.bind(this);
    }

    loadTopicById() {
        const url = API_BASE_URL + `/topics/topic/${this.props.match.params.topicId}`;

        axios.get(url, REQUEST_HEADERS)
            .then(res => {
                this.setState({
                    topic: res.data,
                    activeTab: res.data.contentList.length > 0 ? res.data.contentList[0].id : ''
                })
            }).catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.loadTopicById();
    }

    render() {

        const { topic, activeTab } = this.state;
        const { editable } = this.props;

        return (
            <React.Fragment>
                <PageHeader title="Details">
                    {editable ? (
                        <Link to={`/${this.props.currentUser.username}/topics/created`} className="breadcrumbLink">
                            <span>My Topics</span>
                        </Link>
                    ) : (
                            <Link to={`/explore`} className="breadcrumbLink">
                                <span>Glossary</span>
                            </Link>
                        )}
                </PageHeader>

                <div className="bg-alt sectionPadding text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2">

                            </div>
                            <div className="col-md-4">
                                <img src={topic.imageUrl} className="img-fluid rounded" alt={topic.title} />
                            </div>
                            <div className="col-md-4">
                                <h4 className="mb-4"><strong>{topic.title}</strong>
                                    {editable && (
                                        <Link className="btn btn-outline-primary btn-sm ml-2 inlineBtn" to={`/topic/${topic.id}/edit`}>
                                            <FontAwesomeIcon icon={faEdit} /> Update
                                        </Link>
                                    )}
                                </h4>
                                <p className="text-left">
                                    {topic.description}
                                </p>
                            </div>
                            <div className="col-md-2">

                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-5">
                    <div className="row col-md-12 text-left">
                        <h4>
                            Learning <strong>Path</strong>
                            {editable && (
                                <Link className="btn btn-info btn-sm ml-2 inlineBtn" to={`/topic/${topic.id}/content`}>
                                    <FontAwesomeIcon icon={faPlus} /> Content
                                </Link>)}

                        </h4>
                    </div>
                </div>
                {
                    activeTab && (
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey={activeTab}>
                            <div className="container-fluid mt-5 text-left" >
                                <Row>
                                    <PathNavigator contents={topic.contentList} />
                                    <PathTabs contents={topic.contentList} editable={editable} handleRefresh={() => this.loadTopicById()} />
                                </Row>
                            </div>
                        </Tab.Container>
                    )
                }
            </React.Fragment>
        )
    }
}

export default withRouter(Topic);