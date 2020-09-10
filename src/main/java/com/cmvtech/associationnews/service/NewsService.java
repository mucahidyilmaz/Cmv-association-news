package com.cmvtech.associationnews.service;

import com.cmvtech.associationnews.dto.NewsDto;
import com.cmvtech.associationnews.entity.News;


import java.util.List;


public interface NewsService {

    NewsDto create(NewsDto news);

    News getById(String id) throws IllegalAccessException;

    void delete(String id);

    List<News> getAll();

    NewsDto update(String id, NewsDto news);
}
