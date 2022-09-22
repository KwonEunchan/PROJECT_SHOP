package com.example.project_shop.db;

import java.sql.*;

public class Datebase {
    public static Connection getDB(){
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            String URL = "jdbc:oracle:thin:@localhost:1521:XE";
            Connection conn = DriverManager.getConnection(URL,"hr","hr");
            return  conn;
        } catch (Exception e) {
            return null;
        }
    }

    public static int getNewUserCode(){
        Connection conn = Datebase.getDB();
        String SQL = "SELECT CODE FROM SHOP_USER";
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        int newCode = 0;
        try {
            pstmt = conn.prepareStatement(SQL);
            rs = pstmt.executeQuery();
            while (rs.next()){
                newCode++;
            }
            return newCode+1;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }finally {
            try {
                conn.close();
                pstmt.close();
                rs.close();

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }
}
