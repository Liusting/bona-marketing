//package com.example.demo.config;
//
//import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
//import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.LinkedHashMap;
//import java.util.Map;
//
///**
// *
// * 这个工具类注释掉就没权限验证了
// * 要手写下面3个方法，不用刻意去背，验证一般建项目时才用的上，备份一下可以以后复用
// * 大部分都不理解没关系，重要的已经用用注释标出来了
// * 记住加 @Configuration 和 @Bean
// *
// * **/
//
//@Configuration
//public class ShiroConfig {
//    /**
//     * Bean一定要加，name是这个Bean的名称
//     *
//     * **/
//
//    @Bean(name="getShiroFilterFactoryBean")
//    public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("getDefaultWebSecurityManager") DefaultWebSecurityManager defaultWebSecurityManager){
//        ShiroFilterFactoryBean shiroFilterFactoryBean=new ShiroFilterFactoryBean();
//        shiroFilterFactoryBean.setSecurityManager(defaultWebSecurityManager);
//
//        /**
//         *  上面2行通用都这样写，重要的是下面的
//         * anon:不需要拦截的
//         * authc:没通过登录验证的都拦截下面不能访问
//         *
//         * **/
//        Map<String,String> map = new LinkedHashMap<String, String>();
//        /** 这是退出登录的方法，可以放行不需要拦截 **/
//        map.put("/login/logout","anon");
//        /** 这是登录页的跳转，拦截了就找不到登录页面，后面的验证就做不了了 **/
//        map.put("/login/login","anon");
//        /** 这是登录页面点击登录到后台验的方法，可以放行不需要拦截  **/
//        map.put("/login/submit","anon");
//        /** 这是js路径，不需要拦截，拦截了没登录时页面用不了js，像zui，layui这些控件都用不了，页面就不好看，不需要拦截 **/
//        map.put("/static/js/**", "anon");
//        /** 这个是最重要的，这个拦截除了上面的其他所有，一定要放在最后面，不然上面的放在这个后面一样会拦截 **/
//        map.put("/**","authc");
//        /** 这个是拦截后执行的方法，这里是跳转到登录页**/
//        shiroFilterFactoryBean.setLoginUrl("/login/login");
//
//        shiroFilterFactoryBean.setFilterChainDefinitionMap(map);
//        return shiroFilterFactoryBean;
//    }
//
//    @Bean(name="getDefaultWebSecurityManager")
//    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("getRealm") UserRealm userRealm){
//        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
//        securityManager.setRealm(userRealm);
//        return securityManager;
//    }
//
//    @Bean(name="getRealm")
//    public UserRealm getRealm(){
//        /** 这个是另外写的工具类 **/
//        return new UserRealm();
//    }
//
//}
