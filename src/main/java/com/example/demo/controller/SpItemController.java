package com.example.demo.controller;

import com.example.demo.mapper.SpItemMapper;
import com.example.demo.po.SpItem;
import org.springframework.beans.factory.annotation.Autowired;
import com.baomidou.mybatisplus.plugins.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/spItem")
public class SpItemController {

    @Autowired
    private SpItemMapper spItemMapper;

//    @RequestMapping(value = { "/getSpItem" }, method = { RequestMethod.POST })
//    @ResponseBody
//    public Object getSpItem(HttpServletRequest request){
//        String name = request.getParameter("name");
//        List<SpItem> list = spItemMapper.getSpItem(name);
//        return list;
//    }

    @RequestMapping(value = { "/getSpItem2" }, method = { RequestMethod.POST })
    @ResponseBody
    public Object listDel(HttpServletRequest request) {
        String currentInt=request.getParameter("currentInt");
        String  tabcur = request.getParameter("tabcur");
        System.out.println(currentInt);
        String type1 = null;
        String type2 = null;
        String type3 = null;
        if(tabcur.equals("0")){
            type1 = "0";
            type2 = null;
            type3 = null;
        }else if(tabcur.equals("1")){
            type1 = null;
            type2 = "1";
            type3 = null;
        }else if(tabcur.equals("2")){
            type1 = null;
            type2 = null;
            type3 = "2";
        }
        /*每次熟悉只拿十条数据*/
        Page page = new Page(Integer.parseInt(currentInt), 10);
        List<Map<String, Object>> spItemList = spItemMapper.getSpItem(page,type1,type2,type3);

        List<Map<String,Object>> list = new ArrayList<>();


        return spItemList;
    }

}
