package com.money_tracking_app.Backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class Controller {

    @Autowired
    Service service;

    @GetMapping("/transactionsDetails")
    public ResponseEntity<List<Model>> getDetails()
    {
        return new ResponseEntity<>(service.getDetails(), HttpStatus.OK);
    }

    @PostMapping("/addTransaction")
    public ResponseEntity<Model> addTransaction(@RequestBody Model model)
    {
        return ResponseEntity.ok(service.addTransaction(model));
    }

    @DeleteMapping("/deleteTransaction/{key}")
    public ResponseEntity<String> deleteByRollNo(@PathVariable int no)
    {
        boolean b =service.deleteByKey(no);
        return b ? ResponseEntity.ok("deleted successfully!") : ResponseEntity.status(HttpStatus.NOT_FOUND).body("student not found !");
    }


}
