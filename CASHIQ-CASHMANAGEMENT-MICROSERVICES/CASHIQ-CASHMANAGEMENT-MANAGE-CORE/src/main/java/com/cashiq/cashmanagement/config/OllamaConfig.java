package com.cashiq.cashmanagement.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ai.ollama.OllamaChatModel;

/**
 * Configuration class for setting up the OllamaChatModel bean.
 */
@Configuration
public class OllamaConfig {

    /**
     * Creates a ChatClient bean.
     *
     * @param chatModel The OllamaChatModel bean.
     * @return The ChatClient bean.
     */
    @Bean
    public ChatClient chatClient(OllamaChatModel chatModel) {
        return ChatClient.builder(chatModel).build();
    }
}
