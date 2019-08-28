package com.example.demo.mapper;

import com.example.demo.po.SpItemType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SpItemTypeMapper {
    List<SpItemType> getSpTypeToType(@Param("type") int type);
}
