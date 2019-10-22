package com.example.demo.controller;
import com.example.demo.mapper.SpUserMapper;
import com.example.demo.po.SpUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/spUser")
public class SpUserController {

    @Autowired
    private SpUserMapper spUserMapper;

    @RequestMapping(value = {"/getUserMessage"}, method = {RequestMethod.POST})
    @ResponseBody
    public Object getUserMessage(HttpServletRequest request) {
        String id = request.getParameter("id");
        List<Map<String,Object>> map = spUserMapper.getUserMessage(id);
        return map;
    }

    @RequestMapping(value = {"/updateUserMessage"},method = {RequestMethod.POST})
    @ResponseBody
    public Object updateUserMessage(HttpServletRequest request){
        SpUser spUser = new SpUser();
        String id = request.getParameter("id");
        String name = request.getParameter("name");
        String phoneNumber = request.getParameter("phoneNumber");
        String sexy = request.getParameter("sexy");
        String birthDay = request.getParameter("birthDay");
        spUser.setId(id);
        spUser.setName(name);
        spUser.setPhoneNumber(phoneNumber);
        spUser.setSexy(sexy);
        spUser.setBirthDay(birthDay);
        spUserMapper.updateUserMessage(spUser);
        Map map = new HashMap();
        map.put("code",1);
        return map;
    }
}
