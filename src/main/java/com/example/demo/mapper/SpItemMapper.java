package com.example.demo.mapper;

import com.baomidou.mybatisplus.plugins.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface SpItemMapper {

    List<Map<String,Object>> getSpItem(Page page,@Param("type1") String type1,@Param("type2") String type2,@Param("type3") String type3);

    List<Map<String,Object>>  getGoodsDetail(@Param("itemId") String itemId);


}
