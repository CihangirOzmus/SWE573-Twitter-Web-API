package com.quizorus.backend.service;

import com.quizorus.backend.controller.dto.UserIdentityAvailability;
import com.quizorus.backend.controller.dto.UserProfile;
import com.quizorus.backend.controller.dto.UserResponse;
import com.quizorus.backend.exception.ResourceNotFoundException;
import com.quizorus.backend.model.LearningStep;
import com.quizorus.backend.model.Topic;
import com.quizorus.backend.model.User;
import com.quizorus.backend.repository.LearningStepRepository;
import com.quizorus.backend.repository.TopicRepository;
import com.quizorus.backend.repository.UserRepository;
import com.quizorus.backend.security.UserPrincipal;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;
    private TopicRepository topicRepository;
    private LearningStepRepository learningStepRepository;
    private ConfigurableConversionService quizorusConversionService;

    public UserService(UserRepository userRepository, TopicRepository topicRepository, LearningStepRepository learningStepRepository, ConfigurableConversionService quizorusConversionService) {
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
        this.learningStepRepository = learningStepRepository;
        this.quizorusConversionService = quizorusConversionService;
    }

    public UserResponse getCurrentUser(UserPrincipal currentUser){
        return quizorusConversionService.convert(currentUser, UserResponse.class);
    }

    public UserIdentityAvailability checkUsernameAvailability(String username){
        return new UserIdentityAvailability(!userRepository.existsByUsername(username));
    }

    public UserIdentityAvailability checkEmailAvailability(String email){
        return new UserIdentityAvailability(!userRepository.existsByEmail(email));
    }

    public UserProfile getUserProfileByUsername(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        List<Topic> createdTopics = topicRepository.findByCreatedBy(user.getId());
        List<Topic> enrolledTopics = topicRepository.findTopicEntitiesByEnrolledUsersContains(user);
        List<LearningStep> answers = learningStepRepository.findByUserId(user.getId());

        return new UserProfile(createdTopics, enrolledTopics, answers );
    }

}
