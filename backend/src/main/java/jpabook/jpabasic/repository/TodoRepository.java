package jpabook.jpabasic.repository;

import jpabook.jpabasic.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository  extends JpaRepository<Todo,Long> {
}
