package com.money_tracking_app.Backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class Controller {

    @Autowired
    Service service;

    @GetMapping("/transactionsDetails")
    public ResponseEntity<Map<String,Object>> getDetails()
    {
        Map<String,Object> response = new HashMap<>();
        List<Model> list = service.getDetails();
        int currentBalance = service.getCurrentBalance();
        response.put("transaction", list);
        response.put("balance", currentBalance);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/addTransaction")
    public ResponseEntity<Map<String, Object>> addTransaction(@RequestBody Model model)
    {
        Map<String,Object> response = new HashMap<>();
        Model m = service.addTransaction(model);
        int currentBalance = service.getCurrentBalance();
        response.put("transaction", m);
        response.put("balance", currentBalance);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @DeleteMapping("/deleteTransaction/{no}")
    public Map<String, Object> deleteByRollNo(@PathVariable int no) {
        boolean b = service.deleteByKey(no);
        Map<String, Object> response = new HashMap<>();
        if (b) {

            List<Model> list = service.getDetails();
            int currentBalance = service.getCurrentBalance();
            response.put("transaction", list);
            response.put("balance", currentBalance);

        }
        else return new HashMap<>();
        return response;


    }


}
