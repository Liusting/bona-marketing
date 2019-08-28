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

    @RequestMapping(value = { "/getSpItem" }, method = { RequestMethod.POST })
    @ResponseBody
    public Object getSpItem(HttpServletRequest request){
        String name = request.getParameter("name");
        List<SpItem> list = spItemMapper.getSpItem(name);
        return list;
    }

    @RequestMapping(value = { "/getSpItem2" }, method = { RequestMethod.POST })
    @ResponseBody
    public Object listDel(HttpServletRequest request) {
        String currentInt=request.getParameter("currentInt");
//        String name=request.getParameter("name");
        /*每次熟悉只拿十条数据*/
        Page page = new Page(Integer.parseInt(currentInt), 10);
        List<SpItem> spItemList = spItemMapper.getSpItem(page,null);

        List<Map<String,Object>> list = new ArrayList<>();

        for(int i=0;i<spItemList.size();i++){
            Map<String,Object> map = new HashMap<>();
            map.put("name",spItemList.get(i).getName());
            map.put("money",spItemList.get(i).getMoney());
            map.put("goodsId",spItemList.get(i).getId());
            map.put("place",spItemList.get(i).getPlace());
            map.put("shopName",spItemList.get(i).getShopName());
            map.put("total",spItemList.get(i).getTotal());
            list.add(map);
            System.out.println();
        }
        return list;
    }

}
