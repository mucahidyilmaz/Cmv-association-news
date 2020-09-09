package com.cmvtech.associationnews.repo;


import com.cmvtech.associationnews.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface NoticeRepo extends JpaRepository<Notice, String> {

    Page<Notice> findAll(Pageable noticePage);
}
