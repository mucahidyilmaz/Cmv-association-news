package com.cmvtech.associationnews.api;

import com.cmvtech.associationnews.dto.NoticeDto;
import com.cmvtech.associationnews.entity.Notice;
import com.cmvtech.associationnews.service.impl.NoticeServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeServiceImpl noticeServiceImpl;

    public NoticeController(NoticeServiceImpl noticeServiceImpl) {
        this.noticeServiceImpl = noticeServiceImpl;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notice> getById(@PathVariable("id") String id) throws IllegalAccessException {

        return ResponseEntity.ok(noticeServiceImpl.getById(id));
    }
    @PostMapping
    public ResponseEntity<NoticeDto> createNotice(@RequestBody NoticeDto notice){
        return ResponseEntity.ok(noticeServiceImpl.create(notice));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteNotice(@PathVariable("id") String id) {
        noticeServiceImpl.delete(id);
        return ResponseEntity.ok("Erase Completed");
    }


    @GetMapping
    public ResponseEntity<List<Notice>> getAll() {
        return ResponseEntity.ok(noticeServiceImpl.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoticeDto> updateNews(@PathVariable("id") String id, @RequestBody NoticeDto notice){
        return ResponseEntity.ok(noticeServiceImpl.update(id,notice));
    }
}


