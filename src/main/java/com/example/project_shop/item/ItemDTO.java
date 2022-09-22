package com.example.project_shop.item;

public class ItemDTO {
    private int code;
    private String name;
    private String sub;
    private int price;
    private int quantity;

    public ItemDTO(){}
    public ItemDTO(int code, String name, String sub, int price, int quantity) {
        this.code = code;
        this.name = name;
        this.sub = sub;
        this.price = price;
        this.quantity = quantity;
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

    public String getSub() {
        return sub;
    }

    public void setSub(String sub) {
        this.sub = sub;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}

