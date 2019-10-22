package com.example.demo.mapper;

import com.example.demo.po.SpUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface SpUserMapper {
    List<Map<String,Object>> getUserMessage(@Param("id") String id);
    void updateUserMessage(@Param("spUser") SpUser spUser);
}
