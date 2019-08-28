package com.example.demo.controller;

import com.example.demo.mapper.SpOrderMapper;
import com.example.demo.po.SpOrder;
import javafx.beans.binding.ObjectExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/spOrder")
public class SpOrderController {

    @Autowired
    private SpOrderMapper spOrderMapper;

//    获取未付款、待发货、已收货、待评价订单列表
    @RequestMapping(value = {"/getOrderList"},method = {RequestMethod.POST})
    @ResponseBody
    public Object getOrderList(HttpServletRequest request){
        String pay_status = request.getParameter("pay_status");
        String trade_status = request.getParameter("trade_status");
        List<Map<String, Object>> orderList = spOrderMapper.getOrderList(pay_status,trade_status);
        Map<String,Object> map = new HashMap<>();
        map.put("orderList",orderList);
        return map;
    }

    //取消订单
    @RequestMapping(value = {"/canCelList"},method = {RequestMethod.POST})
    @ResponseBody
    public Object canCelList(HttpServletRequest request){
        String id = request.getParameter("id");
        spOrderMapper.cancelPay(id);
        Map<String,Object> map = new HashMap<>();
        map.put("code",1);
        return map;
    }
//    用户点击确认收货
    @RequestMapping(value = {"/confirmReceive"},method = {RequestMethod.POST})
    @ResponseBody
    public Object confirmGet(HttpServletRequest request){
        String id = request.getParameter("id");
        String trade_status = request.getParameter("trade_status");
        spOrderMapper.confirmReceive(id,trade_status);
        Map<String,Object> map  = new HashMap<>();
        map.put("code",1);
        return map;
    }
}
