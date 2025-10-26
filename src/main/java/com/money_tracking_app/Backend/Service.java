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
    public int getCurrentBalance()
    {
        int currentBalance = 0;

             List<Model> list = repo.findAll();
            for(Model m : list)
            {
                if("credited".equalsIgnoreCase(m.getType())) currentBalance += m.getAmount();
                else currentBalance -= m.getAmount();
            }
           // if(currentBalance<=0) repo.deleteAll();
            return Math.max(currentBalance, 0);

    }

}
