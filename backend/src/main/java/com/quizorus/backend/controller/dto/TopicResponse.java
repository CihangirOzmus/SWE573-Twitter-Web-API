package com.quizorus.backend.controller.dto;

import com.quizorus.backend.model.Content;
import com.quizorus.backend.model.WikiData;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopicResponse {

    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private Long createdBy;
    private List<WikiData> wikiData;
    private List<Content> contentList;
    private boolean published;

}
