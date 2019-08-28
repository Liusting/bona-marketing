package com.example.demo.controller;

import com.example.demo.mapper.SpItemTypeGroupMapper;
import com.example.demo.mapper.SpObjectMapper;
import com.example.demo.po.SpItemTypeGroup;
import com.example.demo.po.SpObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/spItemTypeSpecs")
public class SpItemTypeGroupController {

    @Autowired
    private SpItemTypeGroupMapper spItemTypeGroupMapper;

    @Autowired
    private SpObjectMapper spObjectMapper;

    @RequestMapping(value = { "/spItemTypeSpecs" }, method = { RequestMethod.POST })
    @ResponseBody
    public Object spItemTypeSpecs(){
        String objId = "9";
        List<SpItemTypeGroup> isFirstList = spItemTypeGroupMapper.getSpItemTypeSpecsIsFirst("40");
        List<SpItemTypeGroup> isNotFirstList = spItemTypeGroupMapper.getSpItemTypeSpecsIsNotFirst("40");

        List<Map<String,Object>> list = new ArrayList<>();

        for(int i=0;i<isFirstList.size();i++){
            Map<String,Object> map = new HashMap<>();
            map.put("id",isFirstList.get(i).getId());
            map.put("name",isFirstList.get(i).getName());
            map.put("open",false);
            List<Map<String,Object>> objList = new ArrayList<>();
            for(int j=0;j<isNotFirstList.size();j++){
                if(isNotFirstList.get(j).getUpperId().equals(isFirstList.get(i).getId())){
                    Map<String,Object> objMap = new HashMap<>();
                    objMap.put("id",isNotFirstList.get(j).getId());
                    objMap.put("name",isNotFirstList.get(j).getName());
                    objList.add(objMap);
                }
            }
            map.put("list",objList);
            list.add(map);
        }
        return list;
    }

}
