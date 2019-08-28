//package com.example.demo.controller;
//
////import com.example.demo.mapper.SysUserMapper;
//import com.example.demo.po.SysUser;
//import org.apache.shiro.SecurityUtils;
//import org.apache.shiro.authc.AuthenticationException;
//import org.apache.shiro.authc.UsernamePasswordToken;
//import org.apache.shiro.subject.Subject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Controller
//@RequestMapping("/login")
//public class LoginController {
//
////    @Autowired
////    private SysUserMapper sysUserMapper;
//
//    /**
//     ** 登录成功的页面
//     * **/
//    @RequestMapping("index")
//    @ResponseBody
//    public String index(){
//        return "index/index";
//    }
//
//    /**
//     * 登录页面
//     * **/
//    @RequestMapping("login")
//    @ResponseBody
//    public String login(HttpServletRequest request, Model model){
//        return "logs/logs";
//    }
//
//    /**
//     * 退出的方法:subject.logout()
//     * **/
//    @RequestMapping("logout")
//    public String logout() {
//        Subject subject = SecurityUtils.getSubject();
//        subject.logout();
//        return "redirect:/login/login";
//    }
//
//    /**
//     * form提交验证方法
//     * **/
//    @RequestMapping(value = "/submit", method = RequestMethod.POST)
//    public String submit(HttpServletRequest request, HttpServletResponse response, Model model){
//        String name=request.getParameter("name");
//        String passWork=request.getParameter("passWork");
//        UsernamePasswordToken upt = new UsernamePasswordToken(name, passWork);
//        Subject subject = SecurityUtils.getSubject();
//        if(!subject.isAuthenticated()){
//            try {
//                subject.login(upt);
//            } catch (AuthenticationException e) {
//                return "redirect:/login/login";
//            }
//        }
//        return "redirect:/login/index";
//    }
//
//    @RequestMapping(value = { "/getList" }, method = { RequestMethod.GET })
//    @ResponseBody
//    public Object getList(){
//        List<Map<String,Object>> list = new ArrayList<>();
//        for(int i=0;i<100;i++){
//            Map<String,Object> map = new HashMap<>();
//            map.put("name","list"+i);
//            list.add(map);
//        }
//        return list;
//    }
//
//    @RequestMapping(value = { "/login" }, method = { RequestMethod.GET })
//    @ResponseBody
//    public Object getList2(){
//        List<Map<String,Object>> list = new ArrayList<>();
//        for(int i=0;i<100;i++){
//            Map<String,Object> map = new HashMap<>();
//            map.put("name","list"+i);
//            list.add(map);
//        }
////        List<SysUser> list = sysUserMapper.getSysUser("admin");
//        System.out.println("list="+list.size());
//        return list;
//    }
//
//}
