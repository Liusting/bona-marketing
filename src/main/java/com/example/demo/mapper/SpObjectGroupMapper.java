package com.example.demo.mapper;

import com.example.demo.po.SpObjectGroup;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface SpObjectGroupMapper {
    List<Map<String,Object>> getSpObjectGroupIsFirst(@Param("objectId") String objectId);

    List<Map<String,Object>> getSpObjectGroupIsNotFirst(@Param("objectId") String objectId);
}
