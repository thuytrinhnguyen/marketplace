package com.marketplace.services.impl;

import com.marketplace.mappers.ProjectMapper;
import com.marketplace.models.Project;
import com.marketplace.repositories.ProjectRepository;
import com.marketplace.services.ProjectService;
import lombok.var;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {
    private ProjectRepository repository;
    private ProjectMapper projectMapper;

    public ProjectServiceImpl(ProjectRepository repository, ProjectMapper projectMapper) {
        this.repository = repository;
        this.projectMapper = projectMapper;
    }

    public List<Project> findAll() {
        var entities = repository.findAll();
        return projectMapper.toModels(entities);
    }

    public Project save(Project project) {
        var entity = projectMapper.toEntity(project);
        entity = repository.save(entity);
        return projectMapper.toModel(entity) ;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public void deleteMultiple(List<Long> idList) {
        repository.deleteAll(repository.findAllById(idList));
    }
}


