package com.footpay.control;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.annotation.JsonView;
import com.footpay.model.Jogador;
import com.footpay.repository.JogadorRepository;
import com.footpay.view.View;

import jakarta.validation.Valid;

@RequestMapping(value = "jogador/")
@RestController
public class JogadorController {
    @Autowired
    JogadorRepository rep;

    @GetMapping("/")
    @JsonView(View.JogadorView.class)
    public ResponseEntity<List<Jogador>> getAllJogadores(@RequestParam(required = false) String nome, @RequestParam(required = false) String time) {
        try {
            List<Jogador> lj = new ArrayList<Jogador>();

            if (nome != null && time != null) 
                rep.findByNomeContainingIgnoreCaseAndTimeContainingIgnoreCase(nome, time).forEach(lj::add);
            else if (nome != null) 
                    rep.findByNomeContainingIgnoreCase(nome).forEach(lj::add);
            else if (time != null)
                rep.findByTimeContainingIgnoreCase(time).forEach(lj::add);
            else
                rep.findAll().forEach(lj::add);

            if(lj.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            else
                return new ResponseEntity<List<Jogador>>(lj, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    @JsonView(View.JogadorView.class)
    public ResponseEntity<Jogador> getJogadorById(@PathVariable("id") long id) {
        Optional<Jogador> data = rep.findById(id);

        if (data.isPresent())
            return new ResponseEntity<>(data.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/")
    @JsonView(View.JogadorView.class)
    public ResponseEntity<Jogador> createJogador(@Valid @RequestBody Jogador j) {
        try {
            Jogador jogador = rep.save(new Jogador(j.getNome(), j.getTime(), j.getDatanasc()));
            return new ResponseEntity<Jogador>(jogador, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @JsonView(View.JogadorView.class)
    public ResponseEntity<Jogador> updateJogador(@PathVariable("id") long id, @Valid @RequestBody Jogador j) {
        Optional<Jogador> data = rep.findById(id);

        if (data.isPresent()) {
            Jogador jogador = data.get();
            jogador.setNome(j.getNome());
            jogador.setTime(j.getTime());
            jogador.setDatanasc(j.getDatanasc());

            return new ResponseEntity<>(rep.save(jogador), HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Jogador> deleteJogador(@PathVariable("id") long id) {
        Optional<Jogador> data = rep.findById(id);

        if (data.isPresent()) {
            Jogador jogador = data.get();
            rep.deleteById(id);
            return new ResponseEntity<>(jogador, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/")
    public ResponseEntity<List<Jogador>> deleteAllJogadores() {
        List<Jogador> lj = new ArrayList<Jogador>();

        try {
            rep.findAll().forEach(lj::add);
            rep.deleteAll();
            return new ResponseEntity<>(lj, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/total")
    public ResponseEntity<Long> getTotalPlayers() {
        try {
            long totalPlayers = rep.count();
            return ResponseEntity.ok(totalPlayers);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    };
}
