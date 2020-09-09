package com.cmvtech.associationnews.api;

import com.cmvtech.associationnews.dto.NewsDto;
import com.cmvtech.associationnews.entity.News;
import com.cmvtech.associationnews.service.impl.NewsServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news")
public class NewsController {



    private final NewsServiceImpl newsServiceImpl;

    public NewsController(NewsServiceImpl newsServiceImpl) {
        this.newsServiceImpl = newsServiceImpl;
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getById(@PathVariable("id") String id) throws IllegalAccessException{

        return ResponseEntity.ok(newsServiceImpl.getById(id));
    }

    @PostMapping
    public ResponseEntity<NewsDto> createNews(@RequestBody NewsDto news) {
        return ResponseEntity.ok(newsServiceImpl.create(news));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteNews(@PathVariable("id") String id) {
        newsServiceImpl.delete(id);
        return ResponseEntity.ok("Erase Completed");
    }


    @GetMapping
    public ResponseEntity<List<News>> getAll() {
        return ResponseEntity.ok(newsServiceImpl.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsDto> updateNews(@PathVariable("id") String id,@RequestBody NewsDto news){
         return ResponseEntity.ok(newsServiceImpl.update(id,news));
     }
}
