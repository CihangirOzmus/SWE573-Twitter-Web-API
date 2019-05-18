package com.quizorus.backend.controller;

import com.quizorus.backend.model.Choice;
import com.quizorus.backend.controller.dto.ApiResponse;
import com.quizorus.backend.model.Question;
import com.quizorus.backend.security.CurrentUser;
import com.quizorus.backend.security.UserPrincipal;
import com.quizorus.backend.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/questions")
public class QuestionController {

    private QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/{contentId}")
    public ResponseEntity<List<Question>> getQuestionsByContentId(@CurrentUser UserPrincipal currentUser, @PathVariable Long contentId){
        return questionService.getQuestionsByContentId(currentUser, contentId);
    }

    @PostMapping("/{questionId}/choices")
    @Transactional
    public ResponseEntity<ApiResponse> createChoiceByQuestionId(@CurrentUser UserPrincipal currentUser, @PathVariable Long questionId, @Valid @RequestBody Choice choiceRequest){
        return questionService.createChoiceByQuestionId(currentUser, questionId, choiceRequest);
    }

    @DeleteMapping("/{questionId}")
    @Transactional
    public ResponseEntity<ApiResponse> deleteQuestionById(@CurrentUser UserPrincipal currentUser, @PathVariable Long questionId){
        return questionService.deleteQuestionById(questionId, currentUser);
    }

}
