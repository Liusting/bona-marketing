package com.example.demo.controller;

import com.example.demo.mapper.SpObjectGroupMapper;
import com.example.demo.mapper.SpObjectMapper;
import com.example.demo.po.SpObject;
import com.example.demo.po.SpObjectGroup;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/spObjectGroup")
public class SpObjectGroupController {
    @Autowired
    private SpObjectGroupMapper spObjectGroupMapper;

    @Autowired
    private SpObjectMapper spObjectMapper;

    @RequestMapping(value = { "/spObjectGroup" }, method = { RequestMethod.POST })
    @ResponseBody
    public Object getSpItem(HttpServletRequest request){
        List<Map<String,Object>> firstList = spObjectGroupMapper.getSpObjectGroupIsFirst("9");
        List<Map<String,Object>> notFirstList = spObjectGroupMapper.getSpObjectGroupIsNotFirst("9");
        List<Map<String,Object>> objAndTypeList = spObjectMapper.getSpObjectAndType("1");


        List<Map<String,Object>> list = new ArrayList<>();
        for(int i=0;i<firstList.size();i++){
            Map<String,Object> map = new HashMap<>();
            map.put("name",firstList.get(i).get("name"));
            List<String> groupNameList = new ArrayList<>();
            for(int j=0;j<notFirstList.size();j++){
                if(firstList.get(i).get("id").equals(notFirstList.get(j).get("upperId"))){
                    groupNameList.add(notFirstList.get(j).get("name").toString());
                }
            }
            map.put("list",groupNameList);
            list.add(map);
        }

        String objIdLet = "9";

        for(int i=0;i<objAndTypeList.size();i++) {
            for (int j = 0; j < objAndTypeList.size(); j++) {
                if (objAndTypeList.get(j).get("id").equals(objIdLet)) {
                    objIdLet = objAndTypeList.get(j).get("upperId").toString();
                    Map<String,Object> map = new HashMap<>();
                    map.put("name",objAndTypeList.get(j).get("typeName"));
                    List<String> objNameList = new ArrayList<>();
                    objNameList.add(objAndTypeList.get(j).get("name").toString());
                    map.put("list",objNameList);
                    list.add(map);
                }
            }
        }
        return list;
    }
}
