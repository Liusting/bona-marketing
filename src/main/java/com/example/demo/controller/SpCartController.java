package com.example.demo.controller;

import com.example.demo.mapper.SpCartMapper;
import com.example.demo.po.SpCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
@RequestMapping("/spCart")
public class SpCartController {
    @Autowired
    private SpCartMapper spCartMapper;

    /**购物车详情*/
    @RequestMapping(value = { "/getCartDetail" } , method = { RequestMethod.POST} )
    @ResponseBody
    public Object CartObject(){
        List<Map<String,Object>> ShopList = spCartMapper.getCartDetail();//店铺列表
        List<Map<String,Object>> ItemList = spCartMapper.getCartItemList();//商品列表'
        List<Map<String,Object>> resList = new ArrayList<>();//存放所有数据
        for(int i = 0;i < ShopList.size();i++){
            List<Map<String,Object>> resList2 = new ArrayList<>();
            Map<String,Object> resMap = new HashMap<>();//存放店铺数据
            resMap.put("check",false);
            resMap.put("shopId",ShopList.get(i).get("shop_id"));
            resMap.put("shopName",ShopList.get(i).get("shopName"));
            for(int j = 0;j < ItemList.size(); j++){
                if(ShopList.get(i).get("shop_id").equals(ItemList.get(j).get("shop_id"))){
                    Map<String,Object> resMap2 = new HashMap<>();//每次循环都创建新的resMap
                    resMap2.put("id",ItemList.get(j).get("id"));
                    resMap2.put("type_id",ItemList.get(j).get("type_id"));
                    resMap2.put("name",ItemList.get(j).get("name"));
                    resMap2.put("item_id",ItemList.get(j).get("item_id"));
                    resMap2.put("number",ItemList.get(j).get("number"));
                    resMap2.put("money",ItemList.get(j).get("money"));
                    resMap2.put("user_id",ItemList.get(j).get("user_id"));
                    resMap2.put("check",false);
                    resList2.add(resMap2);
                }
            }
            resMap.put("itemdata",resList2);
            resList.add(resMap);
        }
        return resList;
    }
//    /**加入购物车*/
    @RequestMapping(value = {"/insertCart"} , method = {RequestMethod.POST})
    @ResponseBody
    public Object insertCart(HttpServletRequest request){
        SpCart spCart = new SpCart();
        String uuid = UUID.randomUUID().toString();
        String id =  uuid.replaceAll("-", "");//去掉"-",降低数据库的存储空间
        String itemId = request.getParameter("itemId");
        String typeId = request.getParameter("typeId");
        String userId = request.getParameter("userId");
        String number = request.getParameter("number");
        spCart.setId(id);
        spCart.setItemId(itemId);
        spCart.setTypeId(typeId);
        spCart.setUserId(userId);
        spCart.setNumber(Integer.parseInt(number));
        spCartMapper.insertCart(spCart);
        Map map = new HashMap();
        map.put("code",1);
        return  map;

    }
    /**购物车的数量修改*/
    @RequestMapping(value = {"/updateCartNumber"} , method = {RequestMethod.POST})
    @ResponseBody
    public Object updateCart(HttpServletRequest request){
        String CartId = request.getParameter("cartId");
        String CartNumber = request.getParameter("cartNumber");
        if(CartNumber == null && CartId == null){
            Map map = new HashMap();
            map.put("code",0);
            return map;
        }else {
            try {
                int CartNumber1 = Integer.parseInt(CartNumber);
                spCartMapper.updateCartNumber(CartId,CartNumber1);
                Map map = new HashMap();
                map.put("code",1);
                return map;
            }catch (Exception e){
                Map map = new HashMap();
                map.put("失败",e.getMessage());
                return map;
            }
        }
    }
    /**购物车删除商品*/
    @RequestMapping(value = {"/deleteCart"} , method = {RequestMethod.POST})
    @ResponseBody
    public Object deleteCart(HttpServletRequest request){
        String ItemId = request.getParameter("itemId");
        if(ItemId == null){
            Map map = new HashMap();
            map.put("code",0);
            return map;
        }else{
            try {
                spCartMapper.deleteCart(ItemId);
                Map map = new HashMap();
                map.put("code",1);
                return map;
            }catch (Exception e){
                Map map = new HashMap();
                map.put("失败",e.getMessage());
                return map;
            }
        }
    }

}
