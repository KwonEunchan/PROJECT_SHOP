package com.example.project_shop.item;

import com.example.project_shop.db.Datebase;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ItemDAO {
    public static String getItems(String sub) {
        Connection conn = Datebase.getDB();
        String SQL = "SELECT * FROM SHOP_ITEM WHERE SUB = ?";
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            pstmt = conn.prepareStatement(SQL);
            pstmt.setString(1, sub);
            rs = pstmt.executeQuery();
            StringBuilder info = new StringBuilder();
            info.append("[\n");

            while (rs.next()) {
                StringBuilder sb = new StringBuilder();
                sb.append("{\n");
                sb.append("\"code\" : \"" + rs.getInt("CODE") + "\",\n");
                sb.append("\"name\" : \"" + rs.getString("NAME") + "\",\n");
                sb.append("\"price\" : \"" + rs.getInt("PRICE") + "\",\n");
                sb.append("\"quantity\" : \"" + rs.getString("QUANTITY") + "\",\n");
                sb.append("\"img\" : \"" + rs.getString("IMG") + "\"\n");
                sb.append("}");
                info.append(sb.toString());
                info.append(",\n");
            }

            String result = info.substring(0,info.length()-2) + "\n]";
            if(result.charAt(0)=='[' && result.charAt(result.length()-1)==']'){
                return result;
            }
            else{
                return "[]";
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
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
