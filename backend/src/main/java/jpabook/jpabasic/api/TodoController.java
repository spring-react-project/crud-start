package jpabook.jpabasic.api;


import jpabook.jpabasic.domain.Todo;
import jpabook.jpabasic.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoRepository repo;

    private Todo findTodo(Long id) {
        return repo.findById(id).orElseThrow(() ->
                new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Todo not found"
                ));
    }

    @PostMapping
    public Todo create(@RequestBody Todo todo){
        todo.setId(null);
        return repo.save(todo);
    }

    @GetMapping
    public List<Todo> list(){
        return repo.findAll();
    }
    @GetMapping("/{id}")
    public Todo getOne(@PathVariable Long id){
        return findTodo(id);
    }

    @PatchMapping("/{id}/toggle")
    public Todo toggle(@PathVariable Long id){
        Todo t = findTodo(id);
        t.setDone(!t.isDone());
        return  repo.save(t);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        Todo t=findTodo(id);
        repo.delete(t);
    }
}
