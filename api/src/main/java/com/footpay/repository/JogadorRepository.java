package com.footpay.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.footpay.model.Jogador;

@Repository
public interface JogadorRepository extends JpaRepository<Jogador, Long> {
    List<Jogador> findByNomeContainingIgnoreCase(String nome);

    List<Jogador> findByTimeContainingIgnoreCase(String time);

    List<Jogador> findByNomeContainingIgnoreCaseAndTimeContainingIgnoreCase(String nome, String time);
}