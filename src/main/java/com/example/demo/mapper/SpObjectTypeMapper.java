package com.example.demo.mapper;

import com.example.demo.po.SpObjectType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SpObjectTypeMapper {
    List<SpObjectType> getSpObjectType(@Param("itemId") String itemId);
}
