package com.marketplace.controllers;

import com.marketplace.models.Project;
import com.marketplace.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/projects")
public class ProjectController {
    private ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Project>> findAll() {
        List<Project> projects = projectService.findAll();
        return ResponseEntity.ok(projects);
    }

    @PostMapping("/")
    public ResponseEntity<Project> save(@Valid @RequestBody Project project) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(projectService.save(project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        projectService.delete(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/")
    public ResponseEntity<Void> deleteMultiple(@Valid @RequestBody List<Long> idList) {
        projectService.deleteMultiple(idList);
        return ResponseEntity.ok().build();
    }
}
