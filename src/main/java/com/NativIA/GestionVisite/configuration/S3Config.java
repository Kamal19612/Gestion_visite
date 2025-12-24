package com.NativIA.GestionVisite.configuration;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
@Slf4j
public class S3Config {

    /**
     * S3 Client bean - conditionally created only if S3 is enabled Note: AWS
     * SDK v2 should be imported when S3 is enabled For now, this bean is
     * disabled by default. Enable when AWS SDK is properly configured.
     */
    @Bean
    @ConditionalOnProperty(prefix = "aws.s3", name = "enabled", havingValue = "true")
    public S3Client s3Client(S3ConfigProperties s3Config) {
        log.info("S3 Client bean created");
        return S3Client.builder()
                .region(Region.of(s3Config.getRegion()))
                .credentialsProvider(
                        StaticCredentialsProvider.create(
                                AwsBasicCredentials.create(
                                        s3Config.getAccessKeyId(),
                                        s3Config.getSecretAccessKey()
                                )
                        )
                )
                .build();
    }
}
