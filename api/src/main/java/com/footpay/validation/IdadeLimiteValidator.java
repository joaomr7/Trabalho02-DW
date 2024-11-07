package com.footpay.validation;

import java.time.LocalDate;
import java.time.Period;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class IdadeLimiteValidator implements ConstraintValidator<IdadeLimite, LocalDate> {

    private int idadeMinima;

    @Override
    public void initialize(IdadeLimite constraintAnnotation) {
        idadeMinima = constraintAnnotation.idadeMinima();
    }

    @Override
    public boolean isValid(LocalDate dataNascimento, ConstraintValidatorContext context) {
        if (dataNascimento == null)
            return false;

        LocalDate dataAtual = LocalDate.now();
        int idade = Period.between(dataNascimento, dataAtual).getYears();

        return idade >= idadeMinima;
    }
        
}
