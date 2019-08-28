package com.example.demo.controller;

import com.example.demo.mapper.SpItemTypeMapper;
import com.example.demo.po.SpItemType;
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
@RequestMapping("/spItemType")
public class SpItemTypeController {

    @Autowired
    private SpItemTypeMapper spItemTypeMapper;

    @RequestMapping(value = { "/getSpItemType" }, method = { RequestMethod.POST })
    @ResponseBody
    public Object getSpTpye(){
        List<SpItemType> listType1 = spItemTypeMapper.getSpTypeToType(1);
        List<SpItemType> listType2 = spItemTypeMapper.getSpTypeToType(2);
        List<SpItemType> listType3 = spItemTypeMapper.getSpTypeToType(3);
        List<Map<String,Object>> list = new ArrayList<>();

        /** type2list是存类型2关联类型3的数据 **/
        List<Map<String,Object>> type2list = new ArrayList<>();

        /** 先循环处理类型2关联类型3的数据 **/
        for(int i=0;i<listType2.size();i++){
            Map<String, Object> map1 = new HashMap<String, Object>();
            map1.put("name",listType2.get(i).getName());
            map1.put("upperId",listType2.get(i).getUpperId());
            List<Map<String,Object>> maplist = new ArrayList<>();
            for(int j=0;j<listType3.size();j++){
//                if(listType2`.get(i).getId().equals(listType3.get(j).getUpperId())){
                if(true){
                    Map<String, Object> map2 = new HashMap<String, Object>();
                    map2.put("name",listType3.get(j).getName());
                    maplist.add(map2);
                }
            }
            map1.put("listType3",maplist);
            type2list.add(map1);
        }

        /** 最后循环处理类型1关联类型2的数据 **/
        for(int i=0;i<listType1.size();i++){
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("name",listType1.get(i).getName());
            List maplist = new ArrayList<>();
            for(int j=0;j<type2list.size();j++){
                if(listType1.get(i).getId().equals(type2list.get(j).get("upperId"))){
                    maplist.add(type2list.get(j));
                }
            }
            map.put("listType2",maplist);
            list.add(map);
        }
        return list;
    }

}
