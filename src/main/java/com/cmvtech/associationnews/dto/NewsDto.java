package com.cmvtech.associationnews.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewsDto {

    private String id;

    private String topic;

    private LocalDate created;

    private LocalDate expDate;

    private String content;
}
