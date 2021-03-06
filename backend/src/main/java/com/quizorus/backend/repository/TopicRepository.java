package com.quizorus.backend.repository;

import com.quizorus.backend.model.Topic;
import com.quizorus.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

    Optional<Topic> findById(Long topicId);

    List<Topic> findByCreatedBy(Long userId);

    List<Topic> findByPublished(Boolean published);

    void deleteById(Long topicId);

    List<Topic> findTopicEntitiesByEnrolledUsersContains(User user);

    List<Topic> findTopicByEnrolledUsersContainsAndPublished(User user,Boolean published);
}
