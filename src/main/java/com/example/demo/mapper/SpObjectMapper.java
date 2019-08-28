package com.example.demo.mapper;

import com.example.demo.po.SpObject;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface    SpObjectMapper {
    List<SpObject> getSpObject(@Param("itemId") String itemId);

    List<SpObject> getSpObjectToStart(@Param("itemId") String itemId);

    List<Map<String,Object>> getSpObjectAndType(@Param("itemId") String itemId);
}
