package com.example.project_shop.user;

import com.example.project_shop.db.Datebase;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


public class UserDAO {
    static public boolean join(int code,String name, String id, String pw){
        Connection conn = Datebase.getDB();
        PreparedStatement pstmt = null;
        String SQL = "INSERT INTO SHOP_USER VALUES (?,?,?,?,0)";
        try {
            pstmt = conn.prepareStatement(SQL);
            pstmt.setInt(1,code);
            pstmt.setString(2,name);
            pstmt.setString(3,id);
            pstmt.setString(4,pw);
            pstmt.executeUpdate();
            return true;
        } catch (Exception e) {
            return false;
        }finally {
            try {
                conn.close();
                pstmt.close();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    static public String login(String id,String pw){
        Connection conn = Datebase.getDB();
        PreparedStatement pstmt = null;
        String SQL = "SELECT ID FROM SHOP_USER WHERE ID=? AND PW=?";
        ResultSet rs = null;
        try {
            pstmt = conn.prepareStatement(SQL);
            pstmt.setString(1,id);
            pstmt.setString(2,pw);
            rs = pstmt.executeQuery();
            rs.next();
            String loginId = rs.getString("ID");
            return loginId;
        } catch (Exception e) {
            return "";
        }finally {
            try {
                rs.close();
                pstmt.close();
                conn.close();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }
}
