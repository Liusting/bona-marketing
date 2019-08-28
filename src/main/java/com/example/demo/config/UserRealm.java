//package com.example.demo.config;
//
//import com.example.demo.mapper.SysUserMapper;
//import com.example.demo.po.SysUser;
//import org.apache.shiro.authc.*;
//import org.apache.shiro.authz.AuthorizationInfo;
//import org.apache.shiro.realm.AuthorizingRealm;
//import org.apache.shiro.subject.PrincipalCollection;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.util.List;
//
///**
// * 这是个后台验证密码的工具类，
// * 只有extends AuthorizingRealm就会自动提示生成 doGetAuthorizationInfo和doGetAuthenticationInfo2个方法
// *
// * **/
//public class UserRealm extends AuthorizingRealm {
//    @Autowired
//    private SysUserMapper sysUserMapper;
//
//    @Override
//    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
//        return null;
//    }
//
//    @Override
//    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken auth) throws AuthenticationException {
//        UsernamePasswordToken token=(UsernamePasswordToken)auth;
//        /** 获取登录页面用户名（账号） **/
//        String account = token.getUsername();
//
//        try {
//            /** 用账号查询后台 **/
//            List<SysUser> list=sysUserMapper.getSysUser(account);
//        }catch (Exception e){
//            System.out.println("e="+e.getMessage());
//        }
//
//        /** 用账号查询后台 **/
//        List<SysUser> list=sysUserMapper.getSysUser(account);
//
//        /** 比对成功则返回info，比对失败则抛出对应信息的异常AuthenticationException
//         * SimpleAuthenticationInfo第一个参数:account是账号
//         * SimpleAuthenticationInfo第二个参数:list.get(0).getPassWork()是后台查询出数据后返回的密码
//         * SimpleAuthenticationInfo第三个参数:getName() 是 https://baike.baidu.com/item/realm/6708202 ，不用太深究这个，这个直接写getName()就可以了
//         * **/
//        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(account, list.get(0).getPassWork(), getName());
//
//        return info;
//    }
//}
