import React, { Component } from 'react';
import {ACCESS_TOKEN, API_BASE_URL} from "../util";
import axios from "axios/index";
import {Button, Table} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { faPlus } from '@fortawesome/free-solid-svg-icons/index'
import { WikiLabels } from "./Wiki";

class UserCreatedTopicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            isLoading: false,
            input: ''
        };
        this.loadUserCreatedTopics = this.loadUserCreatedTopics.bind(this);
        this.handleDeleteTopicById = this.handleDeleteTopicById.bind(this);
    }

    loadUserCreatedTopics() {
        const username = this.props.currentUser.username;
        let url = API_BASE_URL + `/topics/${username}`;

        const REQUEST_HEADERS = {
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        };

        axios.get(url, REQUEST_HEADERS)
            .then(res => {
                this.setState({
                    topics: res.data,
                    isLoading: false
                })
        }).catch(err => {
            this.setState({ isLoading: false })
        });
    }

    handleDeleteTopicById(topicIdToDelete) {
        let url = API_BASE_URL + `/topics/topic/${topicIdToDelete}`;

        const REQUEST_HEADERS = {
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        };

        axios.delete(url, REQUEST_HEADERS)
            .then(res => {
                this.loadUserCreatedTopics()
            }).catch(err => {
                console.log(err)
            });
    }

    componentDidMount() {
        this.loadUserCreatedTopics()
    }

    render() {

        const topics = this.state.topics;

        const topicsView = topics.map((topic, topicIndex) => {
            return (
                <tr key={topicIndex}>
                    <td>{topicIndex+1}</td>
                    <td>
                        <img src={topic.imageUrl} alt="" style={{ width: '100px' }}/>
                    </td>
                    <td>{topic.title}</td>
                    <td>{topic.description}</td>
                    <td>
                        <WikiLabels wikis={topic.wikiData} />
                    </td>
                    <td>{topic.contentList.length}</td>
                    <td>
                        <Link className="btn btn-outline-info" to={`/topic/${topic.id}`}>Details</Link>
                        <Link className="disabled btn btn-outline-warning ml-2" to={`/topic/${topic.id}`}>Statistics</Link>
                        <Button className="ml-2" variant="outline-danger" onClick={() => this.handleDeleteTopicById(topic.id)}>Delete</Button>
                    </td>
                </tr>
            )
        });

        return (
            <React.Fragment>
                {/*<PageHeader title="Created Topic List" />*/}

                <div className="container-fluid">
                    <div className="row mt-5">
                        <div className="col-md-12 text-center">
                            <Link to="/topic/new" className="btn btn-outline-info">
                                <FontAwesomeIcon icon={faPlus} /> Create a Topic
                            </Link>
                        </div>
                    </div>

                    <div className="mt-5 mb-5">
                        <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th style={{ width: '30%' }}>Short Description</th>
                                <th>WikiData</th>
                                <th>#Learning Path</th>
                                <th style={{ width: '30%' }}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {topicsView}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default UserCreatedTopicList;