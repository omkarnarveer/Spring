package com.smartroom.backend.security;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;
    private final JwtTokenHelper jwtTokenHelper;

    @Autowired
    public JwtAuthenticationFilter(UserDetailsService userDetailsService, JwtTokenHelper jwtTokenHelper) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenHelper = jwtTokenHelper;
    }

	/*
	 * @Override protected void doFilterInternal(HttpServletRequest request,
	 * HttpServletResponse response, FilterChain filterChain) throws
	 * ServletException, IOException {
	 * 
	 * 
	 * 
	 * }
	 */

	@Override
	protected void doFilterInternal(jakarta.servlet.http.HttpServletRequest request,
			jakarta.servlet.http.HttpServletResponse response, jakarta.servlet.FilterChain filterChain)
			throws jakarta.servlet.ServletException, IOException {
		// TODO Auto-generated method stub
		 String requestToken = request.getHeader("Authorization");

	        String username = null, token = null;

	        //Request Token Representation
	        // Bearer XYZ___
	        if (requestToken != null && requestToken.startsWith("Bearer")) {

	            token = requestToken.substring(7);
	            try {
	                username = jwtTokenHelper.getUserNameFromToken(token);
	            } catch (ExpiredJwtException e) {
	                throw new RuntimeException("Jwt token Expired");
	            }
	        } else {
	            System.out.println("Jwt token don't begin with bearer");
	        }

	        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

	            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
	            if (jwtTokenHelper.validateToken(token, userDetails)) {

	                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
	            } else {
	                // invalid jwt token
	                throw new RuntimeException("Invalid Jwt token Expired");
	            }
	        } else {
	            System.out.println("Username or security context is null");
	        }

	        filterChain.doFilter(request, response);
	}
}
