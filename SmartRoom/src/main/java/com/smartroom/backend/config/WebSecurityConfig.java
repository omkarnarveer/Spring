package com.smartroom.backend.config;
import com.smartroom.backend.filter.CorsFilter;

import com.smartroom.backend.security.CustomUserDetailsService;
import com.smartroom.backend.security.JwtAuthenticationEntryPoint;
import com.smartroom.backend.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@EnableWebSecurity
@EnableWebMvc
@EnableGlobalMethodSecurity(
        prePostEnabled = true
)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


    private final String[] WHITELIST_URLS = {"/auth/**", "/v3/api-docs", "/v2/api-docs", "/swagger-resources/**",
            "/swagger-ui/**", "/webjars/**"};

    private final CustomUserDetailsService customUserDetailsService;

    private final JwtAuthenticationEntryPoint authenticationEntryPoint;

    private final JwtAuthenticationFilter authenticationFilter;

    @Autowired
    public WebSecurityConfig(CustomUserDetailsService customUserDetailsService, JwtAuthenticationEntryPoint authenticationEntryPoint,
                             JwtAuthenticationFilter authenticationFilter) {
        this.customUserDetailsService = customUserDetailsService;
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.authenticationFilter = authenticationFilter;
    }

    @Bean
    public FilterRegistrationBean filterRegistrationBean() {
        final CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);

        return bean;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(11);
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.cors();

        http

                .csrf().disable()
                .authorizeRequests()
                .antMatchers(WHITELIST_URLS).permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }


}