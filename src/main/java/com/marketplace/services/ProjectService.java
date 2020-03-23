package com.marketplace.services;

import com.marketplace.models.Project;

import java.util.List;

public interface ProjectService {
    List<Project> findAll();

    Project save(Project project);

    void delete(Long id);

    void deleteMultiple(List<Long> idList);
}
