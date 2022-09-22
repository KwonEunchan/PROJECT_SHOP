package com.example.project_shop.user;

import javax.swing.plaf.PanelUI;

public class UserDTO {
    private int code;
    private String name;
    private String id;
    private String pw;
    private int num;

    public UserDTO(){}
    public UserDTO(int code, String name, String id, String pw, int num) {
        this.code = code;
        this.name = name;
        this.id = id;
        this.pw = pw;
        this.num = num;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }
}
