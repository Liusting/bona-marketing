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
import java.util.UUID;

@Controller
@RequestMapping("/spOrder")
public class SpOrderController {

    @Autowired
    private SpOrderMapper spOrderMapper;

//    获取全部、未付款、待发货、已收货、待评价订单列表
    @RequestMapping(value = {"/getOrderList"},method = {RequestMethod.POST})
    @ResponseBody
    public Object getOrderList(HttpServletRequest request){
        String trade_status = request.getParameter("trade_status");
        String type1 = null;
        String type2 = null;
        if(trade_status.equals("0")){
            type1 = "0";
            type2 = null;
        }else{
            type1 = null;
            type2 = "0";
        }
        List<Map<String, Object>> orderList = spOrderMapper.getOrderList(type1,type2,trade_status);
        Map<String,Object> map = new HashMap<>();
        map.put("orderList",orderList);
        return map;
    }

    //新增订单
    @RequestMapping(value = {"/addOrder"},method = {RequestMethod.POST})
    @ResponseBody
    public Object addOrder(HttpServletRequest request){
        SpOrder spOrder = new SpOrder();
        String uuid = UUID.randomUUID().toString();
        String id = uuid.replaceAll("-", "");
        String itemId  = request.getParameter("item_id");
        String typeId = request.getParameter("type_id");
        String userId = request.getParameter("user_id");
        String tradeStatus = request.getParameter("trade_status");
        String payStatus = request.getParameter("pay_status");
        String money = request.getParameter("money");
        String number = request.getParameter("number");
        String totalPrice = request.getParameter("total_price");
        String remark = request.getParameter("remark");
        spOrder.setId(id);
        spOrder.setItemId(itemId);
        spOrder.setTypeId(typeId);
        spOrder.setUserId(userId);
        spOrder.setTradeStatus(tradeStatus);
        spOrder.setPayStatus(payStatus);
        spOrder.setMoney(Double.parseDouble(money));
        spOrder.setNumber(Integer.parseInt(number));
        spOrder.setTotalPrice(Double.parseDouble(totalPrice));
        spOrder.setRemark(remark);
        spOrderMapper.addOrder(spOrder);
        Map map = new HashMap();
        map.put("code",1);
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


//    评价
    @RequestMapping(value = {"/getAppraise"},method = {RequestMethod.POST})
    @ResponseBody
    public Object appraiseItem(HttpServletRequest request){
        String desc_star = request.getParameter("desc_star");
        String service_star = request.getParameter("service_star");
        String manner_star = request.getParameter("manner_star");
        String id = request.getParameter("id");
        spOrderMapper.updateStar(id,desc_star,service_star,manner_star);
        Map<String,Object> map  = new HashMap<>();
        map.put("code",1);
        return map;
    }
}
