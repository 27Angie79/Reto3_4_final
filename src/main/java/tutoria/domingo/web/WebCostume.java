

package tutoria.domingo.web;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import tutoria.domingo.modelo.Costume;
import tutoria.domingo.servicios.ServiciosCostume;

@RestController
@RequestMapping("/api/Costume")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})

public class WebCostume {
    
    @GetMapping("/holaMundo")
    public String saludad(){
    return "Hola Mundo Tutoria";
    }
    
    @Autowired
    private ServiciosCostume servicio;
    @GetMapping("all")
    public List <Costume> getCostume(){
        return servicio.getAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Costume> getCostumes(@PathVariable("id") int idCostumes) {
        return servicio.getCostume(idCostumes);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Costume save(@RequestBody Costume costumes) {
        return servicio.save(costumes);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Costume update(@RequestBody Costume costumes) {
        return servicio.update(costumes);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int costumeId) {
        return servicio.deleteOrtesis(costumeId);
    }
    
}

    

