package com.cmvtech.associationnews.repo;

import com.cmvtech.associationnews.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



public interface NewsRepo extends JpaRepository<News, String> {

    Page<News> findAll(Pageable newsPage);
}
