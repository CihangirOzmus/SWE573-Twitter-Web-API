package com.quizorus.backend.util;

import com.quizorus.backend.model.Topic;
import com.quizorus.backend.model.User;
import com.quizorus.backend.payload.TopicResponse;
import com.quizorus.backend.payload.UserSummary;

public class ModelMapper {

    public static TopicResponse mapTopicToTopicResponse(Topic topic, User creator){
        TopicResponse topicResponse = new TopicResponse();
        topicResponse.setId(topic.getId());
        topicResponse.setTitle(topic.getTitle());
        topicResponse.setCreationDateTime(topic.getCreatedAt());

        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
        topicResponse.setCreatedBy(creatorSummary);

        return topicResponse;
    }
}