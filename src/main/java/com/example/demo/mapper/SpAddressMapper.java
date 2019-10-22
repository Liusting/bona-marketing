package com.example.demo.mapper;





import com.example.demo.po.SpAddress;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SpAddressMapper {
    List<SpAddress> getAddressList(@Param("userId") String userId);//根据用户的id查询所有地址信息
    void addressDelete(@Param("id") String id);//根据回传的id值删除收货地址
    void addressInsert(@Param("spAddress") SpAddress spAddress);//插入信息

    void updateInsert(@Param("spAddress") SpAddress spAddress);
}
