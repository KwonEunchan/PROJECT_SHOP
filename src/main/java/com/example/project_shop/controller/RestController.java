package com.example.project_shop.controller;

import com.example.project_shop.db.Datebase;
import com.example.project_shop.item.ItemDAO;
import com.example.project_shop.user.UserDAO;
import com.example.project_shop.user.UserDTO;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.Connection;
import java.sql.ResultSet;

@RequestMapping("/")
@org.springframework.web.bind.annotation.RestController
public class RestController {

    @PostMapping("/join")
    public static boolean join(@RequestBody UserDTO userDTO){
        int code = Datebase.getNewUserCode();
        String name = userDTO.getName();
        String id = userDTO.getId();
        String pw = userDTO.getPw();
        if(UserDAO.join(code,name,id,pw)){
            return true;
        }
        else{
            return false;
        }
    }

    @PostMapping("/login")
    public static String login(@RequestBody UserDTO userDTO){
        String id = userDTO.getId();
        String pw = userDTO.getPw();

        if(!UserDAO.login(id,pw).equals("")){
            return id;
        }
        else{
            return null;
        }
    }

    @GetMapping("/showItems")
    public static String showItems(String sub){
        return ItemDAO.getItems(sub);
    }
}
