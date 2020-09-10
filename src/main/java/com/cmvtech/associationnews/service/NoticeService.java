package com.cmvtech.associationnews.service;

import com.cmvtech.associationnews.dto.NoticeDto;
import com.cmvtech.associationnews.entity.Notice;

import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NoticeService {

    NoticeDto create(NoticeDto notice) ;

    Notice getById(String id) throws IllegalAccessException;


    void delete(String id);

    List<Notice> getAll();

    NoticeDto update(String id, NoticeDto notice);
}
