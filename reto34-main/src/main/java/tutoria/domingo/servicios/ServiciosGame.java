/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package tutoria.domingo.servicios;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tutoria.domingo.modelo.Game;
import tutoria.domingo.repositorio.RepositorioGame;

/**
 *
 * @author USUARIO
 */
@Service
public class ServiciosGame {
     @Autowired
    private RepositorioGame metodosCrud;
    
    public List<Game> getAll(){
        return metodosCrud.getAll();
    }
    
    public Optional<Game> getGames(int idGames){
        return metodosCrud.getGames(idGames);
    }
    
    public Game save(Game Games){
        if(Games.getId()==null){
            return metodosCrud.save(Games);
        }else{
            Optional<Game> evt=metodosCrud.getGames(Games.getId());
            if(evt.isEmpty()){
                return metodosCrud.save(Games);
            }else{
                return Games;
            }
        }
    }
    public Game update(Game game){
        if(game.getId()!=null){
            Optional<Game> e=metodosCrud.getGames(game.getId());
            if(!e.isEmpty()){
                if(game.getName()!=null){
                    e.get().setName(game.getName());
                }
                if(game.getDeveloper()!=null){
                    e.get().setDeveloper(game.getDeveloper());
                }
                if(game.getYear()!=null){
                    e.get().setYear(game.getYear());
                }
                if(game.getDescription()!=null){
                    e.get().setDescription(game.getDescription());
                }
                if(game.getCategory()!=null){
                    e.get().setCategory(game.getCategory());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return game;
            }
        }else{
            return game;
        }
    }


    public boolean deleteOrtesis(int gameId) {
        Boolean aBoolean = getGames(gameId).map(game -> {
            metodosCrud.delete(game);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
