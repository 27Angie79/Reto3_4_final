package tutoria.domingo.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tutoria.domingo.modelo.Costume;
import tutoria.domingo.repositorio.RepositorioCostume;

@Service
public class ServiciosCostume {
    @Autowired
    private RepositorioCostume metodosCrud;

    public List<Costume> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Costume> getCostume (int costumeId) {
        return metodosCrud.getCostume(costumeId);
    }

    public Costume save(Costume Costumes){
        if(Costumes.getId()==null){
            return metodosCrud.save(Costumes);
        }else{
            Optional<Costume> evt=metodosCrud.getCostume(Costumes.getId());
            if(evt.isEmpty()){
                return metodosCrud.save(Costumes);
            }else{
                return Costumes;
            }
        }
    }
    
    public Costume update(Costume costume){
        if(costume.getId()!=null){
            Optional<Costume> e=metodosCrud.getCostume(costume.getId());
            if(!e.isPresent()){
                if(costume.getName()!=null){
                    e.get().setName(costume.getName());
                }
                if(costume.getBrand()!=null){
                    e.get().setBrand(costume.getBrand());
                }
                if(costume.getYear()!=null){
                    e.get().setYear(costume.getYear());
                }
                if(costume.getDescription()!=null){
                    e.get().setDescription(costume.getDescription());
                }
                if(costume.getCategory()!=null){
                    e.get().setCategory(costume.getCategory());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return costume;
            }
        }else{
            return costume;
        }
    }

    public boolean deleteOrtesis(int costumeId) {
        Boolean aBoolean= getCostume(costumeId) .map(costume -> {
            metodosCrud.delete(costume);
            return true;
        }).orElse (false);
        return aBoolean;
    }
    
}

