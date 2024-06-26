package com.smartroom.backend.security;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	/*
	 * @Override public void commence(HttpServletRequest request,
	 * HttpServletResponse response, AuthenticationException authException) throws
	 * IOException, ServletException {
	 * response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access Denied !!");
	 * }
	 */

	@Override
	public void commence(jakarta.servlet.http.HttpServletRequest request,
			jakarta.servlet.http.HttpServletResponse response, AuthenticationException authException)
			throws IOException, jakarta.servlet.ServletException {
		// TODO Auto-generated method stub
		 response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access Denied !!");
	}
}
