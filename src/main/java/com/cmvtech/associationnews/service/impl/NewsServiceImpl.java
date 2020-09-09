package com.cmvtech.associationnews.service.impl;

import com.cmvtech.associationnews.dto.NewsDto;
import com.cmvtech.associationnews.entity.News;
import com.cmvtech.associationnews.repo.NewsRepo;
import com.cmvtech.associationnews.service.NewsService;
import com.cmvtech.associationnews.util.TPage;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Service
@RequestMapping("/news")
@CrossOrigin(origins = "http://localhost:3000/")
public class NewsServiceImpl implements NewsService {


    private final NewsRepo newsRepo;
    private final ModelMapper modelMapper;


    public NewsServiceImpl(NewsRepo newsRepo, ModelMapper modelMapper) {
        this.newsRepo = newsRepo;
        this.modelMapper = modelMapper;

    }

    @Override
    public NewsDto create(NewsDto news) {
        News newsDb = modelMapper.map(news, News.class);
        newsDb = newsRepo.save(newsDb);
        return modelMapper.map(newsDb, NewsDto.class);
    }

    @Override
    public News getById(String id) throws IllegalAccessException {

        Optional<News> optionalNews = newsRepo.findById(id);

        if (!optionalNews.isPresent()) {
            throw new IllegalAccessException("News-Null Error Message");

        } else {
            return optionalNews.get();
        }


    }

    @Override
    public TPage<NewsDto> getAllPageable(Pageable newsPage) {
        Page<News> data = newsRepo.findAll(newsPage);
        TPage page = new TPage<NewsDto>();
        NewsDto[] dtos = modelMapper.map(data.getContent(), NewsDto[].class);
        page.setStat(data, Arrays.asList(dtos));
        return page;
    }


    @Override
    public void delete(String id) {
        newsRepo.deleteById(id);
    }

    @Override
    public List<News> getAll() {
        return newsRepo.findAll();
    }

    @Override
    public NewsDto update(String id, NewsDto news){

        News newsDb = newsRepo.getOne(id);

        newsDb.setTopic(news.getTopic());
        newsDb.setContent(news.getContent());
        newsDb.setCreated(news.getCreated());
        newsDb.setExpDate(news.getExpDate());

        newsRepo.save(newsDb);
        return modelMapper.map(newsDb,NewsDto.class);
    }

}
