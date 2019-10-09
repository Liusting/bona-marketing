package com.example.demo.controller;

import com.example.demo.mapper.SpAddressMapper;
import com.example.demo.po.SpAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
@RequestMapping("/spAddress")
public class SpAddressController {
    @Autowired
    private SpAddressMapper spAddressMapper;


//根据用户的id查询收货地址信息
    @RequestMapping(value = {"/getAddressList"} ,method = { RequestMethod.POST })
    @ResponseBody
    public Object getAddressList(HttpServletRequest request){
        String userId = request.getParameter("userId");
        List<SpAddress> addressList = spAddressMapper.getAddressList(userId);
        List<Map<String, Object>> list = new ArrayList<>();
        for(int i = 0 ;i < addressList.size(); i++){
            Map map = new HashMap<>();
            map.put("id",addressList.get(i).getId());
            map.put("addresseeName",addressList.get(i).getAddresseeName());
            map.put("phoneNumber",addressList.get(i).getPhoneNumber());
            map.put("address",addressList.get(i).getAddress());
            list.add(map);
            System.out.println();
        }
        return list;
    }
//根据id删除收货地址信息
    @RequestMapping(value = {"/deleteAddress"} , method = { RequestMethod.POST })
    @ResponseBody
    public Object deleteAddress(HttpServletRequest request){
        String id = request.getParameter("id");
        if(id == null){
            Map map = new HashMap();
            map.put("code","0");
            return map;
        }else {
            try {
                spAddressMapper.addressDelete(id);
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
//新增收货地址
    @RequestMapping(value = {"/insertAddress"} , method = {RequestMethod.POST})
    @ResponseBody
    public Object addressInsert(HttpServletRequest request){
        SpAddress spAddress  = new SpAddress();
       if(request.getParameter("userId") == null){
           Map map = new HashMap();
           map.put("code",0);
           return map;
       }else{
           try {
               String uuid = UUID.randomUUID().toString();
               String id =  uuid.replaceAll("-", "");//去掉"-",降低数据库的存储空间
               String addresseeName = request.getParameter("addresseeName");
               String phoneNumber = request.getParameter("phoneNumber");
               String address = request.getParameter("address");
               String userId = request.getParameter("userId");
               spAddress.setId(id);
               spAddress.setAddresseeName(addresseeName);
               spAddress.setPhoneNumber(phoneNumber);
               spAddress.setAddress(address);
               spAddress.setUserId(userId);
               spAddressMapper.addressInsert(spAddress);
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