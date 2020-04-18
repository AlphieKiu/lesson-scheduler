package com.alphiekiu.repository;

import com.alphiekiu.domain.Lesson;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Lesson entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {

    @Query("select lesson from Lesson lesson where lesson.lessonToUser.login = ?#{principal.username}")
    List<Lesson> findByLessonToUserIsCurrentUser();

}
