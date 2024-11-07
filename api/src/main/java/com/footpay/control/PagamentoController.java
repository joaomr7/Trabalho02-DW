package com.footpay.control;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.annotation.JsonView;
import com.footpay.model.Jogador;
import com.footpay.model.Pagamento;
import com.footpay.repository.JogadorRepository;
import com.footpay.repository.PagamentoReposiory;
import com.footpay.view.View;

import jakarta.validation.Valid;

@RequestMapping(value = "pagamento/")
@RestController
public class PagamentoController {
    private PagamentoReposiory rep;
    private JogadorRepository jRep;

    public PagamentoController(PagamentoReposiory rep, JogadorRepository jRep) {
        this.rep = rep;
        this.jRep = jRep;
    }

    @GetMapping("/")
    @JsonView(View.PagamentoView.class)
    public ResponseEntity< List<Pagamento> > getAllPagamentos(@RequestParam(required = false) String nomeJogador, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataPagamento) {
        try {
            List<Pagamento> lp = new ArrayList<Pagamento>();

            if (nomeJogador != null && dataPagamento != null)
                rep.findByJogador_NomeContainingIgnoreCaseAndData(nomeJogador, dataPagamento).forEach(lp::add);
            else if (nomeJogador != null)
                rep.findByJogador_NomeContainingIgnoreCase(nomeJogador).forEach(lp::add);
            else if (dataPagamento != null)
                rep.findByData(dataPagamento).forEach(lp::add);
            else
                rep.findAll().forEach(lp::add);

            if (lp.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(lp, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    @JsonView(View.PagamentoView.class)
    public ResponseEntity<Pagamento> getPagamentoById(@PathVariable("id") long id) {
        Optional<Pagamento> data = rep.findById(id);

        if (data.isPresent()) 
            return new ResponseEntity<>(data.get(), HttpStatus.OK);
        else 
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/")
    @JsonView(View.PagamentoView.class)
    public ResponseEntity<Pagamento> createPagamento(@Valid @RequestBody Pagamento ar) {
        try {
            long jogador_id = ar.getJogador().getId();
            Optional<Jogador> data = jRep.findById(jogador_id);

            if (data.isPresent()) {
                Pagamento pagamento = rep.save(new Pagamento(ar.getData(), ar.getValor(), data.get()));
                return new ResponseEntity<>(pagamento, HttpStatus.CREATED);
            } else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @JsonView(View.PagamentoView.class)
    public ResponseEntity<Pagamento> updatePagamento(@PathVariable("id") long id, @Valid @RequestBody Pagamento p) {
        Optional<Pagamento> data = rep.findById(id);

        if (data.isPresent()) {
            Pagamento pagamento = data.get();
            pagamento.setData(p.getData());
            pagamento.setValor(p.getValor());

            try {
                long jogador_id = p.getJogador().getId();
                Optional<Jogador> dataJ = jRep.findById(jogador_id);

                if (dataJ.isPresent()) {
                    pagamento.setJogador(p.getJogador());
                    return new ResponseEntity<>(rep.save(pagamento), HttpStatus.OK);
                } else
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Pagamento> deletePagamento(@PathVariable("id") long id) {
        Optional<Pagamento> data = rep.findById(id);

        if (data.isPresent()) {
            Pagamento pagamento = data.get();
            rep.deleteById(id);
            return new ResponseEntity<>(pagamento, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/")
    public ResponseEntity<List<Pagamento>> deleteAllJogadores() {
        List<Pagamento> lp = new ArrayList<Pagamento>();

        try {
            rep.findAll().forEach(lp::add);
            rep.deleteAll();
            return new ResponseEntity<>(lp, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/total")
    public ResponseEntity<Long> getTotalPayments() {
        try {
            long totalPayments = rep.count();
            return ResponseEntity.ok(totalPayments);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/total_pago")
    public ResponseEntity<Float> getTotalPaymentValue() {
        try {
            return ResponseEntity.ok(rep.sumValor());
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
