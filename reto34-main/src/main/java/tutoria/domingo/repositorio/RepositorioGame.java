/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package tutoria.domingo.repositorio;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import tutoria.domingo.interfaces.InterfaceGame;
import tutoria.domingo.modelo.Mensaje;
import tutoria.domingo.modelo.Game;

/**
 *
 * @author USUARIO
 */
@Repository
public class RepositorioGame {
     @Autowired
    private InterfaceGame crud;
    

    public List<Game> getAll(){
        return (List<Game>) crud.findAll();       
    }
    
    public Optional <Game> getGames(int id){
        return crud.findById(id);
    }
    
    public Game save(Game game){
        return crud.save(game);
    }
      public void delete(Game game){
        crud.delete(game);
    }
    
    
}
