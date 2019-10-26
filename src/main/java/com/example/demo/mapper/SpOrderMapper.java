package com.example.demo.mapper;
import com.example.demo.po.SpOrder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface SpOrderMapper {
    void addOrder(@Param("spOrder") SpOrder spOrder);

    void cancelPay(@Param("id") String id);

    void confirmReceive(@Param("id") String id,@Param("trade_status") String trade_status);

    void updateStar(@Param("id") String id,@Param("desc_star") String desc_star,@Param("service_star") String service_star,@Param("manner_star") String manner_star);

    List<Map<String, Object>> getOrderList(@Param("type1") String type1, @Param("type2") String type2,@Param("trade_status") String trade_status);
}
