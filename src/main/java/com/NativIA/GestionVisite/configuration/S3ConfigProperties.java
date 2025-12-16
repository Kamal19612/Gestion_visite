package com.NativIA.GestionVisite.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "aws.s3")
@Getter
@Setter
public class S3ConfigProperties {
    private String accessKeyId;
    private String secretAccessKey;
    private String region;
    private String bucketName;
    private boolean enabled = false;
}
