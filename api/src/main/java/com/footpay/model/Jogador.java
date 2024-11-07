package com.footpay.model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;
import com.footpay.validation.IdadeLimite;
import com.footpay.view.View;

@Entity
@Table(name = "jogador")
public class Jogador {
    @Valid

    @Id
    @GeneratedValue()
    @JsonView(View.Base.class)
    private long id;

    @Column(nullable = false, length = 60)
    @NotBlank(message = "nome não pode ser vazio")
    @Size(min = 2, max = 60, message = "nome deve ter entre 2 a 60 caracteres")
    @JsonView(View.Base.class)
    private String nome;

    @Column(nullable = false, length = 60)
    @NotBlank(message = "nome não pode ser vazio")
    @Size(min = 2, max = 30, message = "nome de time deve ter entre 2 a 60 caracteres")
    @JsonView(View.JogadorView.class)
    private String time;

    @Column(nullable = false)
    @IdadeLimite(idadeMinima = 16, message = "o jogador deve ter pelo menos 16 anos")
    @JsonView(View.JogadorView.class)
    private LocalDate datanasc;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "jogador", cascade = CascadeType.ALL)
    private List<Pagamento> pagamentos;

    public Jogador() { }

    public Jogador(long id) {
        this.id = id;
    }

    public Jogador(String nome, String time, LocalDate datanasc) {
        this.nome = nome;
        this.time = time;
        this.datanasc = datanasc;
    }

    public long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getTime() {
        return time;
    }

    public LocalDate getDatanasc() {
        return datanasc;
    }

    public List<Pagamento> getPagamentos() {
        return pagamentos;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setDatanasc(LocalDate datanasc) {
        this.datanasc = datanasc;
    }

    public void setPagamentos(List<Pagamento> pagamentos) {
        this.pagamentos = pagamentos;
    }
}
