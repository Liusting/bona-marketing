package com.example.demo.mapper;

import com.example.demo.po.SpItemTypeGroup;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SpItemTypeGroupMapper {
    /**  **/
    List<SpItemTypeGroup> getSpItemTypeSpecsIsFirst(@Param("typeId") String typeId);

    List<SpItemTypeGroup> getSpItemTypeSpecsIsNotFirst(@Param("typeId") String typeId);
}
