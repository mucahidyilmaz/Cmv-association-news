package com.cmvtech.associationnews.service;

import com.cmvtech.associationnews.dto.NewsDto;
import com.cmvtech.associationnews.entity.News;
import com.cmvtech.associationnews.util.TPage;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface NewsService {

    NewsDto create(NewsDto news);

    News getById(String id) throws IllegalAccessException;

    TPage<NewsDto> getAllPageable(Pageable newsPage);

    void delete(String id);

    List<News> getAll();

    NewsDto update(String id, NewsDto news);
}
