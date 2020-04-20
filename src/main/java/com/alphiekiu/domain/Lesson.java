package com.alphiekiu.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Lesson.
 */
@Entity
@Table(name = "lesson")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Lesson implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "lesson_time", nullable = false, unique = true)
    private ZonedDateTime lessonTime;

    @NotNull
    @Column(name = "lesson_type", nullable = false)
    private String lessonType;

    @Column(name = "notes")
    private String notes;

    @Column(name = "approved")
    private Boolean approved;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("lessons")
    private User lessonToUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Lesson name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getLessonTime() {
        return lessonTime;
    }

    public Lesson lessonTime(ZonedDateTime lessonTime) {
        this.lessonTime = lessonTime;
        return this;
    }

    public void setLessonTime(ZonedDateTime lessonTime) {
        this.lessonTime = lessonTime;
    }

    public String getLessonType() {
        return lessonType;
    }

    public Lesson lessonType(String lessonType) {
        this.lessonType = lessonType;
        return this;
    }

    public void setLessonType(String lessonType) {
        this.lessonType = lessonType;
    }

    public String getNotes() {
        return notes;
    }

    public Lesson notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Boolean isApproved() {
        return approved;
    }

    public Lesson approved(Boolean approved) {
        this.approved = approved;
        return this;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    public User getLessonToUser() {
        return lessonToUser;
    }

    public Lesson lessonToUser(User user) {
        this.lessonToUser = user;
        return this;
    }

    public void setLessonToUser(User user) {
        this.lessonToUser = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Lesson)) {
            return false;
        }
        return id != null && id.equals(((Lesson) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Lesson{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", lessonTime='" + getLessonTime() + "'" +
            ", lessonType='" + getLessonType() + "'" +
            ", notes='" + getNotes() + "'" +
            ", approved='" + isApproved() + "'" +
            "}";
    }
}
