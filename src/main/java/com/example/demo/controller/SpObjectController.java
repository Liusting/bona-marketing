package com.example.demo.controller;

import com.example.demo.mapper.SpItemMapper;
import com.example.demo.mapper.SpObjectMapper;
import com.example.demo.mapper.SpObjectTypeMapper;
import com.example.demo.po.SpItem;
import com.example.demo.po.SpObject;
import com.example.demo.po.SpObjectType;
import org.json.JSONArray;
import org.json.JSONObject;
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
@RequestMapping("/spObject")
public class SpObjectController {
    @Autowired
    private SpObjectMapper spObjectMapper;

    @Autowired
    private SpObjectTypeMapper spObjectTypeMapper;

    @Autowired
    private SpItemMapper spItemMapper;

    @RequestMapping(value = { "/getSpObject" }, method = { RequestMethod.POST })
    @ResponseBody
    public Object getSpObject( HttpServletRequest request){
        String itemId = request.getParameter("itemId");

        List<SpObject> spObjectList = spObjectMapper.getSpObject(itemId);
        List<SpObjectType> spObjectTypeList = spObjectTypeMapper.getSpObjectType(itemId);
        List<SpObject> getSpObjectToStartList = spObjectMapper.getSpObjectToStart(itemId);

        //商品详情页的发货地，简介
        List<Map<String,Object>> getGoodsDetail = spItemMapper.getGoodsDetail(itemId);

        Map<String,Object> typeMap = new HashMap<>();
        for(int i = 0;i<spObjectTypeList.size();i++){
            typeMap.put(spObjectTypeList.get(i).getId(),spObjectTypeList.get(i).getName());
        }

        Map map = new HashMap();
        map.put("typeMap",typeMap);
        map.put("spObjectList",spObjectList);
        map.put("getGoodsDetail",getGoodsDetail);
        map.put("spObjectTypeList",spObjectTypeList);
        map.put("getSpObjectToStartList",getSpObjectToStartList);

//        for(int i=0;i<spObjectTypeList.size();i++){
//            Map<String,Object> map = new HashMap<>();
//            map.put("name",spObjectTypeList.get(i).getName());
//            map.put("id",spObjectTypeList.get(i).getId());
//            map.put("upperId",spObjectTypeList.get(i).getUpperId());
//
//            List<Map<String,Object>> mapList = new ArrayList<>();
//            for(int j=0;j<spObjectList.size();j++){
//                if(spObjectTypeList.get(i).getId().equals(spObjectList.get(j).getTypeId())){
//                    Map<String,Object> objectMap = new HashMap<>();
//                    objectMap.put("name",spObjectList.get(j).getName());
//                    objectMap.put("id",spObjectList.get(j).getId());
//                    objectMap.put("itemId",spObjectList.get(j).getItemId());
//                    objectMap.put("typeId",spObjectList.get(j).getTypeId());
//                    objectMap.put("upperId",spObjectList.get(j).getUpperId());
//                    objectMap.put("ifClick",true);
//                    objectMap.put("select",false);
//                    objectMap.put("imgUrl","https://ossweb-img.qq.com/images/lol/web201310/skin/big10004.jpg");
//                    mapList.add(objectMap);
//                }
//            }
//            map.put("list",mapList);
//            list.add(map);
//        }
//
//        List<Map<String,Object>> spTypeList = new ArrayList<>();
//        for(int i = 0;i<spObjectTypeList.size();i++){
//            Map<String,Object> objectMap = new HashMap<>();
//            objectMap.put("id",spObjectTypeList.get(i).getId());
//            objectMap.put("name",spObjectTypeList.get(i).getName());
//            objectMap.put("upperId",spObjectTypeList.get(i).getUpperId());
//            spTypeList.add(objectMap);
//        }
//
//        Map<String,Object> typeIdMap = new HashMap<>();
//        Map<String,Object> typeIdToUpperIdMap = new HashMap<>();
//        for(int i = 0;i<spObjectTypeList.size();i++){
//            typeIdMap.put(spObjectTypeList.get(i).getId(),null);
//            typeIdToUpperIdMap.put(spObjectTypeList.get(i).getId(),spObjectTypeList.get(i).getUpperId());
//        }
//
//        List<Map<String,Object>> newList = new ArrayList<>();
//        for(int i=0;i<list.size();i++){
//            List<String> nameList = new ArrayList<>();
//
//            Map<String,Object> map = new HashMap<>();
//            map.put("name",list.get(i).get("name"));
//            map.put("id",list.get(i).get("id"));
//            map.put("upperId",list.get(i).get("upperId"));
//
//            List<Map<String,Object>> mapList = new ArrayList<>();
//
//            List<Map<String,Object>> objList = (List<Map<String,Object>>)(list.get(i).get("list"));
//            for(int j=0;j<objList.size();j++){
//                if(nameList.contains(objList.get(j).get("name"))){
//                    for(int z=0;z<mapList.size();z++){
//                        if(mapList.get(z).get("name").equals(objList.get(j).get("name"))){
////                            mapList.get(z).get("id")=(mapList.get(z).get("id")+","+objList.get(j).get("id"));
//                            mapList.get(z).put("id",(mapList.get(z).get("id")+","+objList.get(j).get("id")));
//                            mapList.get(z).put("upperId",(mapList.get(z).get("upperId")+","+objList.get(j).get("upperId")));
//                        }
//                    }
//                }else {
//                    Map<String,Object> objectMap = new HashMap<>();
//                    objectMap.put("name",objList.get(j).get("name"));
//                    objectMap.put("id",objList.get(j).get("id"));
//                    objectMap.put("itemId",objList.get(j).get("itemId"));
//                    objectMap.put("typeId",objList.get(j).get("typeId"));
//                    objectMap.put("upperId",objList.get(j).get("upperId"));
//                    objectMap.put("ifClick",true);
//                    objectMap.put("select",false);
//                    objectMap.put("imgUrl","https://ossweb-img.qq.com/images/lol/web201310/skin/big10004.jpg");
//                    mapList.add(objectMap);
//                    nameList.add(objList.get(j).get("name").toString());
//                }
//            }
//
//            map.put("list",mapList);
//            newList.add(map);
//        }
//
//        Map<String,Object> typeMap = new HashMap<>();
//        for(int i=0;i<spObjectTypeList.size();i++){
//            typeMap.put(spObjectTypeList.get(i).getId(),spObjectTypeList.get(i).getName());
//        }
//
//        List<Object> spList = new ArrayList<>();
//
//        for(int i=0;i<getSpObjectToStartList.size();i++){
//            Map<String,Object> mapList = new HashMap<>();
//            String startUpperId = "-1";
//            String startId = getSpObjectToStartList.get(i).getId();
//            boolean pangDuan = false;
//            int whileInt = spObjectList.size();
//
//            while (whileInt>=0){
//                for(int j=0;j<spObjectList.size();j++){
//                    if(spObjectList.get(j).getUpperId().equals(startUpperId) && (spObjectList.get(j).getId().equals(startId) || pangDuan)){
//                        Map<String,Object> map = new HashMap<>();
//                        map.put("typeId",spObjectList.get(j).getTypeId());
//                        map.put("typeName",typeMap.get(spObjectList.get(j).getTypeId()));
//                        map.put("id",spObjectList.get(j).getId());
//                        map.put("name",spObjectList.get(j).getName());
//                        startUpperId = spObjectList.get(j).getId();
//                        pangDuan = true;
//
//                        mapList.put(spObjectList.get(j).getTypeId(),map);
//                    }
//                }
//                whileInt--;
//            }
//            spList.add(mapList);
//        }
//
//        Map map = new HashMap();
//        map.put("spTypeList",spTypeList);
//        map.put("mapList",list);
//        map.put("typeIdMap",typeIdMap);
//        map.put("spList",spList);

        return map;
    }

    @RequestMapping(value = { "/selectedSpObject" }, method = { RequestMethod.POST })
    @ResponseBody
    public Object selectedSpObject(HttpServletRequest request){
        String selectedList = request.getParameter("selectedList");
        JSONArray array = new JSONArray(selectedList);
        for(int i=0;i<array.length();i++){
            System.out.println("array="+array.get(i));
            JSONObject object = new JSONObject(array.get(i).toString());
            if(object.has("typeName")){
                System.out.println("typeName存在");
            }
            if(object.has("typeName111")){
                System.out.println("typeName111存在");
            }
        }
        return null;
    }

}
