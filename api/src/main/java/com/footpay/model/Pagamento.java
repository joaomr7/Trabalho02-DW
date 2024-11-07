package com.footpay.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonView;
import com.footpay.view.View;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "pagamento")
public class Pagamento {
    @Valid

    @Id
    @GeneratedValue()
    @JsonView(View.PagamentoView.class)
    private long id;

    @Column(nullable = false)
    @JsonView(View.PagamentoView.class)
    private LocalDate data;

    @Column(nullable = false)
    @Positive(message = "o valor deve ser maior que 0")
    @JsonView(View.PagamentoView.class)
    private float valor;

    @ManyToOne()
    @JoinColumn(name = "jogador_id")
    @JsonView(View.PagamentoView.class)
    private Jogador jogador;

    public Pagamento() { }

    public Pagamento(LocalDate data, float valor, Jogador jogador) {
        this.data = data;
        this.valor = valor;
        this.jogador = jogador;
    }

    public long getId() {
        return id;
    }

    public LocalDate getData() {
        return data;
    }

    public float getValor() {
        return valor;
    }
    
    public Jogador getJogador() {
        return jogador;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public void setValor(float valor) {
        this.valor = valor;
    }

    public void setJogador(Jogador jogador) {
        this.jogador = jogador;
    }
}
