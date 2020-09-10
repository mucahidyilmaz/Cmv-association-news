package com.cmvtech.associationnews.service.impl;

import com.cmvtech.associationnews.dto.NoticeDto;
import com.cmvtech.associationnews.entity.Notice;
import com.cmvtech.associationnews.repo.NoticeRepo;
import com.cmvtech.associationnews.service.NoticeService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequestMapping("/notice")
@CrossOrigin(origins = "http://localhost:3000/")
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepo noticeRepo;
    private final ModelMapper modelMapper;

    public NoticeServiceImpl(NoticeRepo noticeRepo, ModelMapper modelMapper) {
        this.noticeRepo = noticeRepo;
        this.modelMapper = modelMapper;
    }

    @Override
    public NoticeDto create(NoticeDto notice) {
        Notice noticeDb = modelMapper.map(notice,Notice.class);
        noticeDb = noticeRepo.save(noticeDb);
        return modelMapper.map(noticeDb,NoticeDto.class);
    }

    @Override
    public Notice getById(String id) throws IllegalAccessException {


        Optional<Notice> optionalNotice = noticeRepo.findById(id);

        if (!optionalNotice.isPresent()) {
            throw new IllegalAccessException("Notice-Null Error Message");

        } else {
            return optionalNotice.get();
        }
    }




    @Override
    public void delete(String id) {
        noticeRepo.deleteById(id);

    }

    @Override
    public List<Notice> getAll() {
        return noticeRepo.findAll();
    }

    @Override
    public NoticeDto update(String id, NoticeDto notice){

        Notice noticeDb = noticeRepo.getOne(id);

        noticeDb.setTopic(notice.getTopic());
        noticeDb.setCreated(notice.getCreated());
        noticeDb.setExpDate(notice.getExpDate());
        noticeDb.setCoverPhotoURL(notice.getCoverPhotoURL());
        noticeDb.setContent(notice.getContent());

        noticeRepo.save(noticeDb);
        return modelMapper.map(noticeDb,NoticeDto.class);
    }

}
