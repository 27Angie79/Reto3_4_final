package tutoria.domingo.interfaces;

import org.springframework.data.repository.CrudRepository;
import tutoria.domingo.modelo.Costume;

public interface InterfaceCostume extends CrudRepository <Costume, Integer> {
    
}
