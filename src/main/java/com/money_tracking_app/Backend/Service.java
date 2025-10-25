package com.money_tracking_app.Backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@org.springframework.stereotype.Service
public class Service {
    @Autowired
    Repo repo;
    public List<Model> getDetails() {
        return repo.findAll();
    }

    public Model addTransaction(Model model) {

        Model previousModel =repo.findTopByOrderBySerialNoDesc();
        int previousBalance = previousModel!=null ? previousModel.getBalance() : 0;
        int newBalance;
        if ("credited".equalsIgnoreCase(model.getType())) {
            newBalance = previousBalance + model.getAmount();
        } else if ("debited".equalsIgnoreCase(model.getType())) {
            newBalance = previousBalance - model.getAmount();
        } else {
            throw new IllegalArgumentException("Invalid transaction type");
        }

        System.out.println(newBalance);
        System.out.println(previousBalance);
        model.setBalance(newBalance);
        return repo.save(model);
    }

    public boolean deleteByKey(int no) {
        Model  m = repo.findById(no).orElse(null);
        if(m!=null)
        {
            repo.deleteById(no);
            return true;
        }

        return false;
    }
}
