package com.example.demo.mapper;

import com.baomidou.mybatisplus.plugins.Page;
import com.example.demo.po.SpItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface SpItemMapper {
    List<SpItem> getSpItem(@Param("name") String name);

    List<SpItem> getSpItem(Page page, @Param("name") String name);

    List<Map<String,Object>>  getGoodsDetail(@Param("itemId") String itemId);


}
