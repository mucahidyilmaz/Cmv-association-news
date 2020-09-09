package com.cmvtech.associationnews.entity;

import lombok.*;

import javax.persistence.Entity;


//@Table(name = "base_table")
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Notice extends BaseEntity {

    private String coverPhotoURL;

    public String getCoverPhotoURL() {
        return coverPhotoURL;
    }

    public void setCoverPhotoURL(String coverPhotoURL) {
        this.coverPhotoURL = coverPhotoURL;
    }
}
