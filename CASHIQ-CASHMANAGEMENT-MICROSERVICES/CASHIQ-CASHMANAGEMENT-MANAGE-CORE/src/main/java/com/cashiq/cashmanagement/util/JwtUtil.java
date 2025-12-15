package com.cashiq.cashmanagement.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * @author - Aditya
 * @version - 1.0
 * @Description - This class is used to store the user details
 */
@Component
public class JwtUtil {

    // Ideally this should be in application.properties/yml
    // For now using a hardcoded safe key for demo if not present, but better to
    // enforce one.
    // Ensure this key is at least 256 bits (32 chars)
    @Value("${security.jwt.secret-key:3cfa76ef14937c1c0ea519f8fc057a80fcd04a7420f8e8bcd0a7567c272e007b}")
    private String secretKey;

    @Value("${security.jwt.expiration-time:3600000}") // 1 hour default
    private long jwtExpiration;

    /**
     * @method - extractUsername
     * @param - token
     * @return - String
     * @Description - This method is used to extract the username from the token
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * @method - extractClaim
     * @param - token
     * @param - claimsResolver
     * @return - T
     * @Description - This method is used to extract the claim from the token
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * @method - generateToken
     * @param - userDetails
     * @return - String
     * @Description - This method is used to generate the token
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * @method - generateToken
     * @param - extraClaims
     * @param - userDetails
     * @return - String
     * @Description - This method is used to generate the token
     */
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    /**
     * @method - getExpirationTime
     * @return - long
     * @Description - This method is used to get the expiration time
     */
    public long getExpirationTime() {
        return jwtExpiration;
    }

    /**
     * @method - buildToken
     * @param - extraClaims
     * @param - userDetails
     * @param - expiration
     * @return - String
     * @Description - This method is used to build the token
     */
    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration) {
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey())
                .compact();
    }

    /**
     * @method - isTokenValid
     * @param - token
     * @param - userDetails
     * @return - boolean
     * @Description - This method is used to check if the token is valid
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    /**
     * @method - isTokenExpired
     * @param - token
     * @return - boolean
     * @Description - This method is used to check if the token is expired
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * @method - extractExpiration
     * @param - token
     * @return - Date
     * @Description - This method is used to extract the expiration date from the
     *              token
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * @method - extractAllClaims
     * @param - token
     * @return - Claims
     * @Description - This method is used to extract all the claims from the token
     */
    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
