package com.example.demo.mapper;

import com.example.demo.po.SpCart;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface SpCartMapper {
//购物车店铺列表
    List<Map<String,Object>> getCartDetail();
//    购物车商品列表
    List<Map<String,Object>> getCartItemList();

//修改购物车商品数量
    void updateCartNumber(@Param("id") String id,@Param("number") int number);
//购物车删除
    void deleteCart(@Param("id") String id);
// 加入购物车
    void insertCart(@Param("spCart") SpCart spCart);


}
