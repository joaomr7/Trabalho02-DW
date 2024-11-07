package com.footpay.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.footpay.model.Pagamento;

@Repository
public interface PagamentoReposiory extends JpaRepository<Pagamento, Long>{    
    List<Pagamento> findByJogador_NomeContainingIgnoreCase(String nomeJogador);

    List<Pagamento> findByData(LocalDate data);

    List<Pagamento> findByJogador_NomeContainingIgnoreCaseAndData(String nomeJogador, LocalDate dataPagamento);

    @Query("SELECT SUM(p.valor) FROM Pagamento p")
    float sumValor();
}
