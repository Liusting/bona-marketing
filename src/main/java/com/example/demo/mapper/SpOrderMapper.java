package com.example.demo.mapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface SpOrderMapper {
    List<Map<String,Object>> getOrderList(@Param("pay_status") String pay_status,@Param("trade_status") String trade_status);
    void cancelPay(@Param("id") String id);

    void confirmReceive(@Param("id") String id,@Param("trade_status") String trade_status);
//    List<Map<String,Object>> getSendList();
}
