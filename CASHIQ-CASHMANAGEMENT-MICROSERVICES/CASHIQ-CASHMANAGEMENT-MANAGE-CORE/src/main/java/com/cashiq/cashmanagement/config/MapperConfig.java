package com.cashiq.cashmanagement.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for setting up the ModelMapper bean.
 */
@Configuration
public class MapperConfig {

    /**
     * Creates a ModelMapper bean.
     *
     * @return The ModelMapper bean.
     */
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
